import React from 'react';

interface BlogContentRendererProps {
  content: string;
}

type ContentBlock =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'paragraph'; text: string }
  | { type: 'spacer'; count: number };

function stripInvisiblePrefix(line: string): string {
  return line.replace(/^[\u200B\u200C\u200D\uFEFF]+/, '');
}

function renderInlineFormatting(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*\n]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={idx} className="font-semibold text-brand-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function renderListItemContent(item: string): React.ReactNode {
  // Jeśli w punkcie listy są już jawne znaczniki **...**, użyj standardowego formatowania inline
  if (item.includes('**')) {
    return renderInlineFormatting(item);
  }

  // Jeśli punkt listy ma postać "- Hasło kluczowe: dalszy opis" lub "1. Hasło kluczowe: dalszy opis",
  // wyróżnij pogrubieniem część przed dwukropkiem bez zmiany treści
  const colonMatch = item.match(/^(\s*(?:[*•\-]|\d+(?:[.)])?)\s*[^:\n]{2,65}:)(\s*[\s\S]*)$/);
  if (colonMatch) {
    return (
      <>
        <strong className="font-semibold text-brand-primary">{colonMatch[1]}</strong>
        {renderInlineFormatting(colonMatch[2])}
      </>
    );
  }

  return renderInlineFormatting(item);
}

function matchListLine(line: string): { normalizedLine: string } | null {
  // 1. Punktory: -, *, • (ze spacją lub bez spacji przed literą/cudzysłowem, np. "-chroni")
  const bulletMatch = line.match(/^(\s*)([*•]\s*|\-\s+|\-(?=[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż"„]))(.+)$/);
  if (bulletMatch) {
    const indent = bulletMatch[1] || '';
    const rawMarker = bulletMatch[2].trim();
    const bulletChar = rawMarker === '*' ? '•' : rawMarker;
    const body = bulletMatch[3];
    return { normalizedLine: `${indent}${bulletChar} ${body}` };
  }

  // 2. Listy numerowane: "1. tekst", "1) tekst" lub "1 tekst" na początku linii
  const numberedMatch = line.match(/^(\s*)(\d{1,2})([.)]|\s+)(?=[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż"„])\s*(.+)$/);
  if (numberedMatch) {
    const indent = numberedMatch[1] || '';
    const num = numberedMatch[2];
    const body = numberedMatch[4];
    return { normalizedLine: `${indent}${num}. ${body}` };
  }

  return null;
}

function parseContentBlocks(rawContent: string): ContentBlock[] {
  const normalized = (rawContent || '').replace(/\r\n/g, '\n');
  const rawLines = normalized.split('\n');
  const lines = rawLines.map(stripInvisiblePrefix);
  const blocks: ContentBlock[] = [];

  let currentParagraphLines: string[] = [];
  let currentListItems: string[] = [];
  let blankLineCount = 0;

  const flushParagraph = () => {
    if (currentParagraphLines.length > 0) {
      blocks.push({
        type: 'paragraph',
        text: currentParagraphLines.join('\n'),
      });
      currentParagraphLines = [];
    }
  };

  const flushList = () => {
    if (currentListItems.length > 0) {
      // Jeśli pojedynczy wiersz numerowany (np. "1. Prawdziwa ciekawość świata partnera")
      // nie kończy się kropką i stanowi tytuł sekcji przed akapitem, wyświetl go jako śródtytuł h3
      if (
        currentListItems.length === 1 &&
        /^\s*\d{1,2}\.\s+/.test(currentListItems[0]) &&
        currentListItems[0].trim().length <= 95 &&
        !/[.!;]$/.test(currentListItems[0].trim())
      ) {
        blocks.push({
          type: 'h3',
          text: currentListItems[0].trim(),
        });
      } else {
        blocks.push({
          type: 'list',
          items: [...currentListItems],
        });
      }
      currentListItems = [];
    }
  };

  const flushBlankLines = () => {
    if (blankLineCount > 0) {
      const extraBlankLines = blocks.length === 0 ? blankLineCount : blankLineCount - 1;
      if (extraBlankLines > 0) {
        blocks.push({ type: 'spacer', count: extraBlankLines });
      }
      blankLineCount = 0;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isBlank = line.trim() === '';

    if (isBlank) {
      // Sprawdź, czy po pojedynczej pustej linii od razu następuje kolejny element listy
      const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
      if (currentListItems.length > 0 && blankLineCount === 0 && matchListLine(nextLine)) {
        blankLineCount += 1;
        continue;
      }
      flushParagraph();
      flushList();
      blankLineCount += 1;
      continue;
    }

    const isH3 = /^\s*###\s*\S+/.test(line);
    const isH2 = !isH3 && /^\s*##\s*\S+/.test(line);
    const listMatch = !isH2 && !isH3 ? matchListLine(line) : null;

    if (listMatch && currentListItems.length > 0 && blankLineCount === 1) {
      // Kontynuacja tej samej listy po pojedynczym pustym wierszu
      blankLineCount = 0;
      currentListItems.push(listMatch.normalizedLine);
      continue;
    }

    if (blankLineCount > 0) {
      flushParagraph();
      flushList();
      flushBlankLines();
    }

    if (isH3) {
      flushParagraph();
      flushList();
      blocks.push({
        type: 'h3',
        text: line.replace(/^\s*###\s*/, ''),
      });
      continue;
    }

    if (isH2) {
      flushParagraph();
      flushList();
      blocks.push({
        type: 'h2',
        text: line.replace(/^\s*##\s*/, ''),
      });
      continue;
    }

    if (listMatch) {
      flushParagraph();
      currentListItems.push(listMatch.normalizedLine);
      continue;
    }

    flushList();
    currentParagraphLines.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

export default function BlogContentRenderer({ content }: BlogContentRendererProps) {
  const blocks = parseContentBlocks(content);

  return (
    <div className="font-sans text-brand-charcoal text-base md:text-lg leading-relaxed selection:bg-brand-accent break-words [overflow-wrap:anywhere] [tab-size:4]">
      {blocks.map((block, index) => {
        if (block.type === 'spacer') {
          return (
            <div
              key={index}
              style={{ height: `${block.count * 1.5}rem` }}
              aria-hidden="true"
            />
          );
        }

        if (block.type === 'h2') {
          return (
            <h2
              key={index}
              className="text-2xl md:text-3xl font-serif text-brand-primary font-bold mt-8 mb-4 border-b border-brand-accent/20 pb-2 whitespace-pre-wrap break-words [overflow-wrap:anywhere]"
            >
              {renderInlineFormatting(block.text)}
            </h2>
          );
        }

        if (block.type === 'h3') {
          return (
            <h3
              key={index}
              className="text-xl md:text-2xl font-serif text-brand-primary font-bold mt-7 mb-3 whitespace-pre-wrap break-words [overflow-wrap:anywhere]"
            >
              {renderInlineFormatting(block.text)}
            </h3>
          );
        }

        if (block.type === 'list') {
          return (
            <div
              key={index}
              className="my-5 pl-4 pr-3 border-l-2 border-brand-accent py-2.5 bg-brand-card/30 rounded-r-xl space-y-2.5"
            >
              {block.items.map((item, itemIdx) => (
                <p
                  key={itemIdx}
                  className="text-sm md:text-base text-brand-charcoal leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere] [tab-size:4]"
                >
                  {renderListItemContent(item)}
                </p>
              ))}
            </div>
          );
        }

        return (
          <p
            key={index}
            className="mb-5 last:mb-0 whitespace-pre-wrap break-words [overflow-wrap:anywhere] [tab-size:4]"
          >
            {renderInlineFormatting(block.text)}
          </p>
        );
      })}
    </div>
  );
}
