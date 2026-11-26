import { useEffect } from 'react';

export const CANONICAL_BASE_URL = 'https://gabinetpsychologagdansk.pl';
const DEFAULT_OG_IMAGE = `${CANONICAL_BASE_URL}/alicjajankiewicz1.webp`;

export interface PageSeoConfig {
  title: string;
  description: string;
  /** Ścieżka względna (np. "/", "/blog", "/blog/slug") lub pełny adres URL */
  canonicalPath: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  /** Opcjonalny obiekt Schema.org JSON-LD wstrzykiwany dynamicznie i usuwany przy odmontowaniu */
  jsonLd?: Record<string, unknown> | null;
  jsonLdId?: string;
}

function normalizeCanonicalUrl(canonicalPath: string): string {
  if (!canonicalPath || canonicalPath === '/') {
    return `${CANONICAL_BASE_URL}/`;
  }
  if (canonicalPath.startsWith('http://') || canonicalPath.startsWith('https://')) {
    return canonicalPath.replace(/^https?:\/\/(www\.)?gabinetpsychologagdansk\.pl/i, CANONICAL_BASE_URL);
  }
  const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  return `${CANONICAL_BASE_URL}${cleanPath.replace(/\/+$/, '')}`;
}

function upsertMeta(selector: string, createAttr: 'name' | 'property', attrKey: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(createAttr, attrKey);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Konwertuje polską datę publikacji (np. "10 listopada 2026") na format ISO-8601 (YYYY-MM-DD)
 * wymagany w Schema.org BlogPosting (datePublished).
 */
export function parsePolishDateToIso(dateStr?: string): string {
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
  if (parts.length === 3) {
    const month = months[parts[1].toLowerCase()];
    if (month) {
      const day = parts[0].padStart(2, '0');
      const year = parts[2];
      return `${year}-${month}-${day}`;
    }
  }

  return new Date().toISOString().split('T')[0];
}

/**
 * Lekki hook zarządzający dynamicznymi metadanymi SEO (<title>, description, canonical, Open Graph)
 * oraz opcjonalnym wstrzykiwaniem i czyszczeniem danych strukturalnych JSON-LD (np. BlogPosting).
 */
export function usePageSeo({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  jsonLd = null,
  jsonLdId = 'dynamic-page-jsonld',
}: PageSeoConfig) {
  const serializedJsonLd = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    const canonicalUrl = normalizeCanonicalUrl(canonicalPath);
    const resolvedImage = ogImage && ogImage.startsWith('http') ? ogImage : DEFAULT_OG_IMAGE;

    document.title = title;

    upsertMeta('meta[name="description"]', 'name', 'description', description);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', resolvedImage);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    upsertCanonical(canonicalUrl);
  }, [title, description, canonicalPath, ogType, ogImage]);

  useEffect(() => {
    const existing = document.getElementById(jsonLdId);
    if (existing) {
      existing.remove();
    }

    if (serializedJsonLd) {
      const script = document.createElement('script');
      script.id = jsonLdId;
      script.type = 'application/ld+json';
      script.text = serializedJsonLd;
      document.head.appendChild(script);
    }

    return () => {
      const cleanup = document.getElementById(jsonLdId);
      if (cleanup) {
        cleanup.remove();
      }
    };
  }, [serializedJsonLd, jsonLdId]);
}
