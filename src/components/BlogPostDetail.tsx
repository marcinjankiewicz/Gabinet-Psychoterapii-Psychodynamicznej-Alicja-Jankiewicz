import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBlogPosts } from '../lib/firebase';
import { slugify } from '../lib/slugify';
import { BlogPost } from '../types';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';

export default function BlogPostDetail({ onOpenBooking }: { onOpenBooking: () => void }) {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      const posts = await fetchBlogPosts();
      const found = posts.find(
        p => p.slug === slug || slugify(p.title) === slug || p.id === slug
      );
      setPost(found || null);
      setLoading(false);

      if (found) {
        const cleanSlug = found.slug || slugify(found.title);
        const canonicalUrl = `https://www.gabinetpsychologagdansk.pl/blog/${cleanSlug}`;
        const seoTitle = `${found.title} | Blog Gabinet Psychoterapii Gdańsk`;

        // Dynamiczna zmiana Title, Description i Canonical dla botów i użytkowników
        document.title = seoTitle;

        const setMeta = (selector: string, attr: string, val: string) => {
          const el = document.querySelector(selector);
          if (el) el.setAttribute(attr, val);
        };

        setMeta('meta[name="description"]', 'content', found.excerpt);
        setMeta('meta[property="og:title"]', 'content', seoTitle);
        setMeta('meta[property="og:description"]', 'content', found.excerpt);
        setMeta('meta[property="og:url"]', 'content', canonicalUrl);
        setMeta('meta[property="og:type"]', 'content', 'article');
        setMeta('link[rel="canonical"]', 'href', canonicalUrl);
      }
    }
    loadPost();
  }, [slug]);

  if (loading) {
    return <div className="py-24 text-center">Ładowanie artykułu...</div>;
  }

  if (!post) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-serif">Artykuł nie został odnaleziony</h1>
        <Link to="/blog" className="mt-4 inline-block text-brand-primary underline">Wróć do listy wpisów</Link>
      </div>
    );
  }

  const resolvedSlug = post.slug || slugify(post.title);

  // Dane strukturalne Google Schema.org dla artykułu medycznego / poradnikowego
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.gabinetpsychologagdansk.pl/blog/${resolvedSlug}`
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image || "https://www.gabinetpsychologagdansk.pl/alicjajankiewicz1.webp",
    "author": {
      "@type": "Person",
      "name": "Alicja Jankiewicz",
      "jobTitle": "Psychoterapeuta Psychodynamiczny",
      "url": "https://www.gabinetpsychologagdansk.pl/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Gabinet Psychoterapii Psychodynamicznej Alicja Jankiewicz",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.gabinetpsychologagdansk.pl/favicon.svg"
      }
    },
    "datePublished": post.date,
    "inLanguage": "pl-PL"
  };

  return (
    <article className="py-16 md:py-24 max-w-[840px] mx-auto px-6">
      {/* Wstrzyknięcie Schema.org */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Wróć do bazy wiedzy
      </Link>

      <header className="mb-10">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-accent/30 text-brand-secondary border border-brand-accent/50 uppercase tracking-wider">
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-brand-primary mt-4 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-brand-muted border-b border-brand-card/40 pb-6">
          <span className="inline-flex items-center gap-2">
            <User className="w-4 h-4 text-brand-secondary" /> Alicja Jankiewicz
          </span>
          <span className="inline-flex items-center gap-2">
            <Calendar className="w-4 h-4" /> {post.date}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4" /> {post.readTime}
          </span>
        </div>
      </header>

      {/* Treść artykułu z optymalizacją czytelności */}
      <div 
        className="prose prose-lg prose-neutral max-w-none font-sans font-light leading-relaxed text-brand-charcoal"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Blok E-E-A-T i konwersja (Rezerwacja konsultacji) */}
      <section className="mt-16 p-8 bg-brand-card/30 rounded-2xl border border-brand-card/60 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-serif font-semibold text-brand-primary">Potrzebujesz bezpiecznej przestrzeni do rozmowy?</h3>
          <p className="text-sm text-brand-muted mt-1">Konsultacje psychologiczne i psychoterapia w Gdańsku Jasieniu.</p>
        </div>
        <button
          onClick={onOpenBooking}
          className="whitespace-nowrap px-6 py-3 rounded-full bg-brand-primary text-white font-medium text-sm hover:bg-brand-secondary transition-all shadow-sm"
        >
          Umów pierwszą wizytę
        </button>
      </section>
    </article>
  );
}
