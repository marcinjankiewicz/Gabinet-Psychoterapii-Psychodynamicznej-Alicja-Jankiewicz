# Przyjazne adresy URL (Slug) artykułów blogowych w Sitemap.xml i Firestore

Naprawa generatora `sitemap.xml` oraz synchronizacja istniejących artykułów w bazie Firebase Firestore, aby wszystkie wpisy blogowe używały czytelnych adresów URL opartych na tytule (np. `/blog/czym-jest-psychoterapia-psychodynamiczna`) zamiast technicznych identyfikatorów dokumentów.

### User Review & Critical Decisions

> [!IMPORTANT]
> Dotychczasowe 6 artykułów w bazie Firestore zostało utworzonych przed dodaniem pola `slug`, dlatego w bazie posiadały jedynie pole `title` i techniczne `id` (np. `5taugrtz7xs7Y5o2wZLu`). Skrypt `generate-sitemap.ts` sprawdzał wyłącznie `data.slug || docSnap.id`, przez co dla starszych wpisów wstawiał ich identyfikatory.

- **Generowanie sluga z tytułu (`title`)**: Skrypt generujący mapę witryny będzie automatycznie przekształcał tytuł artykułu (`data.title`) na czysty slug bez polskich znaków i znaków interpunkcyjnych, jeśli pole `data.slug` nie jest jeszcze zapisane lub pokrywa się z ID dokumentu.
- **Automatyczne uzupełnienie brakujących pól `slug` w bazie Firestore**: Podczas uruchomienia generatora sitemapy skrypt jednorazowo zapisze wygenerowane, przyjazne slugi bezpośrednio do istniejących dokumentów w kolekcji `blog_posts`, dzięki czemu baza danych, aplikacja i `sitemap.xml` będą w 100% spójne.
- **Zachowanie podstron usług SEO w `sitemap.xml`**: Mapa witryny uwzględni również dedykowane podstrony usług (`/psychoterapia-indywidualna-gdansk`, `/psycholog-dzieciecy-gdansk`, `/pomoc-w-kryzysie-gdansk`).

### 1. Overview & Core Concept

- **What It Does**: Zapewnia, że każdy artykuł na blogu — zarówno nowo tworzony, jak i już istniejący w bazie Firestore — posiada przyjazny adres URL w formacie `https://www.gabinetpsychologagdansk.pl/blog/tytul-artykulu` zarówno na stronie, jak i w generowanym pliku `public/sitemap.xml`.
- **Target Audience / Persona**: Roboty indeksujące Google (SEO) oraz czytelnicy odwiedzający bazę wiedzy gabinetu.
- **Key Value**: Wyeliminowanie losowych identyfikatorów (`5taugrtz7xs7Y5o2wZLu`) z mapy witryny i zastąpienie ich słowami kluczowymi z tytułów artykułów.

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. Użytkownik lub robot Google otwiera `sitemap.xml` i widzi wyłącznie czytelne adresy `/blog/...` wygenerowane z tytułów wpisów.
  2. Po wejściu na adres `/blog/czym-jest-psychoterapia-psychodynamiczna` widok artykułu ładuje właściwy wpis, ustawia poprawny tytuł karty przeglądarki, opis meta oraz dane strukturalne `BlogPosting` z kanonicznym adresem URL opartym na slugu.
- **Visual Identity & Theme**:
  - Bez zmian w warstwie wizualnej gabinetu — zachowana zostaje spokojna estetyka editorial oraz spójny układ kart artykułów i widoku czytania.

### 3. Key Product Decisions & Trade-Offs

- **Decision 1**: Wspólna logika `slugify` w generatorze `sitemap.xml`, kliencie Firebase i widokach bloga.
  - *Chosen Approach*: Zastosowanie identycznej funkcji normalizującej polskie znaki diakrytyczne (`ą -> a`, `ć -> c`, `ę -> e`, `ł -> l`, `ń -> n`, `ó -> o`, `ś -> s`, `ź -> z`, `ż -> z`) i usuwającej znaki zapytania/interpunkcję zarówno w aplikacji, jak i w skrypcie budującym `sitemap.xml`.
  - *Why*: Gwarantuje, że link wygenerowany w `sitemap.xml` zawsze otworzy odpowiedni artykuł po stronie aplikacji React Router (`/blog/:slug`).
- **Decision 2**: Automatyczna aktualizacja (backfill) pola `slug` w dokumentach Firestore podczas generowania sitemapy.
  - *Chosen Approach*: Jeśli dokument w kolekcji `blog_posts` nie posiada jeszcze zapisanego pola `slug`, skrypt oblicza go na podstawie `data.title` i zapisuje w dokumencie Firestore (`setDoc(..., { slug }, { merge: true })`).
  - *Why*: Trwale porządkuje dane w bazie Firestore bez konieczności ręcznego otwierania i zapisywania każdego artykułu w Panelu Terapeuty.

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:
```
┌───────────────────────────────────────────────────────────────────┐
│                Kolekcja Firestore: blog_posts                     │
│        (title, slug, content, excerpt, date, isPinned)            │
└─────────────────┬─────────────────────────────────┬───────────────┘
                  │                                 │
                  ▼                                 ▼
┌───────────────────────────────────┐ ┌─────────────────────────────┐
│     Generator Sitemap (Build)     │ │    Aplikacja React SPA      │
│  1. Pobiera dokumenty z Firestore │ │  - Lista wpisów (/blog)     │
│  2. Tworzy slug z title gdy brak  │ │  - Widok wpisu (/blog/:slug)│
│  3. Uzupełnia brakujący slug w DB │ │  - Dopasowanie po slug/title│
│  4. Zapisuje public/sitemap.xml   │ │  - Schema.org BlogPosting   │
└───────────────────────────────────┘ └─────────────────────────────┘
```
- **Data Model & State**:
  - Każdy dokument w `blog_posts` posiada pole `slug: string` odpowiadające znormalizowanemu tytułowi artykułu (np. `"Czym jest psychoterapia psychodynamiczna?"` -> `"czym-jest-psychoterapia-psychodynamiczna"`).
  - Po zatwierdzeniu planu skrypt zostanie natychmiast uruchomiony, aby wygenerować i zapisać zaktualizowany plik `public/sitemap.xml` z przyjaznymi adresami URL.
