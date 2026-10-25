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

function parseContentBlocks(rawContent: string): ContentBlock[] {
  const normalized = (rawContent || '').replace(/\r\n/g, '\n');
  const lines = normalized.split('\n');
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
      blocks.push({
        type: 'list',
        items: [...currentListItems],
      });
      currentListItems = [];
    }
  };

  const flushBlankLines = () => {
    if (blankLineCount > 0) {
      // Pojedyncza pusta linia oddziela akapity (obsługiwane przez marginesy bloków).
      // Każda kolejna pusta linia (np. podwójny/potrójny pusty wiersz) tworzy dodatkowy odstęp.
      const extraBlankLines = blocks.length === 0 ? blankLineCount : blankLineCount - 1;
      if (extraBlankLines > 0) {
        blocks.push({ type: 'spacer', count: extraBlankLines });
      }
      blankLineCount = 0;
    }
  };

  for (const line of lines) {
    const isBlank = line.trim() === '';
    const isH3 = /^\s*###\s+/.test(line);
    const isH2 = !isH3 && /^\s*##\s+/.test(line);
    const isList = !isH2 && !isH3 && /^(\s*)([*\-•]|\d+[.)])\s+/.test(line);

    if (isBlank) {
      flushParagraph();
      flushList();
      blankLineCount += 1;
      continue;
    }

    flushBlankLines();

    if (isH3) {
      flushParagraph();
      flushList();
      blocks.push({
        type: 'h3',
        text: line.replace(/^\s*###\s+/, ''),
      });
      continue;
    }

    if (isH2) {
      flushParagraph();
      flushList();
      blocks.push({
        type: 'h2',
        text: line.replace(/^\s*##\s+/, ''),
      });
      continue;
    }

    if (isList) {
      flushParagraph();
      currentListItems.push(line);
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
              className="text-xl md:text-2xl font-serif text-brand-primary font-bold mt-6 mb-3 whitespace-pre-wrap break-words [overflow-wrap:anywhere]"
            >
              {renderInlineFormatting(block.text)}
            </h3>
          );
        }

        if (block.type === 'list') {
          return (
            <div
              key={index}
              className="my-5 pl-4 pr-3 border-l-2 border-brand-accent py-2 bg-brand-card/30 rounded-r-xl space-y-2"
            >
              {block.items.map((item, itemIdx) => (
                <p
                  key={itemIdx}
                  className="text-sm md:text-base text-brand-charcoal leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere] [tab-size:4]"
                >
                  {renderInlineFormatting(item)}
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
