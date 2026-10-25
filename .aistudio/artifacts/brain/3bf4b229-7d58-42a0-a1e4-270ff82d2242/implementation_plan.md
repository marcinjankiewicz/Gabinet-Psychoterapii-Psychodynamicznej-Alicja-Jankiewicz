# Naprawa automatycznej aktualizacji `sitemap.xml` w GitHub Actions

## Podsumowanie problemu
Z przesłanego logu GitHub Actions wynika bezpośrednia przyczyna błędu (`Process completed with exit code 1`):
```text
npm error `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync.
npm error Missing: react-router-dom@7.18.4 from lock file
```
Plik `package-lock.json` w repozytorium nie zawierał nowo dodanej zależności `react-router-dom@7.18.4` (oraz jej podzależności `react-router`, `cookie`, `set-cookie-parser`), przez co polecenie `npm ci` przerywa działanie przed uruchomieniem skryptu `generate:sitemap`.

> [!IMPORTANT]
> **Co zostanie naprawione:**
> 1. **Synchronizacja `package-lock.json` z `package.json`** — zaktualizujemy plik `package-lock.json`, aby polecenie `npm ci` przechodziło bezbłędnie w każdym workflow GitHub Actions.
> 2. **Zabezpieczenie workflow `.github/workflows/deploy-sitemap.yml`** — upewnimy się, że akcja poprawnie instaluje zależności, generuje świeży plik `public/sitemap.xml` z Firebase Firestore, zapisuje go w repozytorium (uprawnienia `contents: write`) oraz bezpiecznie przesyła plik `sitemap.xml` na serwer FTP Seohost.

---

## 1. Architektura i przepływ aktualizacji

```
┌──────────────────────────────────────────────────────────────────────┐
│                   GitHub Actions (deploy-sitemap.yml)                │
├──────────────────────────────────────────────────────────────────────┤
│ 1. Checkout repozytorium + Node.js 22                                │
│ 2. Instalacja zależności (zgodny package-lock.json -> npm ci / npm i)│
│ 3. Uruchomienie: npm run generate:sitemap                            │
│      └── Pobranie wpisów z kolekcji blog_posts (Firebase Firestore)  │
│      └── Wygenerowanie czystych slugów SEO i zapis public/sitemap.xml│
│ 4. Wgranie public/sitemap.xml na serwer FTP Seohost                  │
│ 5. Commit i push zaktualizowanego public/sitemap.xml do repozytorium │
└──────────────────────────────────────────────────────────────────────┘
```

## 2. Kluczowe zmiany techniczne

- **Aktualizacja `package-lock.json`**:
  - Przeprowadzenie pełnej synchronizacji pliku blokady (`package-lock.json`) z `package.json`, aby uwzględnić `react-router-dom@7.18.4` i wszystkie wymagane pakiety podrzędne.
- **Usprawnienie `.github/workflows/deploy-sitemap.yml`**:
  - Dodanie bloku `permissions: contents: write`, aby bot GitHub Actions miał uprawnienia do zapisu zaktualizowanego `public/sitemap.xml` w repozytorium.
  - Bezpieczne przesłanie wygenerowanego pliku `public/sitemap.xml` na serwer FTP Seohost oraz automatyczny commit zmian do gałęzi `main`, jeśli zawartość `public/sitemap.xml` uległa zmianie.
