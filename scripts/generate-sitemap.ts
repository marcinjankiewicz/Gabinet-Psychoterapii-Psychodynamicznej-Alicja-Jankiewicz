import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const firebaseConfig = {
  apiKey: "AIzaSyDt63YgXqVj1TqUdZEVgwdti0TaPwOTWDA",
  authDomain: "gentle-dreamlet-3tgzl.firebaseapp.com",
  projectId: "gentle-dreamlet-3tgzl",
  storageBucket: "gentle-dreamlet-3tgzl.firebasestorage.app",
  messagingSenderId: "586384431794",
  appId: "1:586384431794:web:98f9f867dfcbd2df2307ab"
};

const SITE_URL = 'https://www.gabinetpsychologagdansk.pl';

// Pomocnicza konwersja polskiej daty (np. "22 czerwca 2026") na YYYY-MM-DD
function parsePolishDateToISO(dateStr: string): string {
  const months: Record<string, string> = {
    'stycznia': '01', 'lutego': '02', 'marca': '03', 'kwietnia': '04',
    'maja': '05', 'czerwca': '06', 'lipca': '07', 'sierpnia': '08',
    'września': '09', 'października': '10', 'listopada': '11', 'grudnia': '12'
  };
  const parts = dateStr.trim().split(' ');
  if (parts.length === 3 && months[parts[1].toLowerCase()]) {
    const day = parts[0].padStart(2, '0');
    const month = months[parts[1].toLowerCase()];
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  return new Date().toISOString().split('T')[0];
}

async function generateSitemap() {
  console.log('Pobieranie artykułów z Firebase Firestore...');
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app, "ai-studio-3bf4b229-7d58-42a0-a1e4-270ff82d2242");

  const snapshot = await getDocs(collection(db, 'blog_posts'));
  const today = new Date().toISOString().split('T')[0];

  // Statyczne podstrony główne
  const urls = [
    { loc: `${SITE_URL}/`, lastmod: today, changefreq: 'weekly', priority: '1.0' },
    { loc: `${SITE_URL}/blog`, lastmod: today, changefreq: 'daily', priority: '0.9' },
    { loc: `${SITE_URL}/standardy`, lastmod: '2026-06-28', changefreq: 'monthly', priority: '0.8' }
  ];

  // Dynamiczne podstrony artykułów blogowych
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    // Dopasuj ścieżkę do struktury routingu (np. /blog/slug lub /blog/id)
    const slugOrId = data.slug || docSnap.id;
    const lastmod = data.updatedAt || (data.date ? parsePolishDateToISO(data.date) : today);

    urls.push({
      loc: `${SITE_URL}/blog/${slugOrId}`,
      lastmod,
      changefreq: 'monthly',
      priority: data.isPinned ? '0.8' : '0.7'
    });
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const outputPath = path.resolve(process.cwd(), 'public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemapXml, 'utf-8');
  console.log(`Zaktualizowano sitemap.xml (${urls.length} adresów URL).`);
  process.exit(0);
}

generateSitemap().catch((err) => {
  console.error('Błąd generowania sitemap.xml:', err);
  process.exit(1);
});
