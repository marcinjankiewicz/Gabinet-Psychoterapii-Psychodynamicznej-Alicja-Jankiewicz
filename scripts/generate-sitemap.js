import fs from 'fs';
import path from 'path';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDt63YgXqVj1TqUdZEVgwdti0TaPwOTWDA",
  authDomain: "gentle-dreamlet-3tgzl.firebaseapp.com",
  projectId: "gentle-dreamlet-3tgzl",
  storageBucket: "gentle-dreamlet-3tgzl.firebasestorage.app",
  messagingSenderId: "586384431794",
  appId: "1:586384431794:web:98f9f867dfcbd2df2307ab"
};

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/ą/g, 'a').replace(/ć/g, 'c').replace(/ę/g, 'e')
    .replace(/ł/g, 'l').replace(/ń/g, 'n').replace(/ó/g, 'o')
    .replace(/ś/g, 's').replace(/ź/g, 'z').replace(/ż/g, 'z')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function fetchFirestoreSlugs() {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app, "ai-studio-3bf4b229-7d58-42a0-a1e4-270ff82d2242");
    const snapshot = await getDocs(collection(db, 'blog_posts'));
    const slugs = [];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const slug = data.slug || (data.title ? slugify(data.title) : docSnap.id);
      if (slug) {
        slugs.push(slug);
      }
    });

    return slugs;
  } catch (error) {
    console.warn('⚠️ Nie udało się pobrać artykułów z Firestore, używam wyłącznie listy statycznej:', error instanceof Error ? error.message : error);
    return [];
  }
}

async function generate() {
  const baseUrl = 'https://www.gabinetpsychologagdansk.pl';
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/psychoterapia-indywidualna-gdansk', priority: '0.9', changefreq: 'monthly' },
    { url: '/psycholog-dzieciecy-gdansk', priority: '0.9', changefreq: 'monthly' },
    { url: '/pomoc-w-kryzysie-gdansk', priority: '0.9', changefreq: 'monthly' },
    { url: '/standardy', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
  ];

  // Stałe artykuły (opcjonalne wpisy definiowane ręcznie)
  const staticArticles = [
    // np. 'czym-jest-psychoterapia-psychodynamiczna-gdansk', 'pierwsza-konsultacja-psychologiczna'
  ];

  const firestoreArticles = await fetchFirestoreSlugs();
  const articles = Array.from(new Set([...staticArticles, ...firestoreArticles]));

  const staticUrlsXml = staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n');

  const articleUrlsXml = articles.map(slug => `  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrlsXml}${articleUrlsXml ? `\n${articleUrlsXml}` : ''}
</urlset>
`;

  fs.writeFileSync(path.resolve('./public/sitemap.xml'), sitemapXml);
  console.log(`✅ sitemap.xml wygenerowany poprawnie! (Strony statyczne: ${staticPages.length}, Artykuły blogowe: ${articles.length})`);
  process.exit(0);
}

generate();
