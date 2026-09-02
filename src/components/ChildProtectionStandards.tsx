import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Heart, 
  Phone, 
  FileText, 
  ArrowLeft, 
  Lock, 
  ChevronDown, 
  Sparkles,
  Award,
  BookMarked
} from 'lucide-react';

interface ChildProtectionStandardsProps {
  onBackToHome: () => void;
}

export default function ChildProtectionStandards({ onBackToHome }: ChildProtectionStandardsProps) {
  const [activeTab, setActiveTab] = useState<'child-friendly' | 'full-standards'>('child-friendly');
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const toggleChapter = (num: number) => {
    setExpandedChapter(expandedChapter === num ? null : num);
  };

  const chapters = [
    {
      num: 1,
      title: "Preambuła",
      content: (
        <div className="space-y-4 text-justify">
          <p>
            Standardy Ochrony Dzieci przed krzywdzeniem służą określeniu i realizacji procedur związanych z ochroną małoletnich, z uwzględnieniem działań właściciela jednoosobowej działalności gospodarczej (zwanego: <strong>Prywatna Praktyka Psychologiczna Alicja Jankiewicz</strong>), realizującego względem dziecka i/lub opiekunów prawnych ustalone aktywności o charakterze psychoterapeutycznym, psychoedukacyjnym, socjoterapeutycznym, psychologicznym, pedagogicznym i/lub inne określone w aktywnościach realizowanych poprzez prowadzenie jednoosobowej działalności gospodarczej.
          </p>
          <p>
            Standardy uwzględniają zrozumienie ich zapisu przez osoby małoletnie oraz ich opiekunów prawnych. Zasadą wszystkich działań podejmowanych przez psychoterapeutę jest działanie dla dobra dziecka i w jego najlepszym interesie. Psychoterapeuta traktuje dziecko z szacunkiem oraz uwzględnia jego potrzeby.
          </p>
          <p className="border-l-2 border-brand-primary pl-4 py-1 bg-brand-primary/5 text-brand-charcoal">
            Niedopuszczalne jest stosowanie wobec dziecka przemocy w jakiejkolwiek formie. Psychoterapeuta działa w ramach obowiązującego prawa, przepisów wewnętrznych jednoosobowej działalności gospodarczej, niniejszych Standardów Ochrony Dzieci przez krzywdzeniem, przepisów dotyczących RODO oraz swoich kompetencji.
          </p>
        </div>
      )
    },
    {
      num: 2,
      title: "Podstawy prawne",
      content: (
        <div className="space-y-4">
          <p className="font-medium text-brand-charcoal">1. Standardy realizowane są w oparciu o obowiązujące powszechnie przepisy, w tym m.in.:</p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-brand-muted">
            <li>Ustawa z dnia 13 maja 2016 r. o przeciwdziałaniu zagrożeniu przestępczości na tle seksualnym i ochronie małoletnich (Dz.U.2024.560)</li>
            <li>Konwencja o prawach dziecka przyjęta przez Zgromadzenie Ogólne Narodów Zjednoczonych dnia 20 listopada 1989 r. (Dz. U. z 1991r. Nr 120, poz. 526 z późn. zm.)</li>
            <li>Konstytucja Rzeczypospolitej Polskiej z dnia 2 kwietnia 1997 r. (Dz. U. Nr 78, poz. 483 z późn. zm.)</li>
            <li>Ustawa z dnia 25 lutego 1964 r. Kodeks rodzinny i opiekuńczy (t.j. Dz. U. z 2020 r. poz. 1359)</li>
            <li>Ustawa z dnia 28 lipca 2023 r. o zmianie ustawy - Kodeks rodzinny i opiekuńczy oraz niektórych innych ustaw (Dz. U. poz. 1606).</li>
            <li>Ustawa z dnia 29 lipca 2005 r. o przeciwdziałaniu przemocy domowej (t.j. Dz. U. z 2021 r. poz. 1249).</li>
            <li>Ustawa z dnia 6 czerwca 1997 r. Kodeks karny (t.j. Dz. U. z 2022 r. poz. 1138 z późn. zm.).</li>
            <li>Ustawa z dnia 6 czerwca 1997 r. Kodeks postępowania karnego (t.j. Dz. U. z 2022 r. poz. 1375 z późn. zm.).</li>
            <li>Ustawa z dnia 23 kwietnia 1964 r. Kodeks cywilny (t.j. Dz. U. z 2022 r. poz. 1360 z późn. zm.) - art. 23 i 24.</li>
            <li>Ustawa z dnia 17 listopada 1964 r. Kodeks postępowania cywilnego (t.j. Dz. U. z 2023 r. poz. 1550 z późn. zm.).</li>
          </ul>
          <p className="font-medium text-brand-charcoal pt-2">2. Czyny zabronione definiujące wykorzystywanie seksualne:</p>
          <p className="text-sm text-brand-muted leading-relaxed">
            Art. 197 kodeksu karnego (dalej: kk) – zgwałcenie, 198 kk – wykorzystanie seksualne dziecka na skutek jego bezradności i/lub niepoczytalności, 199 kk – nadużycie stosunku zależności dziecka od innej osoby lub wykorzystanie krytycznego położenia dziecka w celach seksualnych, 200 kk – kontakt seksualny z dzieckiem poniżej 15. roku życia, 200a kk – grooming – nawiązywanie z dzieckiem do 15. roku życia kontaktu przy użyciu nowych technologii w celu spotkania i nakłonienia dziecka do obcowania płciowego lub w celu produkowania bądź utrwalania treści o charakterze pornograficznym za pomocą groźby, wprowadzenia dziecka w błąd, wyzyskania błędu albo wykorzystania jego niezdolności do należytego pojmowania sytuacji, 202 § 3–5 kk – pornografia z udziałem dzieci.
          </p>
        </div>
      )
    },
    {
      num: 3,
      title: "Definicje",
      content: (
        <div className="space-y-3 text-sm text-brand-muted">
          <p><strong>1. Małoletni/dziecko</strong> – każda osoba do ukończenia 18. roku życia.</p>
          <p><strong>2. Psychoterapeuta</strong> – osoba będąca właścicielem jednoosobowej działalności gospodarczej, posiadająca kwalifikacje do pracy z dziećmi i młodzieżą, prowadząca psychoterapię, psychoedukację, socjoterapię, poradnictwo, terapia psychologiczną i pedagogiczną.</p>
          <p><strong>3. Standardy</strong> – niniejsze Standardy Ochrony Dzieci przed krzywdzeniem.</p>
          <p><strong>4. Siedziba</strong> – miejsce prowadzenia przez psychoterapeutę wszelkich aktywności z dziećmi (Gdańsk, ul. Kartuska 356a).</p>
          <p><strong>5. Personel/pracownik/współpracownik</strong> – osoba zatrudniona lub współpracująca z psychoterapeutą w ramach jego działalności.</p>
          <p><strong>6. Krzywdzenie dziecka</strong> – popełnienie czynu zabronionego na szkodę dziecka przez jakąkolwiek osobę lub zagrożenie dobra dziecka, w tym jego zaniedbywanie.</p>
          <p><strong>7. Przemoc domowa</strong> – umyślne działanie lub zaniechanie naruszające prawa lub dobra osobiste osób najbliższych lub wspólnie zamieszkujących.</p>
          <p><strong>8. Przemoc fizyczna</strong> – wszelkie postępowanie wobec dziecka, które może prowadzić do uszczerbku na jego zdrowiu fizycznym.</p>
          <p><strong>9. Przemoc seksualna</strong> – każde zachowanie o charakterze seksualnym skierowane wobec dziecka.</p>
          <p><strong>10. Przemoc psychiczna</strong> – działania negatywnie wpływające na stan emocjonalny (np. poniżanie, straszenie, odrzucanie).</p>
          <p><strong>11. Zaniedbanie</strong> – brak zapewnienia podstawowych potrzeb życiowych (opieka medyczna, edukacja, pożywienie, schronienie).</p>
          <p><strong>12. Opiekun dziecka</strong> – rodzic lub opiekun prawny uprawniony do reprezentacji dziecka.</p>
          <p><strong>13. Dane osobowe dziecka</strong> – wszelkie informacje umożliwiające identyfikację dziecka.</p>
        </div>
      )
    },
    {
      num: 4,
      title: "Rozpoznawanie i reagowanie na czynniki ryzyka krzywdzenia dzieci",
      content: (
        <div className="space-y-3">
          <p>1. Psychoterapeuta posiada wiedzę i zwraca uwagę na czynniki ryzyka i symptomy krzywdzenia dzieci. W przypadku ich zidentyfikowania, podejmuje rozmowę z opiekunem dziecka, przekazuje informacje o ofercie wsparcia i pomaga w motywowaniu do szukania pomocy.</p>
          <p>2. Psychoterapeuta stale monitoruje sytuację i dobrostan psychofizyczny dziecka.</p>
          <p>3. W przypadku powzięcia podejrzenia krzywdzenia, psychoterapeuta sporządza notatkę (Załącznik nr 1) i podejmuje adekwatną interwencję. Prowadzony jest rejestr notatek.</p>
          <p>4. Ewentualna rekrutacja personelu u psychoterapeuty opiera się o zasady bezpiecznej rekrutacji (Załącznik nr 2).</p>
          <p>5. Jeśli sytuacja tego wymaga, psychoterapeuta podejmuje bezpośrednią, bezpieczną rozmowę z dzieckiem o jego doświadczeniach i podejmuje adekwatne działania społeczne i prawne (np. wdrożenie procedury „Niebieska Karta”).</p>
          <p>6. Obowiązuje ścisła zasada zachowania poufności w sprawach krzywdzenia dziecka, poza koniecznym i prawnym informowaniem powołanych organów państwowych.</p>
        </div>
      )
    },
    {
      num: 5,
      title: "Krzywdzenie dziecka przez osobę dorosłą",
      content: (
        <div className="space-y-3">
          <p>1. Przy zgłoszeniu krzywdzenia dziecka przez osobę dorosłą psychoterapeuta nawiązuje kontakt z opiekunem prawnym, rozmawia z dzieckiem oraz gromadzi dokumentację (notatka służbowa, Karta Interwencji - Załącznik nr 3).</p>
          <p>2. W razie podejrzeń popełnienia przestępstwa, psychoterapeuta przygotowuje i niezwłocznie przekazuje oficjalne zawiadomienie do Policji lub Prokuratury.</p>
          <p>3. Gdy opiekunowie ignorują zgłaszane przez dziecko krzywdy, psychoterapeuta kieruje do właściwego Sądu Rodzinnego i Nieletnich wniosek o wgląd w sytuację rodziny.</p>
          <p>4. W przypadku zaobserwowania przemocy lub zaniedbania ze strony rodziców/opiekunów, psychoterapeuta powiadamia właściwy Ośrodek Pomocy Społecznej i zgłasza potrzebę wszczęcia procedury „Niebieskiej Karty”.</p>
          <p className="font-semibold text-brand-primary border-l-2 border-brand-primary pl-4 py-2 bg-brand-primary/5">
            5. W sytuacji bezpośredniego zagrożenia życia lub zdrowia dziecka, psychoterapeuta niezwłocznie alarmuje służby ratunkowe pod numerem alarmowym 112 lub 999 celem ochrony życia i zdrowia małoletniego.
          </p>
        </div>
      )
    },
    {
      num: 6,
      title: "Zasady ochrony prywatności i wizerunku dziecka",
      content: (
        <div className="space-y-3">
          <p>1. Psychoterapeuta gwarantuje przestrzeganie najwyższych standardsów ochrony danych osobowych małoletnich zgodnie z przepisami prawa (RODO).</p>
          <p>2. Zabezpiecza się wizerunek i tożsamość dzieci ze szczególną dbałością o ich prawo do intymności i prywatności.</p>
          <p>3. Każda forma rejestracji audio/wideo sesji na cele superwizyjne wymaga bezwzględnej pisemnej zgody opiekuna prawnego dziecka (Załącznik nr 4).</p>
          <p>4. Standardem i dobrym zwyczajem jest również uzyskanie dobrowolnej zgody od samego dziecka (wyrażonej chociażby ustnie).</p>
          <p>5. Wyrażenie zgody na rejestrację jest w pełni dobrowolne i może być cofnięte w każdym momencie bez konsekwencji.</p>
          <p>6. Wszystkie nagrania są traktowane jako ściśle poufne i nigdy nie są udostępniane publicznie ani osobom nieuprawnionym.</p>
        </div>
      )
    },
    {
      num: 7,
      title: "Dostępność informacji o przeciwdziałaniu przemocy wobec dzieci",
      content: (
        <div className="space-y-3">
          <p>1. Wiidocznym i ogólnodostępnym miejscu w gabinecie wywieszona jest transparentna karta zawierająca numery telefonów alarmowych, zaufania oraz dane lokalnych placówek oferujących wsparcie dzieciom i rodzinom w kryzysie.</p>
          <p>2. Karta z telefonami stanowi Załącznik nr 5 do niniejszych Standardów.</p>
        </div>
      )
    },
    {
      num: 8,
      title: "Zasady bezpiecznych relacji pomiędzy psychoterapeutą a dzieckiem",
      content: (
        <div className="space-y-3 text-sm">
          <p>• Kierowanie się wyłącznie dobrem dziecka, z empatią i poszanowaniem jego wieku i możliwości poznawczych.</p>
          <p>• Uszanowanie prawa do intymności. Każdy ewentualny kontakt fizyczny (np. powstrzymanie przed agresją) musi być uzasadniony bezpieczeństwem i omówiony.</p>
          <p>• Bezwzględny i absolutny zakaz jakichkolwiek relacji o charakterze romantycznym lub seksualnym.</p>
          <p>• Ścisła współpraca z opiekunami prawnymi dziecka.</p>
          <p>• Zakaz wchodzenia w poboczne i nieprofesjonalne zależności finansowe, osobiste czy towarzyskie z dzieckiem i jego rodziną.</p>
          <p>• Informowanie dziecka o celach i metodach terapii w sposób dla niego zrozumiały.</p>
          <p>• <strong>Bezwzględnie zakazane jest:</strong> upokarzanie, lekceważenie, wyśmiewanie, stosowanie przemocy werbalnej czy fizycznej, przyjmowanie kosztownych prezentów.</p>
          <p>• Przestrzeganie tajemnicy zawodowej (poufności), chyba że zachodzi bezpośrednie zagrożenie życia i zdrowia.</p>
          <p>• Zakaz proponowania jakichkolwiek substancji psychoaktywnych i natychmiastowe reagowanie edukacyjne.</p>
        </div>
      )
    },
    {
      num: 9,
      title: "Ochrona przed cyberprzemocą",
      content: (
        <div className="space-y-3">
          <p>1. W przypadku uzyskania informacji o cyberprzemocy wobec dziecka, psychoterapeuta podejmuje działania pomocowo-interwencyjne adekwatne do powagi sytuacji.</p>
          <p>2. W razie posiadania informacji o dostępie małoletniego do treści szkodliwych lub nieodpowiednich dla wieku, psychoterapeuta:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-brand-muted">
            <li>Rozmawia z małoletnim i edukuje ga w zakresie bezpiecznych zachowań sieciowych;</li>
            <li>Wskazuje opiekunom prawnym potrzebę odpowiedniego monitorowania aktywności cyfrowej dziecka.</li>
          </ul>
        </div>
      )
    },
    {
      num: 10,
      title: "Zasady zatrudniania i ochrony dzieci w działalności",
      content: (
        <div className="space-y-3">
          <p>1. Każda zatrudniona osoba składająca deklarację o pracy z dziećmi (Załącznik nr 9) jest weryfikowana pod kątem niekaralności w Rejestrze Sprawców Przestępstw na Tle Seksualnym.</p>
          <p>2. Pracownicy są zobligowani do wdrożenia standardów ochrony i sporządzania pisemnych notatek służbowych o każdym incydencie.</p>
          <p>3. Psychoterapeuta monitoruje przestrzeganie rygoru ochronnego przez personel.</p>
        </div>
      )
    },
    {
      num: 11,
      title: "Monitoring i ocena standardów",
      content: (
        <div className="space-y-3">
          <p>1. Psychoterapeuta wyznacza siebie jako osobę osobiście odpowiedzialną za Standardy Ochrony Dzieci przed krzywdzeniem.</p>
          <p>2. Standardy są cyklicznie przeglądane, a ich skuteczność is oceniana poprzez ankiety i raporty monitoringu (Załączniki nr 6 i 7).</p>
        </div>
      )
    },
    {
      num: 12,
      title: "Postanowienia końcowe i wykaz załączników",
      content: (
        <div className="space-y-3">
          <p>1. Standardy wchodzą w życie z dniem ogłoszenia.</p>
          <p>2. Treść udostępnia się na stronie <strong>gabinetpsychologagdansk.pl</strong> oraz wywiesza w widocznym miejscu w siedzibie.</p>
          <p>3. Uproszczona, przyjazna wersja dla dzieci wywieszona jest w poczekalni i umieszczona online (Załącznik nr 8).</p>
          <p className="font-medium mt-4">Niezbędny wykaz załączników (będących integralną częścią dokumentu):</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-brand-muted list-decimal pl-5">
            <li>Załącznik nr 1 – Notatka służbowa z incydentu</li>
            <li>Załącznik nr 2 – Zasady bezpiecznej rekrutacji personelu</li>
            <li>Załącznik nr 3 – Karta interwencji</li>
            <li>Załącznik nr 4 – Pisemna zgoda na wykorzystanie wizerunku (superwizja)</li>
            <li>Załącznik nr 5 – Karta instytucji i telefonów kontaktowych</li>
            <li>Załącznik nr 6 – Ankieta monitoringu realizacji standardów</li>
            <li>Załącznik nr 7 – Raport ewaluacyjny monitoringu</li>
            <li>Załącznik nr 8 – Standardy dla małoletnich (wersja obrazkowo-uproszczona)</li>
            <li>Załącznik nr 9 – Oświadczenie o zapoznaniu się ze Standardami</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="bg-brand-bg min-h-screen py-8 sm:py-16">
      <div className="max-w-[1000px] mx-auto px-6">
        
        {/* Navigation back and header banner */}
        <div className="mb-8 flex items-center justify-between">
          <button 
            onClick={onBackToHome}
            className="flex items-center gap-2 group text-brand-muted hover:text-brand-primary font-medium text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Wróć do strony głównej
          </button>
          
          <div className="hidden sm:flex items-center gap-1 text-xs text-brand-muted font-mono bg-brand-card/45 px-3 py-1.5 rounded-full border border-brand-card/50">
            <ShieldCheck size={14} className="text-brand-secondary" />
            Standardy Ochrony Małoletnich
          </div>
        </div>

        {/* Title Block */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-brand-primary mb-4 leading-tight">
            Standardy Ochrony Dzieci przed Krzywdzeniem
          </h1>
          <p className="text-brand-muted max-w-2xl mx-auto font-sans font-light text-sm sm:text-base leading-relaxed">
            Zapewnienie bezpieczeństwa małoletnim jest fundamentalnym zadaniem mojego gabinetu. Poniżej znajdują się pełna treść procedur oraz wersja przygotowana specjalnie dla dzieci i młodzieży.
          </p>
          
          {/* Quick Business Details Card */}
          <div className="mt-6 inline-flex flex-col sm:flex-row gap-2 sm:gap-6 text-xs text-brand-muted bg-brand-card/30 border border-brand-card/75 px-5 py-3 rounded-xl">
            <div><strong className="text-brand-primary">Praktyka:</strong> Alicja Jankiewicz</div>
            <div className="hidden sm:block text-brand-muted/40">|</div>
            <div><strong className="text-brand-primary">NIP:</strong> 5110268551</div>
            <div className="hidden sm:block text-brand-muted/40">|</div>
            <div><strong className="text-brand-primary">Adres:</strong> ul. Kartuska 356a, Gdańsk</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-brand-card/85 mb-8">
          <button
            onClick={() => setActiveTab('child-friendly')}
            className={`flex-1 py-4 text-center font-medium text-sm flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'child-friendly' 
                ? 'border-brand-secondary text-brand-secondary' 
                : 'border-transparent text-brand-muted hover:text-brand-primary'
            }`}
          >
            <Heart size={16} />
            Dla Dzieci i Młodzieży <span className="hidden md:inline">(Wersja Przyjazna)</span>
          </button>
          <button
            onClick={() => setActiveTab('full-standards')}
            className={`flex-1 py-4 text-center font-medium text-sm flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'full-standards' 
                ? 'border-brand-primary text-brand-primary' 
                : 'border-transparent text-brand-muted hover:text-brand-primary'
            }`}
          >
            <FileText size={16} />
            Pełna Dokumentacja <span className="hidden md:inline">(Wersja Oficjalna)</span>
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-brand-card rounded-2xl p-6 sm:p-10 border border-brand-card/55 shadow-xs">
          
          {/* TAB 1: CHILD-FRIENDLY VERSION */}
          {/* ZMIANA: Przełączanie klasą hidden zamiast wycinania z drzewa DOM */}
          <div className={`${activeTab === 'child-friendly' ? 'block' : 'hidden'} space-y-8`}>
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-6 text-emerald-950 flex flex-col md:flex-row gap-5 items-start">
              <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-700 shrink-0">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-emerald-900 mb-1.5">
                  Witaj w Prywatnej Praktyce Psychologicznej Alicja Jankiewicz!
                </h3>
                <p className="text-sm text-emerald-800 leading-relaxed font-sans font-light">
                  Bardzo się cieszymy, że jesteś z nami. Twoje bezpieczeństwo i dobre samopoczucie są dla nas najważniejsze. Zależy nam, abyś poczuł się u nas swobodnie i pewnie, wiedząc, że troszczymy się o Twoje dobro.
                </p>
              </div>
            </div>

            {/* Colorful grids of simplified rules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-left">
              
              <div className="bg-brand-bg/60 border border-brand-card/85 rounded-xl p-5 flex gap-4">
                <div className="bg-brand-primary/10 text-brand-primary p-2.5 rounded-lg shrink-0 h-10 w-10 flex items-center justify-center font-semibold font-serif">
                  1
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-brand-primary mb-1">Jesteś dla nas ważny!</h4>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans font-light">
                    Możesz tu spotkać psychoterapeutę, który jest po to, aby Ci pomagać, wspierać Cię i sprawić, byś czuł się bezpiecznie. Jeśli coś Cię niepokoi, smuci lub jeśli ktoś Cię źle traktuje, chcemy o tym wiedzieć.
                  </p>
                </div>
              </div>

              <div className="bg-brand-bg/60 border border-brand-card/85 rounded-xl p-5 flex gap-4">
                <div className="bg-brand-secondary/10 text-brand-secondary p-2.5 rounded-lg shrink-0 h-10 w-10 flex items-center justify-center font-semibold font-serif">
                  2
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-brand-secondary mb-1">Bezpieczne miejsce</h4>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans font-light">
                    Stworzyliśmy jasne zasady, które pomagają nam wszystkim czuć się dobrze. Szanujemy siebie nawzajem, słuchamy, rozmawiamy i wspólnie wyjaśniamy trudności. Twoje uczucia są u nas w pełni ważne.
                  </p>
                </div>
              </div>

              <div className="bg-brand-bg/60 border border-brand-card/85 rounded-xl p-5 flex gap-4">
                <div className="bg-brand-accent/10 text-brand-accent p-2.5 rounded-lg shrink-0 h-10 w-10 flex items-center justify-center font-semibold font-serif">
                  3
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-brand-accent mb-1">Twoje prawa</h4>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans font-light">
                    Masz pełne prawo do szczęścia, bezpieczeństwa, szacunku i ochrony. Jeśli coś sprawia, że czujesz się niekomfortowo lub czujesz, że Twoje granice są przekraczane – powiedz nam o tym. Masz absolutne prawo być wysłuchanym.
                  </p>
                </div>
              </div>

              <div className="bg-red-50 text-red-700 p-2.5 rounded-lg shrink-0 h-10 w-10 flex items-center justify-center font-semibold font-serif border border-red-100 animate-pulse">
                4
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-red-950 mb-1">Brak tolerancji dla przemocy</h4>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans font-light">
                  Nietolerujemy przemocy w żadnej formie. Jeśli doświadczysz krzywdy, powiedz o tym psychoterapeucie lub zaufanej osobie dorosłej w gabinecie. Reagujemy natychmiast!
                </p>
              </div>

              <div className="bg-brand-bg/60 border border-brand-card/85 rounded-xl p-5 flex gap-4 md:col-span-2">
                <div className="bg-brand-primary/10 text-brand-primary p-2.5 rounded-lg shrink-0 h-10 w-10 flex items-center justify-center">
                  <Lock size={18} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-brand-primary mb-1">Prawo do pełnej prywatności</h4>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans font-light">
                    Twoje dane osobowe oraz wszystko, o czym rozmawiasz z psychoterapeutą, są bezpieczne i chronione poufnością. Informacje o Tobie są chronione i nikt postronny nie ma do nich dostępu. Wyjątek to sytuacja, w której zagrożone byłoby Twoje zdrowie lub życie.
                  </p>
                </div>
              </div>
            </div>

            {/* Highlighted Rescue Lines / Contact card */}
            <div className="border border-brand-card/90 bg-brand-bg rounded-xl p-6 sm:p-8 mt-8 text-left">
              <div className="flex items-center gap-2 text-brand-primary mb-4">
                <Phone size={20} className="stroke-[2.5]" />
                <h4 className="font-serif font-bold text-lg">Ważne telefony zaufania i ratunkowe</h4>
              </div>
              
              <p className="text-sm text-brand-muted font-sans font-light mb-6">
                Jeśli potrzebujesz natychmiastowego kontaktu z kimś życzliwym lub pomocy w nagłej sytuacji, te numery są bezpłatne i działają zawsze:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-brand-card/55 flex items-center gap-4 shadow-2xs">
                  <div className="bg-red-500 text-white font-mono font-bold text-lg h-12 w-12 rounded-full flex items-center justify-center shrink-0">
                    112
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-charcoal text-sm">Pogotowie Ratunkowe</h5>
                    <p className="text-xs text-brand-muted leading-snug">
                      Sytuacje nagłego zagrożenia zdrowia, życia lub bezpieczeństwa.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-brand-card/55 flex items-center gap-4 shadow-2xs">
                  <div className="bg-brand-secondary text-white font-mono font-bold text-sm h-12 w-12 rounded-full flex flex-col items-center justify-center shrink-0 leading-none">
                    <span>116</span>
                    <span className="text-[10px]">111</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-charcoal text-sm">Telefon Zaufania</h5>
                    <p className="text-xs text-brand-muted leading-snug">
                      Dla dzieci i młodzieży. Możesz porozmawiać o wszystkim anonimowo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TAB 2: OFFICIAL / ADVANCED CHAPTERS */}
          {/* ZMIANA: Przełączanie klasą hidden zamiast wycinania z drzewa DOM */}
          <div className={`${activeTab === 'full-standards' ? 'block' : 'hidden'} space-y-6 text-left`}>
            <div className="border bg-brand-bg rounded-xl px-5 py-4 border-brand-card flex items-center justify-between">
              <div className="flex items-center gap-2 text-brand-primary">
                <BookMarked size={18} />
                <span className="font-serif font-bold text-sm">Spis Rozdziałów Standardów</span>
              </div>
              <span className="text-xs text-brand-muted font-mono">12 Rozdziałów</span>
            </div>

            {/* Accordion Layout */}
            <div className="space-y-4">
              {chapters.map((chapter) => {
                const isExpanded = expandedChapter === chapter.num;
                return (
                  <div 
                    key={chapter.num}
                    className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                      isExpanded 
                        ? 'border-brand-primary/60 bg-white shadow-xs' 
                        : 'border-brand-card/85 bg-white/50 hover:bg-white'
                    }`}
                  >
                    {/* OPTYMALIZACJA Accessibility: Dodano atrybuty aria-expanded i aria-controls dla pełnej dostępności cyfrowej */}
                    <button
                      onClick={() => toggleChapter(chapter.num)}
                      aria-expanded={isExpanded}
                      aria-controls={`chapter-content-${chapter.num}`}
                      className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-hidden cursor-pointer"
                    >
                      <div className="flex items-start gap-3.5">
                        <span className={`font-serif font-bold text-sm px-2.5 py-1 rounded-md transition-colors ${
                          isExpanded 
                            ? 'bg-brand-primary text-white' 
                            : 'bg-brand-card/65 text-brand-primary'
                        }`}>
                          R.{chapter.num}
                        </span>
                        {/* OPTYMALIZACJA SEO: Tytuł rozdziału w akordeonie oznaczony semantycznie jako H3 */}
                        <h3 className="font-serif font-bold text-base text-brand-primary inline-block leading-snug">
                          {chapter.title}
                        </h3>
                      </div>
                      <ChevronDown 
                        size={18} 
                        className={`text-brand-muted transition-transform duration-300 shrink-0 ml-2 ${
                          isExpanded ? 'rotate-180 text-brand-primary' : ''
                        }`} 
                      />
                    </button>

                    {/* ZMIANA: Ukrywanie zawartości rozdziałów klasą hidden zamiast &&, aby Googlebot zaindeksował całe 12 rozdziałów na raz */}
                    <div 
                      id={`chapter-content-${chapter.num}`}
                      className={`${isExpanded ? 'block' : 'hidden'} px-5 pb-5 pt-1 border-t border-brand-card/45 text-brand-muted font-sans font-light text-sm leading-relaxed`}
                    >
                      {chapter.content}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-brand-bg border border-brand-card rounded-xl p-5 text-xs text-brand-muted font-light leading-relaxed">
              Powyższe standardy stanowią wiążący zbiór reguł w działalności <strong>Prywatna Praktyka Psychologiczna Alicja Jankiewicz</strong> z siedzibą w Gdańsku przy ul. Kartuskiej 356a i są w pełni realizowane przez Osobę Odpowiedzialną (właściciela firmy).
            </div>
          </div>

        </div>

        {/* Dynamic bottom banner */}
        <div className="mt-12 bg-linear-to-b from-brand-card to-brand-card/25 rounded-2xl p-6 sm:p-8 text-center border border-brand-card/65">
          <Award className="mx-auto text-brand-secondary mb-3 stroke-[1.5]" size={36} />
          <h4 className="font-serif font-bold text-brand-primary text-lg mb-2">Dbamy o bezpieczną przyszłość dzieci</h4>
          <p className="text-brand-muted max-w-xl mx-auto font-sans font-light text-xs sm:text-sm leading-relaxed mb-6">
            Zgodnie z polskim prawem (tzw. Ustawą Kamilka), dbam o to, by każda przestrzeń terapeutyczna i kontakt z terapeutą były miejscem bezpiecznym. Zapraszam również rodziców do kontaktu w razie jakichkolwiek pytań.
          </p>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 bg-brand-primary text-white font-serif px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-primary/95 transition-all shadow-soft-lift cursor-pointer"
          >
            Powrót do strony głównej
          </button>
        </div>

      </div>
    </div>
  );
}
