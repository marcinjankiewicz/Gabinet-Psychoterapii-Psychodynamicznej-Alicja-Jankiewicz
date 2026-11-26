import { initializeApp } from 'firebase/app';
import { initializeFirestore, getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import firebaseConfig from '../firebase-applet-config.json';

const SITE_URL = 'https://gabinetpsychologagdansk.pl';
const DEFAULT_IMAGE = `${SITE_URL}/alicjajankiewicz1.webp`;
const SITE_NAME = 'Gabinet Psychoterapii Psychodynamicznej Gdańsk – Alicja Jankiewicz';

interface PrerenderPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image?: string;
  date: string;
  isoDate: string;
  readTime: string;
  isPinned: boolean;
}

function slugify(text: string): string {
  const polishChars: Record<string, string> = {
    ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z',
    Ą: 'a', Ć: 'c', Ę: 'e', Ł: 'l', Ń: 'n', Ó: 'o', Ś: 's', Ź: 'z', Ż: 'z',
  };
  return text
    .toString()
    .split('')
    .map((char) => polishChars[char] || char)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function parsePolishDateToISO(dateStr?: string): string {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  if (/^\d{4}-\d{2}-\d{2}/.test(dateStr.trim())) {
    return dateStr.trim().slice(0, 10);
  }
  const months: Record<string, string> = {
    stycznia: '01',
    lutego: '02',
    marca: '03',
    kwietnia: '04',
    maja: '05',
    czerwca: '06',
    lipca: '07',
    sierpnia: '08',
    września: '09',
    października: '10',
    listopada: '11',
    grudnia: '12',
  };
  const parts = dateStr.trim().split(/\s+/);
  if (parts.length === 3 && months[parts[1].toLowerCase()]) {
    const day = parts[0].padStart(2, '0');
    const month = months[parts[1].toLowerCase()];
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  return new Date().toISOString().split('T')[0];
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeJsonLd(data: unknown): string {
  return JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
}

function renderInlineMarkdownToHtml(text: string): string {
  let escaped = escapeHtml(text);
  escaped = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  escaped = escaped.replace(/\*(.+?)\*/g, '<em>$1</em>');
  return escaped;
}

/**
 * Konwertuje treść artykułu (Markdown / zwykły tekst) na czysty, semantyczny HTML
 * dla sekcji <noscript>, aby roboty wyszukiwarek i AI mogły odczytać cały artykuł bez JS.
 */
function renderContentToNoscriptHtml(content: string): string {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const htmlBlocks: string[] = [];
  let inUl = false;
  let inOl = false;

  const closeLists = () => {
    if (inUl) {
      htmlBlocks.push('</ul>');
      inUl = false;
    }
    if (inOl) {
      htmlBlocks.push('</ol>');
      inOl = false;
    }
  };

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    if (!trimmed) {
      closeLists();
      continue;
    }

    const h3Match = trimmed.match(/^###\s+(.+)$/);
    if (h3Match) {
      closeLists();
      htmlBlocks.push(`<h3>${renderInlineMarkdownToHtml(h3Match[1])}</h3>`);
      continue;
    }

    const h2Match = trimmed.match(/^##\s+(.+)$/);
    if (h2Match) {
      closeLists();
      htmlBlocks.push(`<h2>${renderInlineMarkdownToHtml(h2Match[1])}</h2>`);
      continue;
    }

    const quoteMatch = trimmed.match(/^>\s+(.+)$/);
    if (quoteMatch) {
      closeLists();
      htmlBlocks.push(`<blockquote><p>${renderInlineMarkdownToHtml(quoteMatch[1])}</p></blockquote>`);
      continue;
    }

    const ulMatch = trimmed.match(/^[-*•]\s+(.+)$/);
    if (ulMatch) {
      if (inOl) {
        htmlBlocks.push('</ol>');
        inOl = false;
      }
      if (!inUl) {
        htmlBlocks.push('<ul>');
        inUl = true;
      }
      htmlBlocks.push(`<li>${renderInlineMarkdownToHtml(ulMatch[1])}</li>`);
      continue;
    }

    const olMatch = trimmed.match(/^\d+[.)]\s+(.+)$/);
    if (olMatch) {
      if (inUl) {
        htmlBlocks.push('</ul>');
        inUl = false;
      }
      if (!inOl) {
        htmlBlocks.push('<ol>');
        inOl = true;
      }
      htmlBlocks.push(`<li>${renderInlineMarkdownToHtml(olMatch[1])}</li>`);
      continue;
    }

    closeLists();
    htmlBlocks.push(`<p>${renderInlineMarkdownToHtml(trimmed)}</p>`);
  }

  closeLists();
  return htmlBlocks.join('\n          ');
}

function extractViteAssetTags(distIndexHtml: string): string {
  const tags: string[] = [];

  const scriptRegex = /<script\s+type="module"[^>]*src="\/assets\/[^"]+"[^>]*><\/script>/gi;
  const stylesheetRegex = /<link\s+rel="(?:stylesheet|modulepreload)"[^>]*href="\/assets\/[^"]+"[^>]*\/?>/gi;

  const scripts = distIndexHtml.match(scriptRegex) || [];
  const links = distIndexHtml.match(stylesheetRegex) || [];

  tags.push(...scripts, ...links);
  return tags.join('\n    ');
}

function buildDescription(post: PrerenderPost): string {
  const base =
    post.excerpt && post.excerpt.trim().length > 20
      ? post.excerpt.trim()
      : post.content
          .replace(/^#{1,6}\s+/gm, '')
          .replace(/[*_`>]/g, '')
          .replace(/\s+/g, ' ')
          .trim();

  if (base.length <= 160) return base;
  return base.slice(0, 157).trimEnd() + '...';
}

function buildBlogPostHtml(
  post: PrerenderPost,
  relatedPosts: PrerenderPost[],
  viteAssetTags: string
): string {
  const articleUrl = `${SITE_URL}/blog/${post.slug}`;
  const pageTitle = `${post.title} | Blog Psychologiczny – Alicja Jankiewicz Gdańsk`;
  const description = buildDescription(post);
  const ogImage = post.image && post.image.startsWith('http') ? post.image : DEFAULT_IMAGE;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl,
        },
        headline: post.title,
        description,
        image: ogImage,
        datePublished: post.isoDate,
        articleSection: post.category,
        inLanguage: 'pl-PL',
        author: {
          '@type': 'Person',
          '@id': `${SITE_URL}/#alicja-jankiewicz`,
          name: 'Alicja Jankiewicz',
          jobTitle: 'Psycholog, Psychoterapeuta psychodynamiczny',
          url: `${SITE_URL}/`,
        },
        publisher: {
          '@type': ['Psychologist', 'MedicalBusiness'],
          '@id': `${SITE_URL}/#gabinet`,
          name: SITE_NAME,
          url: `${SITE_URL}/`,
        },
        url: articleUrl,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Strona główna',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog psychologiczny',
            item: `${SITE_URL}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  const articleBodyHtml = renderContentToNoscriptHtml(post.content);

  const relatedLinksHtml =
    relatedPosts.length > 0
      ? `
        <section aria-label="Powiązane artykuły">
          <h2>Przeczytaj również</h2>
          <ul>
            ${relatedPosts
              .map(
                (rel) =>
                  `<li><a href="/blog/${escapeHtml(rel.slug)}">${escapeHtml(rel.title)}</a> (${escapeHtml(rel.category)})</li>`
              )
              .join('\n            ')}
          </ul>
        </section>`
      : '';

  return `<!doctype html>
<html lang="pl">
  <head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-P7PTD9JZX2"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-P7PTD9JZX2');
    </script>

    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Pozycjonowanie i Meta Tagi (SEO & GEO) - Statycznie wygenerowany artykuł blogowy -->
    <meta name="google-site-verification" content="RHiysqe8pp-R_z3JtQeqAs_MFUwQ8JeoL9WQF2oBwow" />
    <title>${escapeHtml(pageTitle)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="author" content="Alicja Jankiewicz" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${escapeHtml(articleUrl)}" />

    <!-- Open Graph -->
    <meta property="og:type" content="article" />
    <meta property="og:locale" content="pl_PL" />
    <meta property="og:title" content="${escapeHtml(pageTitle)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(articleUrl)}" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:image" content="${escapeHtml(ogImage)}" />

    <!-- Twitter / X Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(ogImage)}" />

    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

    <!-- Dane strukturyzowane Schema.org: BlogPosting + BreadcrumbList -->
    <script type="application/ld+json">
${safeJsonLd(jsonLd)}
    </script>
    ${viteAssetTags}
  </head>
  <body>
    <div id="root"></div>

    <noscript>
      <main>
        <nav aria-label="Ścieżka powrotu">
          <a href="/">Strona główna</a> / <a href="/blog">Blog psychologiczny</a>
        </nav>

        <article>
          <header>
            <p>${escapeHtml(post.category)}${post.date ? ` • ${escapeHtml(post.date)}` : ''}${post.readTime ? ` • ${escapeHtml(post.readTime)}` : ''}</p>
            <h1>${escapeHtml(post.title)}</h1>
            <p>Autor: Alicja Jankiewicz – psycholog, psychoterapeuta psychodynamiczny (Gdańsk Jasień)</p>
          </header>

          ${articleBodyHtml}
        </article>
${relatedLinksHtml}

        <section>
          <h2>Konsultacja psychologiczna w Gdańsku</h2>
          <address>
            <strong>${escapeHtml(SITE_NAME)}</strong><br />
            ul. Kartuska 356a (I piętro), 80-125 Gdańsk (dzielnica Gdańsk Jasień)<br />
            Telefon: <a href="tel:+48514309526">+48 514 309 526</a><br />
            E-mail: psycholog.jankiewicz@gmail.com<br />
            Godziny przyjęć: Poniedziałek – Piątek, 08:00–20:00 • Cena wizyty: 200 zł (50 min)
          </address>
        </section>

        <nav aria-label="Główne podstrony serwisu">
          <ul>
            <li><a href="/">Strona główna</a></li>
            <li><a href="/blog">Wszystkie artykuły na blogu</a></li>
            <li><a href="/psychoterapia-indywidualna-gdansk">Psychoterapia indywidualna Gdańsk</a></li>
            <li><a href="/psycholog-dzieciecy-gdansk">Psycholog dziecięcy Gdańsk</a></li>
            <li><a href="/pomoc-w-kryzysie-gdansk">Pomoc w kryzysie Gdańsk</a></li>
            <li><a href="/standardy">Standardy Ochrony Małoletnich (SOM)</a></li>
          </ul>
        </nav>
      </main>
    </noscript>
  </body>
</html>
`;
}

async function prerenderBlogPages() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const distIndexPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(distIndexPath)) {
    throw new Error('Brak pliku dist/index.html. Uruchom najpierw vite build.');
  }

  const distIndexHtml = fs.readFileSync(distIndexPath, 'utf-8');
  const viteAssetTags = extractViteAssetTags(distIndexHtml);
  if (!viteAssetTags) {
    throw new Error('Nie znaleziono zbudowanych zasobów Vite (/assets/*) w dist/index.html.');
  }

  console.log('Prerenderowanie statycznych stron artykułów blogowych z Firestore...');
  const app = initializeApp(firebaseConfig);
  let db;
  try {
    db = initializeFirestore(
      app,
      { experimentalForceLongPolling: true },
      firebaseConfig.firestoreDatabaseId
    );
  } catch {
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  }

  const snapshot = await getDocs(collection(db, 'blog_posts'));
  const posts: PrerenderPost[] = [];

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const title = String(data.title || '').trim();
    if (!title) continue;

    const rawSlug = data.slug && data.slug !== docSnap.id ? String(data.slug) : '';
    const finalSlug = (rawSlug ? slugify(rawSlug) : slugify(title)) || docSnap.id;

    posts.push({
      id: docSnap.id,
      slug: finalSlug,
      title,
      category: String(data.category || 'Baza wiedzy'),
      excerpt: String(data.excerpt || ''),
      content: String(data.content || ''),
      image: data.image ? String(data.image) : undefined,
      date: String(data.date || ''),
      isoDate: parsePolishDateToISO(data.updatedAt || data.date),
      readTime: String(data.readTime || ''),
      isPinned: !!data.isPinned,
    });
  }

  // Sortowanie spójne z aplikacją: przypięte na początku, potem najnowsze
  posts.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.isoDate.localeCompare(a.isoDate);
  });

  // 1. Generowanie statycznego pliku dist/blog/<slug>/index.html dla każdego artykułu
  for (const post of posts) {
    const others = posts.filter((p) => p.id !== post.id);
    const sameCategory = others.filter((p) => p.category === post.category);
    const differentCategory = others.filter((p) => p.category !== post.category);
    const related = [...sameCategory, ...differentCategory].slice(0, 3);

    const html = buildBlogPostHtml(post, related, viteAssetTags);
    const postDir = path.join(distDir, 'blog', post.slug);
    fs.mkdirSync(postDir, { recursive: true });
    fs.writeFileSync(path.join(postDir, 'index.html'), html, 'utf-8');
  }

  // 2. Wstrzyknięcie pełnej listy linków do artykułów w <noscript> zbudowanego dist/blog/index.html
  const distBlogIndexPath = path.join(distDir, 'blog', 'index.html');
  if (fs.existsSync(distBlogIndexPath) && posts.length > 0) {
    const blogIndexHtml = fs.readFileSync(distBlogIndexPath, 'utf-8');
    const articleListHtml = `<section aria-label="Lista artykułów blogowych">
          <h2>Opublikowane artykuły (${posts.length})</h2>
          <ul>
            ${posts
              .map((p) => {
                const summary = buildDescription(p);
                return `<li><a href="/blog/${escapeHtml(p.slug)}">${escapeHtml(p.title)}</a>${p.date ? ` (${escapeHtml(p.date)})` : ''} — ${escapeHtml(summary)}</li>`;
              })
              .join('\n            ')}
          </ul>
        </section>`;

    if (blogIndexHtml.includes('<!-- BLOG_NOSCRIPT_ARTICLES -->')) {
      const updatedBlogIndex = blogIndexHtml.replace(
        '<!-- BLOG_NOSCRIPT_ARTICLES -->',
        articleListHtml
      );
      fs.writeFileSync(distBlogIndexPath, updatedBlogIndex, 'utf-8');
    }
  }

  console.log(`Wygenerowano ${posts.length} statycznych stron artykułów blogowych w dist/blog/<slug>/index.html.`);
  process.exit(0);
}

prerenderBlogPages().catch((err) => {
  console.error('Błąd prerenderowania stron bloga:', err);
  process.exit(1);
});
