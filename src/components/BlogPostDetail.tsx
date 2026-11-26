import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBlogPosts } from '../lib/firebase';
import { slugify } from '../lib/slugify';
import { BlogPost } from '../types';
import { Calendar, Clock, ArrowLeft, ArrowRight, User, BookOpen, MapPin } from 'lucide-react';
import BlogContentRenderer from './BlogContentRenderer';
import { CANONICAL_BASE_URL, parsePolishDateToIso, usePageSeo } from '../hooks/usePageSeo';

export default function BlogPostDetail({ onOpenBooking }: { onOpenBooking: () => void }) {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  useEffect(() => {
    let active = true;
    async function loadPost() {
      setLoading(true);
      try {
        const posts = await fetchBlogPosts();
        if (!active) return;
        setAllPosts(posts);
        const found = posts.find(
          (p) => p.slug === slug || slugify(p.title) === slug || p.id === slug
        );
        setPost(found || null);
      } catch (err) {
        console.error('Failed to fetch blog post from Firestore, checking cache:', err);
        if (!active) return;
        const saved = localStorage.getItem('alicja_jankiewicz_blog_posts_v2');
        if (saved) {
          try {
            const parsed: BlogPost[] = JSON.parse(saved);
            setAllPosts(parsed);
            const found = parsed.find(
              (p) => p.slug === slug || slugify(p.title) === slug || p.id === slug
            );
            setPost(found || null);
          } catch {
            setAllPosts([]);
            setPost(null);
          }
        } else {
          setAllPosts([]);
          setPost(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    loadPost();
    return () => {
      active = false;
    };
  }, [slug]);

  const resolvedSlug = post ? post.slug || slugify(post.title) : slug || '';
  const canonicalPath = resolvedSlug ? `/blog/${resolvedSlug}` : '/blog';
  const seoTitle = post
    ? `${post.title} | Blog Psychologiczny – Alicja Jankiewicz Gdańsk`
    : 'Artykuł | Blog Psychologiczny – Alicja Jankiewicz Gdańsk';
  const seoDescription = post
    ? post.excerpt ||
      post.content.replace(/[#*]/g, '').substring(0, 155).trim() + '...'
    : 'Artykuły o psychoterapii psychodynamicznej, zdrowiu psychicznym i wsparciu emocjonalnym – Gabinet Psychoterapii Gdańsk Jasień.';
  const seoImage =
    post?.image && post.image.startsWith('http')
      ? post.image
      : `${CANONICAL_BASE_URL}/alicjajankiewicz1.webp`;

  const blogPostingSchema = useMemo(() => {
    if (!post) return null;
    const articleUrl = `${CANONICAL_BASE_URL}/blog/${resolvedSlug}`;
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${articleUrl}#article`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleUrl,
      },
      headline: post.title,
      description: seoDescription,
      image: seoImage,
      datePublished: parsePolishDateToIso(post.date),
      articleSection: post.category,
      inLanguage: 'pl-PL',
      author: {
        '@type': 'Person',
        '@id': `${CANONICAL_BASE_URL}/#alicja-jankiewicz`,
        name: 'Alicja Jankiewicz',
        jobTitle: 'Psycholog, Psychoterapeuta psychodynamiczny',
        url: `${CANONICAL_BASE_URL}/`,
      },
      publisher: {
        '@id': `${CANONICAL_BASE_URL}/#gabinet`,
      },
      url: articleUrl,
    };
  }, [post, resolvedSlug, seoDescription, seoImage]);

  usePageSeo({
    title: seoTitle,
    description: seoDescription,
    canonicalPath,
    ogType: post ? 'article' : 'website',
    ogImage: seoImage,
    jsonLd: blogPostingSchema,
    jsonLdId: 'blog-posting-schema-jsonld',
  });

  const relatedPosts = useMemo(() => {
    if (!post || allPosts.length <= 1) return [];
    const others = allPosts.filter((p) => p.id !== post.id);
    const sameCategory = others.filter((p) => p.category === post.category);
    const differentCategory = others.filter((p) => p.category !== post.category);
    return [...sameCategory, ...differentCategory].slice(0, 3);
  }, [post, allPosts]);

  if (loading) {
    return <div className="py-24 text-center text-brand-muted">Ładowanie artykułu...</div>;
  }

  if (!post) {
    return (
      <div className="py-24 text-center px-6">
        <h1 className="text-2xl font-serif text-brand-primary font-semibold">
          Artykuł nie został odnaleziony
        </h1>
        <Link to="/blog" className="mt-4 inline-block text-brand-secondary hover:text-brand-primary underline">
          Wróć do listy wpisów
        </Link>
      </div>
    );
  }

  return (
    <article className="py-8 md:py-12 lg:py-14 max-w-[840px] mx-auto px-4 sm:px-6">
      <nav aria-label="Powrót do listy artykułów" className="mb-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Wróć do bazy wiedzy
        </Link>
      </nav>

      <header className="mb-8 md:mb-10">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-accent/30 text-brand-secondary border border-brand-accent/50 uppercase tracking-wider">
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-brand-primary mt-4 mb-6 leading-tight break-words">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-brand-muted border-b border-brand-card/40 pb-6">
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

      {post.image ? (
        <div className="w-full h-56 sm:h-72 md:h-96 rounded-2xl overflow-hidden mb-8 md:mb-10 shadow-soft-lift">
          <img
            src={post.image}
            alt={`${post.title} – artykuł psychologiczny, Gabinet Psychoterapii Gdańsk`}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      ) : post.imagePlaceholderStyle ? (
        <div
          className={`w-full h-36 sm:h-44 md:h-52 rounded-2xl ${post.imagePlaceholderStyle} mb-8 md:mb-10 flex items-center justify-center relative overflow-hidden shadow-soft-lift`}
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#455a65_1px,transparent_1px)] [background-size:16px_16px]" />
          <BookOpen className="text-brand-primary/30 w-14 h-14 relative z-10" />
        </div>
      ) : null}

      {/* Treść artykułu z zachowaniem spacji, tabulacji, enterów i formatowania */}
      <BlogContentRenderer content={post.content} />

      {/* Spokojne, etyczne wezwanie do działania (CTA) */}
      <section className="mt-12 p-7 sm:p-8 bg-brand-card/55 rounded-2xl border border-brand-accent/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-soft-lift">
        <div className="space-y-2">
          <h2 className="text-xl font-serif font-semibold text-brand-primary">
            Potrzebujesz spokojnej, bezpiecznej przestrzeni do rozmowy?
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            Jeśli poruszany temat jest Ci bliski, zapraszam na wstępną konsultację psychologiczną w moim gabinecie w Gdańsku (dzielnica Jasień, ul. Kartuska 356a). Spotkanie trwa 50 minut (200 zł) i odbywa się z pełnym poszanowaniem tajemnicy zawodowej.
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-brand-secondary font-medium pt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>ul. Kartuska 356a, 80-125 Gdańsk • Poniedziałek – Piątek, 08:00–20:00</span>
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenBooking}
          className="whitespace-nowrap px-6 py-3 rounded-xl bg-brand-primary text-white font-serif font-medium text-sm hover:bg-brand-secondary transition-all shadow-sm cursor-pointer shrink-0"
        >
          Umów pierwszą konsultację
        </button>
      </section>

      {/* Powiązane artykuły — naturalne linkowanie wewnętrzne */}
      {relatedPosts.length > 0 && (
        <section aria-label="Powiązane artykuły" className="mt-10 pt-8 border-t border-brand-card/70">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-serif font-semibold text-brand-primary">
              Przeczytaj również
            </h2>
            <Link
              to="/blog"
              className="text-xs font-semibold uppercase tracking-wider text-brand-secondary hover:text-brand-primary transition-colors"
            >
              Wszystkie artykuły &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedPosts.map((related) => {
              const relatedSlug = related.slug || slugify(related.title) || related.id;
              return (
                <Link
                  key={related.id}
                  to={`/blog/${relatedSlug}`}
                  className="group flex flex-col justify-between p-5 rounded-2xl bg-brand-card/45 border border-brand-card hover:border-brand-accent/60 hover:bg-brand-card/70 transition-all shadow-xs"
                >
                  <div>
                    <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-brand-secondary mb-2">
                      {related.category}
                    </span>
                    <h3 className="font-serif font-semibold text-brand-primary text-base leading-snug group-hover:text-brand-secondary transition-colors">
                      {related.title}
                    </h3>
                  </div>
                  <div className="mt-4 pt-3 border-t border-brand-card/60 flex items-center justify-between text-xs text-brand-muted">
                    <span>{related.readTime || 'Artykuł'}</span>
                    <span className="inline-flex items-center gap-1 font-medium text-brand-secondary group-hover:translate-x-0.5 transition-transform">
                      Czytaj <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
}
