import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
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

// Funkcja konwertująca tytuł z polskimi znakami na przyjazny adres URL (slug)
function slugify(text: string): string {
  const polishChars: Record<string, string> = {
    ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z',
    Ą: 'a', Ć: 'c', Ę: 'e', Ł: 'l', Ń: 'n', Ó: 'o', Ś: 's', Ź: 'z', Ż: 'z'
  };
  return text
    .toString()
    .split('')
    .map(char => polishChars[char] || char)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

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

  // Statyczne podstrony główne i ofertowe SEO
  const urls = [
    { loc: `${SITE_URL}/`, lastmod: today, changefreq: 'weekly', priority: '1.0' },
    { loc: `${SITE_URL}/psychoterapia-indywidualna-gdansk`, lastmod: today, changefreq: 'monthly', priority: '0.9' },
    { loc: `${SITE_URL}/psycholog-dzieciecy-gdansk`, lastmod: today, changefreq: 'monthly', priority: '0.9' },
    { loc: `${SITE_URL}/pomoc-w-kryzysie-gdansk`, lastmod: today, changefreq: 'monthly', priority: '0.9' },
    { loc: `${SITE_URL}/blog`, lastmod: today, changefreq: 'daily', priority: '0.9' },
    { loc: `${SITE_URL}/standardy`, lastmod: '2026-06-28', changefreq: 'monthly', priority: '0.8' }
  ];

  // Dynamiczne podstrony artykułów blogowych
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const rawSlug = data.slug && data.slug !== docSnap.id ? String(data.slug) : '';
    const titleSlug = data.title ? slugify(String(data.title)) : '';
    const finalSlug = (rawSlug ? slugify(rawSlug) : titleSlug) || docSnap.id;

    // Jeśli dokument w Firestore nie ma jeszcze zapisanego czystego sluga, uzupełnij go w bazie
    if (data.slug !== finalSlug && finalSlug !== docSnap.id) {
      try {
        await setDoc(doc(db, 'blog_posts', docSnap.id), { slug: finalSlug }, { merge: true });
        console.log(`Zaktualizowano slug w bazie dla "${data.title}": ${finalSlug}`);
      } catch (updateErr) {
        console.warn(`Nie udało się zapisać sluga w Firestore dla ${docSnap.id}:`, updateErr);
      }
    }

    const lastmod = data.updatedAt || (data.date ? parsePolishDateToISO(data.date) : today);

    urls.push({
      loc: `${SITE_URL}/blog/${finalSlug}`,
      lastmod,
      changefreq: 'monthly',
      priority: data.isPinned ? '0.8' : '0.7'
    });
  }

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
