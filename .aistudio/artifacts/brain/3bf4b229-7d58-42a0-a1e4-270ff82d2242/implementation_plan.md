# Usunięcie podpunktów na podstronie Psycholog Dziecięcy Gdańsk

Aktualizacja podstrony `/psycholog-dzieciecy-gdansk` polegająca na usunięciu czterech wskazanych podpunktów z sekcji „Specyfika psychoterapii dzieci i młodzieży w ujęciu psychodynamicznym” przy zachowaniu pozostałej treści merytorycznej.

### User Review & Critical Decisions

> [!NOTE]
> Zakres zmiany jest jednoznacznie określony w zapytaniu — obejmuje wyłącznie usunięcie listy czterech wypunktowań w drugiej części artykułowej na podstronie `/psycholog-dzieciecy-gdansk`.

- **Zachowanie akapitów sekcji**: Trzy akapity opisujące specyfikę pracy psychodynamicznej z dziećmi i młodzieżą pozostają bez zmian.
- **Czyste wyrenderowanie karty**: Po usunięciu listy `bulletPoints` dolny separator (`border-t`) oraz lista wypunktowana automatycznie przestaną się wyświetlać, pozostawiając estetycznie domkniętą kartę tekstową.

### 1. Overview & Core Concept

- **What It Does**: Usuwa cztery podpunkty dotyczące doświadczenia klinicznego, SOM, tajemnicy terapeutycznej nastolatka oraz współpracy z instytucjami z sekcji artykułowej na podstronie `/psycholog-dzieciecy-gdansk`.
- **Target Audience / Persona**: Rodzice i opiekunowie przeglądający ofertę pomocy psychologicznej dla dzieci i młodzieży.
- **Key Value**: Bardziej zwięzła prezentacja sekcji dotyczącej specyfiki psychoterapii dzieci i młodzieży, bez powielania informacji dostępnych w innych częściach strony (np. FAQ i dedykowanej zakładce Standardów Ochrony Małoletnich).

### 2. User Experience & Visual Design

- **Key User Flows**: Użytkownik wchodzący na `/psycholog-dzieciecy-gdansk` widzi w sekcji „Wiedza dla pacjenta • Część 2” nagłówek oraz trzy akapity merytoryczne, bez dodatkowej listy wypunktowanej pod spodem.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Spokojna, gabinetowa estetyka editorial (ciepłe tła `bg-brand-bg`, karty `bg-white/60`, akcenty `text-brand-primary` i `text-brand-secondary`).
  - *Typography & Hierarchy*: Nagłówki szeryfowe (`Cormorant Garamond`) oraz czytelny tekst główny (`Plus Jakarta Sans`).
  - *Component Styling & Layout*: Warunkowe renderowanie listy wypunktowanej gwarantuje brak pustych odstępów (`mt-6 pt-6 border-t`) po usunięciu podpunktów.

### 3. Key Product Decisions & Trade-Offs

- **Decision 1**: Usunięcie właściwości `bulletPoints` z drugiego elementu `articleSections` dla klucza `psycholog-dzieciecy-gdansk`.
  - *Chosen Approach*: Całkowite pominięcie tablicy `bulletPoints` w tej sekcji.
  - *Why*: Komponent sprawdza warunek `section.bulletPoints && section.bulletPoints.length > 0`, dzięki czemu karta zachowuje właściwe proporcje i paddingi bez pustego kontenera `<ul>`.

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:
```
┌──────────────────────────────────────────────────────────┐
│              Podstrona /psycholog-dzieciecy-gdansk       │
└─────────────────────────────┬────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────┐
│            Dane sekcji artykułowych (articleSections)    │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Część 1: Pierwsza wizyta (akapity + highlightBox)  │  │
│  ├────────────────────────────────────────────────────┤  │
│  │ Część 2: Specyfika psychoterapii (tylko 3 akapity) │  │
│  ├────────────────────────────────────────────────────┤  │
│  │ Część 3: Przygotowanie dziecka (akapity)           │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```
- **Data Model & State**: Struktura `ServicePageMeta` traktuje pole `bulletPoints` w `articleSections` jako opcjonalne (`bulletPoints?: string[]`), co pozwala na bezpieczne usunięcie wypunktowań dla wybranej sekcji bez wpływu na pozostałe podstrony usługowe.
