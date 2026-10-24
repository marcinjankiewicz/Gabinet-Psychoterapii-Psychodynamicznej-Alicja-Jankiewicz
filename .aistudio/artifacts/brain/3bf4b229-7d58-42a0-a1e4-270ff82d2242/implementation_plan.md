# Aktualizacja Sekcji Kontaktu i Modułu Rezerwacji Online

Celem zmiany jest wyeliminowanie automatycznego uruchamiania zewnętrznego klienta poczty po kliknięciu adresu e-mail oraz uproszczenie modułu rezerwacji online w sekcji kontaktu tak, aby umożliwiał bezpośredni zapis wyłącznie na **Konsultację indywidualną**, z jasną informacją, że pozostałe formy pomocy ustalane są po rozmowie telefonicznej.

## User Review & Critical Decisions

> [!IMPORTANT]
> Poniższe założenia bezpośrednio realizują Twoje wytyczne dotyczące sekcji kontaktu:

- **Adres e-mail wyłącznie do skopiowania (bez `mailto:`)**: Kliknięcie w obszar adresu `psycholog.jankiewicz@gmail.com` lub przycisk obok niego skopiuje adres do schowka i wyświetli potwierdzenie („Skopiowano do schowka”), bez otwierania programu pocztowego na telefonie lub komputerze.
- **Rezerwacja online tylko na Konsultację indywidualną**: W module bezpośredniej rezerwacji Medfile w sekcji kontaktu usunięta zostanie lista rozwijana pozostałych usług. Widoczna będzie wyłącznie **Konsultacja indywidualna (50 min / 200 zł)** wraz z czytelną adnotacją, że pozostałe formy wsparcia są dostępne po wcześniejszej rozmowie telefonicznej.

## 1. Overview & Core Concept

- **Co zmienia aktualizacja**:
  1. Zamienia interaktywny link `mailto:` przy adresie e-mail na przycisk kopiujący adres do schowka (z zachowaniem mikrodanych `itemProp="email"` dla wyszukiwarki Google).
  2. Zastępuje wybór usług w karcie rezerwacji Medfile dedykowaną kartą **Konsultacji indywidualnej**, przekazującą identyfikator `'konsultacja'` bezpośrednio do okna `BookingModal`.
- **Grupa docelowa**: Pacjenci przeglądający stronę na smartfonach i komputerach, którzy chcą szybko skopiować adres e-mail lub zarezerwować pierwsze spotkanie konsultacyjne bez ryzyka opuszczenia strony.
- **Wartość dodana**: Pełna kontrola nad ścieżką pacjenta (pierwszy kontakt przez konsultację indywidualną lub rozmowę telefoniczną) oraz brak utraty konwersji przez niezamierzone uruchamianie aplikacji pocztowych.

## 2. User Experience & Visual Design

- **Przepływ użytkownika**:
  - **Kopiowanie adresu e-mail**: Kliknięcie w wiersz z adresem e-mail lub przycisk „Kopiuj adres” kopiuje `psycholog.jankiewicz@gmail.com` do schowka i zmienia etykietę na „Skopiowano adres!”.
  - **Bezpośrednia rezerwacja**: W prawej kolumnie sekcji kontaktu pacjent widzi kartę **Konsultacja indywidualna (50 min • 200 zł)**, informację *„Pozostałe formy wsparcia i terapii dostępne są po wcześniejszej rozmowie telefonicznej”* oraz przycisk **„Wybierz dogodny termin wizyty”**, który otwiera kalendarz Medfile dla konsultacji indywidualnej.
- **Spójność wizualna**: Zachowanie dotychczasowej palety barw gabinetu (`bg-brand-primary`, `bg-brand-secondary`, akcenty `brand-accent`) oraz typografii szeryfowej dla nagłówków.

## 3. Key Product Decisions & Trade-Offs

- **Decyzja 1: Usunięcie protokołu `mailto:` z elementu adresu e-mail**
  - *Wybrane podejście*: Zastąpienie znacznika `<a href="mailto:...">` interaktywnym przyciskiem kopiującym adres do schowka przy użyciu `navigator.clipboard.writeText`, z zachowaniem znacznika `<span itemProp="email">` dla pełnej zgodności z Schema.org.
  - *Dlaczego*: Chroni użytkowników mobilnych przed otwieraniem nieskonfigurowanych domyślnych klientów pocztowych.
- **Decyzja 2: Stałe przypisanie „Konsultacji indywidualnej” w module rezerwacji**
  - *Wybrane podejście*: Usunięcie elementu `<select>` z listą wszystkich usług i ustawienie stałej usługi `konsultacja` (`Konsultacja indywidualna`, 50 min, 200 zł) wraz z komunikatem o kontakcie telefonicznym dla pozostałych opcji.
  - *Dlaczego*: Zgodnie z procesem terapeutycznym każde leczenie poprzedzone jest konsultacją lub rozmową telefoniczną, co zapobiega błędnym zapisom w formularzu online.

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

```
┌───────────────────────────────────────────────────────────────────┐
│                         ContactSection                            │
├─────────────────────────────────┬─────────────────────────────────┤
│ Lewa kolumna (Dane kontaktowe)  │ Prawa kolumna (Rezerwacja/Mapa) │
│                                 │                                 │
│ • Telefon (tel:+48514309526)    │ • Karta dojazdu (Gdańsk Jasień) │
│ • E-mail (Tylko kopiowanie do   │ • Moduł Medfile:                │
│   schowka, brak linku mailto:)  │   - Stała opcja: Konsultacja    │
│ • Adres (ul. Kartuska 356a)     │     indywidualna (50 min/200zł) │
│                                 │   - Info: Inne opcje dostępne   │
│                                 │     po rozmowie telefonicznej   │
│                                 │   - CTA -> onOpenBooking(       │
│                                 │            'konsultacja')       │
└─────────────────────────────────┴────────────────┬────────────────┘
                                                   │
                                                   ▼
                                     ┌───────────────────────────┐
                                     │       BookingModal        │
                                     │ (Kalendarz Medfile Online)│
                                     └───────────────────────────┘
```
