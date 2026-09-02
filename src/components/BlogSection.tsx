import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  ArrowLeft, 
  Plus, 
  Edit2, 
  Trash2, 
  Lock, 
  Unlock, 
  Clock, 
  ArrowRight, 
  Check, 
  FileText, 
  AlertCircle,
  Pin,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BlogPost } from '../types';
import { fetchBlogPosts, saveBlogPost, deleteBlogPost, uploadBlogImage } from '../lib/firebase';

interface BlogSectionProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
}

const DEFAULT_POSTS: BlogPost[] = [];

const CATEGORIES = ['Wszystkie', 'Zdrowie emocjonalne', 'Psychoterapia', 'Relacje', 'Dla Rodziców', 'Inne'];

const BACKGROUND_PRESETS = [
  { id: 'slate', name: 'Ambient Slate', style: 'bg-gradient-to-br from-[#455a65]/35 to-[#1b1c1c]/10' },
  { id: 'sage', name: 'Warm Sage', style: 'bg-gradient-to-br from-[#4c6455]/30 to-[#cbe6d4]/40' },
  { id: 'waves', name: 'Flowing Waves', style: 'bg-gradient-to-br from-[#105459]/25 to-[#fbf9f8]' },
  { id: 'sand', name: 'Calming Sand', style: 'bg-gradient-to-br from-[#f6f3f2] via-[#e6e2e0] to-[#cbe6d4]/20' }
];

export default function BlogSection({ onBackToHome, onOpenBooking }: BlogSectionProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  // Admin Mode states
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Psychoterapia');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formImage, setFormImage] = useState<string>('');
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [formPresetStyle, setFormPresetStyle] = useState('bg-gradient-to-br from-[#455a65]/20 to-[#4c6455]/30');
  const [formDate, setFormDate] = useState('');
  const [formIsPinned, setFormIsPinned] = useState(false);

  const CHARACTER_LIMIT_A4 = 3500;
  const contentCharCount = formContent.length;
  const a4UsagePercent = Math.min(Math.round((contentCharCount / CHARACTER_LIMIT_A4) * 100), 100);

  const [isLoading, setIsLoading] = useState(false);

  // Load and save logic
  const loadPostsFromFirebase = async () => {
    setIsLoading(true);
    try {
      const dbPosts = await fetchBlogPosts();
      setPosts(dbPosts);
      // POPRAWIONE: Aktualizacja lokalnego cache zaraz po udanym pobraniu z bazy
      localStorage.setItem('alicja_jankiewicz_blog_posts_v2', JSON.stringify(dbPosts));
    } catch (e) {
      console.error('Failed to fetch from Firebase, reading backup cache:', e);
      const saved = localStorage.getItem('alicja_jankiewicz_blog_posts_v2');
      if (saved) {
        try {
          setPosts(JSON.parse(saved));
        } catch (err) {
          setPosts(DEFAULT_POSTS);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPostsFromFirebase();
  }, []);

  const savePostsToCache = (newPosts: BlogPost[]) => {
    setPosts(newPosts);
    localStorage.setItem('alicja_jankiewicz_blog_posts_v2', JSON.stringify(newPosts));
  };

  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const hashedInput = await hashPassword(passwordInput);
    if (hashedInput === '06c4e6f6f12e32a4985fd8c596960e8b219a6c4585c8815b3be48b150cae8fe0') {
      setIsAdminUnlocked(true);
      setShowAdminLogin(false);
      setPasswordError(false);
      setPasswordInput('');
    } else {
      setPasswordError(true);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const estimateReadTime = (text: string): string => {
    const words = text.trim().split(/\s+/).length;
    const wpm = 200; 
    const minutes = Math.max(1, Math.ceil(words / wpm));
    return `${minutes} min czytania`;
  };

  const startNewPost = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    setEditingPostId(null);
    setFormTitle('');
    setFormCategory('Psychoterapia');
    setFormExcerpt('');
    setFormContent('');
    setFormImage('');
    setSelectedImageFile(null);
    setFormPresetStyle('bg-gradient-to-br from-[#455a65]/20 to-[#4c6455]/30');
    setFormDate(formattedDate);
    setFormIsPinned(false);
    setIsAddingNew(true);
  };

  const startEditPost = (post: BlogPost) => {
    setEditingPostId(post.id);
    setFormTitle(post.title);
    setFormCategory(post.category);
    setFormExcerpt(post.excerpt);
    setFormContent(post.content);
    setFormImage(post.image || '');
    setSelectedImageFile(null);
    setFormPresetStyle(post.imagePlaceholderStyle || 'bg-gradient-to-br from-[#455a65]/20 to-[#4c6455]/30');
    setFormDate(post.date);
    setFormIsPinned(!!post.isPinned);
    setIsAddingNew(true);
  };

  const handleDeletePost = async (id: string) => {
    if (confirm('Czy na pewno chcesz usunąć ten artykuł? Ta operacja jest nieodwracalna.')) {
      setIsLoading(true);
      try {
        await deleteBlogPost(id);
        const filtered = posts.filter(p => p.id !== id);
        savePostsToCache(filtered);
        if (selectedPost && selectedPost.id === id) {
          setSelectedPost(null);
        }
      } catch (err) {
        console.error('Delete failed:', err);
        alert('Nie udało się usunąć artykułu z bazy danych Firebase.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) {
      alert('Tytuł oraz treść są wymagane!');
      return;
    }

    setIsLoading(true);
    try {
      let finalImageUrl: string | undefined = formImage ? formImage : undefined;

      // If a new raw image file was selected, upload it to Firebase Storage first!
      if (selectedImageFile) {
        setIsUploadingImage(true);
        try {
          finalImageUrl = await uploadBlogImage(selectedImageFile);
        } catch (uploadErr) {
          console.error('Firebase Storage upload failed, falling back to base64:', uploadErr);
          // Fallback to base64 which is already in formImage
          alert('Wgrywanie na Firebase Storage nie powiodło się (upewnij się, że usługa Storage jest włączona). Obraz został zapisany lokalnie w formacie Base64.');
        } finally {
          setIsUploadingImage(false);
        }
      }

      const calculatedReadTime = estimateReadTime(formContent);
      const finalExcerpt = formExcerpt.trim() || (formContent.substring(0, 160) + '...');

      const postData: BlogPost = {
        id: editingPostId || '',
        title: formTitle.trim(),
        category: formCategory,
        excerpt: finalExcerpt.trim(),
        content: formContent.trim(),
        image: finalImageUrl,
        imagePlaceholderStyle: !finalImageUrl ? formPresetStyle : undefined,
        date: formDate || new Date().toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }),
        readTime: calculatedReadTime,
        isPinned: formIsPinned
      };

      const savedResult = await saveBlogPost(postData);

      let updatedPosts = [...posts];

      if (editingPostId) {
        updatedPosts = updatedPosts.map(p => p.id === editingPostId ? savedResult : p);
      } else {
        updatedPosts = [savedResult, ...updatedPosts];
      }

      updatedPosts.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0;
      });

      savePostsToCache(updatedPosts);
      setIsAddingNew(false);
      setEditingPostId(null);
      setSelectedImageFile(null);
    } catch (err) {
      console.error('Save failed:', err);
      alert('Nie udało się zapisać artykułu w bazie danych Firebase.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = selectedCategory === 'Wszystkie'
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-[1140px] mx-auto px-6 py-12" id="blog-view">
      <AnimatePresence mode="wait">
        
        {/* Full Post Reader Mode */}
        {selectedPost ? (
          <motion.div
            key="reader"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-brand-bg min-h-[600px]"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-card pb-6 mb-8">
              <button 
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-brand-secondary font-semibold hover:text-brand-primary transition-colors cursor-pointer text-sm"
              >
                <ArrowLeft size={16} />
                Powrót do listy artykułów
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-brand-muted">{selectedPost.date}</span>
                <span className="text-brand-accent/60">|</span>
                <span className="text-xs text-brand-muted flex items-center gap-1">
                  <Clock size={12} /> {selectedPost.readTime}
                </span>
              </div>
            </div>

            <article className="max-w-3xl mx-auto">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-brand-accent/50 text-brand-secondary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                  {selectedPost.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-serif text-brand-primary leading-tight font-bold tracking-tight mb-6">
                  {selectedPost.title}
                </h1>
              </div>

              {selectedPost.image ? (
                <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-10 shadow-soft-lift">
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    fetchPriority="high" 
                    decoding="async"    
                  />
                </div>
              ) : (
                <div className={`w-full h-40 md:h-56 rounded-2xl ${selectedPost.imagePlaceholderStyle || 'bg-brand-card'} mb-10 flex items-center justify-center relative overflow-hidden shadow-soft-lift`}>
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#455a65_1px,transparent_1px)] [background-size:16px_16px]" />
                  <BookOpen className="text-brand-primary/30 w-16 h-16 relative z-10" />
                </div>
              )}

              <div className="prose prose-brand max-w-none font-sans text-brand-charcoal text-base md:text-lg leading-relaxed whitespace-pre-wrap selection:bg-brand-accent">
                {selectedPost.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl md:text-3xl font-serif text-brand-primary font-bold mt-8 mb-4 border-b border-brand-accent/20 pb-2">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-xl md:text-2xl font-serif text-brand-primary font-bold mt-6 mb-3">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.includes('\n* ') || paragraph.includes('\n- ') || paragraph.includes('\n1. ')) {
                    return (
                      <div key={index} className="my-4 pl-4 border-l-2 border-brand-accent py-1 bg-brand-card/30 rounded-r-lg">
                        {paragraph.split('\n').map((line, lIdx) => (
                          <p key={lIdx} className="my-1.5 text-sm md:text-base text-brand-muted">
                            {line}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return (
                    <p key={index} className="mb-6 last:mb-0">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              <div className="mt-16 p-8 rounded-2xl bg-brand-card/85 border border-brand-accent/40 text-center shadow-soft-lift">
                <h3 className="font-serif text-xl text-brand-primary font-semibold mb-2">
                  Potrzebujesz profesjonalnej rozmowy?
                </h3>
                <p className="text-brand-muted text-sm max-w-lg mx-auto mb-6">
                  Jeśli poruszane tematy rezonują z Twoimi własnymi trudnościami, zapraszam na indywidualną konsultację psychoterapeutyczną w moim gabinecie w Gdańsku.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={onOpenBooking}
                    className="bg-brand-primary hover:bg-brand-primary/95 text-white font-medium text-sm px-6 py-3 rounded-lg shadow-soft-lift transition-all cursor-pointer"
                  >
                    Umów konsultację
                  </button>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="border border-brand-muted/30 hover:border-brand-primary text-brand-muted hover:text-brand-primary text-sm px-5 py-3 rounded-lg transition-all cursor-pointer bg-brand-bg"
                  >
                    Powrót do bloga
                  </button>
                </div>
              </div>
            </article>
          </motion.div>
        ) : isAddingNew ? (
          
          /* Therapist Creator Panel View */
          <motion.div
            key="creator"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-brand-card border border-brand-accent/40 rounded-3xl p-6 md:p-10 shadow-soft-lift"
          >
            <div className="flex items-center justify-between border-b border-brand-accent/20 pb-5 mb-8">
              <div>
                <span className="text-xs uppercase font-semibold text-brand-secondary tracking-widest block mb-1">Panel Terapeuty</span>
                <h2 className="text-2xl md:text-3xl font-serif text-brand-primary font-bold">
                  {editingPostId ? 'Edytuj artykuł' : 'Stwórz nowy artykuł'}
                </h2>
              </div>
              <button
                onClick={() => setIsAddingNew(false)}
                className="text-brand-muted hover:text-brand-primary text-sm font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ArrowLeft size={16} /> Anuluj
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-brand-primary tracking-wider mb-2">
                      Tytuł Artykułu *
                    </label>
                    <input
                      type="text"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="np. Jak stawiać zdrowe granice w rodzinie"
                      className="w-full bg-brand-bg border border-brand-muted/20 focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary outline-none rounded-xl px-4 py-3 text-sm text-brand-charcoal transition-all font-medium"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-brand-primary tracking-wider mb-2">
                        Kategoria
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full bg-brand-bg border border-brand-muted/20 focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary outline-none rounded-xl px-4 py-3 text-sm text-brand-charcoal transition-all font-medium appearance-none cursor-pointer"
                      >
                        {CATEGORIES.filter(c => c !== 'Wszystkie').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-brand-primary tracking-wider mb-2">
                        Data publikacji
                      </label>
                      <input
                        type="text"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        placeholder="np. 22 czerwca 2026"
                        className="w-full bg-brand-bg border border-brand-muted/20 focus:border-brand-secondary outline-none rounded-xl px-4 py-3 text-sm text-brand-charcoal transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-brand-primary tracking-wider mb-2">
                      Krótki skrót / Zajawka (Optional)
                    </label>
                    <textarea
                      value={formExcerpt}
                      onChange={(e) => setFormExcerpt(e.target.value)}
                      placeholder="Krótkie streszczenie, które będzie widoczne na liście artykułów. Jeśli zostawisz puste, wygeneruje się automatycznie."
                      rows={2}
                      className="w-full bg-brand-bg border border-brand-muted/20 focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary outline-none rounded-xl px-4 py-3 text-sm text-brand-charcoal transition-all font-medium resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="pin-post"
                      checked={formIsPinned}
                      onChange={(e) => setFormIsPinned(e.target.checked)}
                      className="accent-brand-secondary h-4 w-4 rounded cursor-pointer"
                    />
                    <label htmlFor="pin-post" className="text-xs font-bold uppercase text-brand-muted cursor-pointer select-none flex items-center gap-1.5">
                      <Pin size={12} className="text-brand-secondary rotate-45" /> Przypnij ten artykuł na górze listy (Spotlight)
                    </label>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="block text-xs font-bold uppercase text-brand-primary tracking-wider mb-2">
                      Grafika towarzysząca (Opcjonalna)
                    </span>
                    
                    <div className="bg-brand-bg border border-brand-muted/15 p-5 rounded-2xl">
                      <div className="flex gap-4 mb-4">
                        <button
                          type="button"
                          onClick={() => setFormImage('')}
                          className={`flex-1 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${!formImage ? 'bg-brand-primary text-white shadow-soft-lift' : 'bg-brand-card text-brand-muted hover:text-brand-primary'}`}
                        >
                          Użyj tła pastelowego
                        </button>
                        <label
                          className={`flex-1 text-center py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors border ${formImage ? 'bg-brand-primary text-white shadow-soft-lift border-brand-primary' : 'bg-brand-card text-brand-muted hover:text-brand-primary border-transparent'}`}
                        >
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageFileChange} 
                            className="hidden" 
                          />
                          Wgraj plik z dysku
                        </label>
                      </div>

                      {formImage ? (
                        <div className="relative rounded-xl overflow-hidden h-36 shadow-soft-lift bg-black/5">
                          <img 
                            src={formImage} 
                            alt="Podgląd" 
                            className="w-full h-full object-cover" 
                          />
                          <button
                            type="button"
                            onClick={() => setFormImage('')}
                            className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/85 text-white rounded-full text-xs transition-colors cursor-pointer"
                          >
                            Usuń
                          </button>
                        </div>
                      ) : (
                        <div>
                          <p className="text-[11px] text-brand-muted mb-3 font-medium">Brak własnego pliku? Wybierz jedno z gotowych, harmonijnych teł pasujących do gabinetu:</p>
                          <div className="grid grid-cols-2 gap-2.5">
                            {BACKGROUND_PRESETS.map((p) => (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => setFormPresetStyle(p.style)}
                                className={`h-11 rounded-xl text-[11px] font-medium leading-none ${p.style} flex items-center justify-between px-3 text-brand-charcoal transition-all border cursor-pointer ${formPresetStyle === p.style ? 'ring-2 ring-brand-secondary border-brand-secondary scale-[1.02] font-bold' : 'border-black/5'}`}
                              >
                                <span>{p.name}</span>
                                {formPresetStyle === p.style && <Check size={12} className="text-brand-secondary" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-brand-bg border border-brand-accent/30 space-y-2">
                    <span className="text-xs font-bold text-brand-primary flex items-center gap-1">
                      <Sparkles size={13} className="text-brand-secondary" /> Porady pisarskie:
                    </span>
                    <ul className="text-[11px] leading-relaxed text-brand-muted space-y-1 list-disc pl-3">
                      <li>Krótkie formy są bardziej przyswajalne dla pacjentów poszukujących pomocy.</li>
                      <li>Podziel tekst na akapity, używając pustej linii (podwójny Enter) między nimi.</li>
                      <li>Możesz wyróżnić śródtytuł dodając na początku linii znaki <code className="bg-brand-accent/35 px-1 py-0.5 rounded font-mono text-[9px]">###</code> (np. <code className="bg-brand-accent/35 px-1 py-0.5 rounded font-mono text-[9px]">### Praktyczna wskazówka</code>).</li>
                    </ul>
                  </div>
                </div>

              </div>

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <label className="block text-xs font-bold uppercase text-brand-primary tracking-wider">
                    Treść artykułu *
                  </label>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                    <span className="text-brand-muted flex items-center gap-1">
                      <FileText size={13} /> Długość: {contentCharCount} znaków
                    </span>
                    <span className={`${a4UsagePercent > 90 ? 'text-amber-700 font-bold' : 'text-brand-secondary'} flex items-center gap-1`}>
                      <AlertCircle size={13} /> {a4UsagePercent}% strony A4
                    </span>
                  </div>
                </div>

                <div className="mb-2 bg-brand-bg rounded-2xl border border-brand-muted/20 focus-within:border-brand-secondary focus-within:ring-1 focus-within:ring-brand-secondary overflow-hidden transition-all">
                  <textarea
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Wpisz treść artykułu..."
                    rows={12}
                    className="w-full bg-transparent border-none outline-none px-5 py-4 text-sm md:text-base text-brand-charcoal resize-y font-sans leading-relaxed"
                    required
                  />
                </div>

                <div className="w-full bg-brand-bg/50 h-1.5 rounded-full overflow-hidden mb-1 border border-black/5">
                  <div 
                    className={`h-full transition-all duration-300 rounded-full ${a4UsagePercent > 85 ? 'bg-amber-600' : 'bg-brand-secondary'}`}
                    style={{ width: `${a4UsagePercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-brand-muted font-medium">
                  <span>Zajętość strony A4</span>
                  <span>{a4UsagePercent >= 100 ? 'Osiągnięto limit 1 strony A4' : 'Zalecana wielkość artykułu: do jednej strony A4'}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-brand-accent/20">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold text-brand-muted hover:text-brand-primary transition-colors cursor-pointer"
                >
                  Anuluj i zamknij
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-brand-primary hover:bg-brand-primary/95 text-white font-medium text-sm px-6 py-2.5 rounded-lg shadow-soft-lift transition-all cursor-pointer flex items-center gap-1.5 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>{isUploadingImage ? 'Wgrywanie zdjęcia...' : 'Zapisywanie...'}</span>
                    </>
                  ) : (
                    <>
                      <Check size={16} /> <span>Opublikuj artykuł</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          
          /* Blog Landing Page Reader Screen */
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            {/* WDROŻONE: Przycisk wywołujący przekazany prop onBackToHome */}
            <div className="flex justify-start">
              <button
                onClick={onBackToHome}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-muted hover:text-brand-secondary transition-colors cursor-pointer bg-brand-card/40 px-4 py-2 rounded-xl border border-black/5"
              >
                <ArrowLeft size={14} /> Powrót do strony głównej
              </button>
            </div>

            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary bg-brand-accent/40 px-3.5 py-1.5 rounded-full inline-block">
                Artykuły i Przemyślenia
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-brand-primary font-bold tracking-tight">
                Przestrzeń Refleksji
              </h1>
              <p className="text-brand-muted text-sm md:text-base leading-relaxed">
                Miejsce, w którym dzielę się wiedzą o psychologii, terapii psychodynamicznej oraz dbaniu o zdrowie emocjonalne swoje i najbliższych.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-card pb-5">
              
              {/* Category buttons */}
              <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSelectedPost(null);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 ${selectedCategory === cat ? 'bg-brand-secondary text-white shadow-soft-lift scale-[1.02]' : 'bg-brand-card/85 text-brand-muted hover:bg-brand-card hover:text-brand-primary'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {isAdminUnlocked ? (
                  <div className="flex items-center gap-2 bg-brand-accent/35 border border-brand-accent px-3 py-1.5 rounded-xl">
                    <span className="text-[11px] font-bold text-brand-secondary uppercase flex items-center gap-1">
                      <Unlock size={12} /> Zalogowano
                    </span>
                    <button
                      onClick={startNewPost}
                      className="bg-brand-primary hover:bg-brand-primary/95 text-white p-1.5 rounded-lg shadow-sm cursor-pointer transition-all"
                      title="Dodaj nowy artykuł"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => setIsAdminUnlocked(false)}
                      className="text-brand-muted hover:text-brand-primary text-xs font-semibold underline underline-offset-2 ml-1 cursor-pointer"
                    >
                      Wyloguj
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowAdminLogin(!showAdminLogin);
                      setPasswordError(false);
                      setPasswordInput('');
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-brand-muted hover:text-brand-primary transition-all cursor-pointer bg-brand-card/50 hover:bg-brand-card px-3.5 py-2 rounded-xl border border-black/5"
                  >
                    <Lock size={12} /> Panel Terapeuty
                  </button>
                )}
              </div>
            </div>

            <AnimatePresence>
              {showAdminLogin && !isAdminUnlocked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-brand-card/90 border border-brand-accent/40 rounded-2xl p-5 max-w-sm ml-auto shadow-soft-lift"
                >
                  <form onSubmit={handleAdminLogin} className="space-y-3">
                    <span className="block text-xs font-bold text-brand-primary uppercase tracking-wider">Hasło dostępu do edycji</span>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        placeholder="Wpisz hasło dostępu"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        className="flex-1 bg-brand-bg border border-brand-muted/20 focus:border-brand-secondary outline-none rounded-lg px-3 py-2 text-xs font-semibold"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="bg-brand-primary hover:bg-brand-primary/95 text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                      >
                        Odblokuj
                      </button>
                    </div>
                    {passwordError && (
                      <p className="text-[11px] text-red-600 font-bold">Niepoprawne hasło. Spróbuj ponownie.</p>
                    )}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-20 bg-brand-card/45 rounded-2xl border border-black/[0.02]">
                <BookOpen className="text-brand-muted/20 w-16 h-16 mx-auto mb-4" />
                <h3 className="font-serif text-lg text-brand-primary font-medium mb-1">Brak artykułów w tej kategorii</h3>
                <p className="text-brand-muted text-xs">Cofnij filtr na "Wszystkie", aby zobaczyć całą treść.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {filteredPosts.map((post) => {
                  const isPostPinned = !!post.isPinned;
                  
                  return (
                    <motion.article
                      key={post.id}
                      layoutId={`post-container-${post.id}`}
                      className={`group bg-brand-card hover:bg-brand-bg/40 border border-brand-card hover:border-brand-accent/50 rounded-2xl md:rounded-3xl p-6 transition-all duration-300 relative flex flex-col justify-between overflow-hidden shadow-soft-lift ${isPostPinned ? 'md:col-span-2' : ''}`}
                    >
                      {isPostPinned && (
                        <div className="absolute top-0 right-0 bg-brand-accent/90 text-brand-secondary px-4 py-1.5 rounded-bl-2xl text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 z-10 select-none">
                          <Pin size={10} className="rotate-45" /> Polecane
                        </div>
                      )}

                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary bg-brand-accent/30 px-2.5 py-1 rounded-md">
                            {post.category}
                          </span>
                          <span className="text-[10px] text-brand-muted font-medium">{post.date}</span>
                        </div>

                        <div className="space-y-2">
                          <h3 className={`font-serif text-brand-primary leading-tight font-bold group-hover:text-brand-secondary transition-colors ${isPostPinned ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
                            {post.title}
                          </h3>
                          <p className="text-brand-muted text-xs md:text-sm leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      {isPostPinned && !post.image && (
                        <div className="my-5 h-20 rounded-xl bg-gradient-to-r from-brand-accent/25 via-brand-card to-transparent border border-black/[0.02]" />
                      )}

                      <div className="pt-6 mt-6 border-t border-brand-accent/15 flex items-center justify-between">
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="text-brand-secondary font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer hover:text-brand-primary uppercase tracking-wider"
                        >
                          Czytaj artykuł <ArrowRight size={14} />
                        </button>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-brand-muted font-medium flex items-center gap-1">
                            <Clock size={11} /> {post.readTime}
                          </span>

                          {isAdminUnlocked && (
                            <div className="flex items-center gap-1 border-l border-brand-accent/30 pl-2 ml-1">
                              <button
                                onClick={() => startEditPost(post)}
                                className="p-1 hover:bg-brand-accent/40 rounded text-brand-muted hover:text-brand-secondary transition-colors cursor-pointer"
                                title="Edytuj post"
                              >
                                <Edit2 size={12} />
                              </button>
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                className="p-1 hover:bg-red-50 rounded text-brand-muted hover:text-red-600 transition-colors cursor-pointer"
                                title="Usuń post"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          )}
                        </div>

                      </div>
                    </motion.article>
                  );
                })}

              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
