export interface SharedFAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Ogólne' | 'Nurt psychodynamiczny' | 'Poufność i zasady' | 'Dzieci i grupa';
  iconKey: 'help' | 'sparkles' | 'heart' | 'lock' | 'clock' | 'mappin' | 'shield' | 'users';
}

/**
 * Wspólne źródło prawdy dla sekcji FAQ na stronie głównej.
 * Pytania i odpowiedzi są w 100% identyczne z blokiem JSON-LD @type: "FAQPage" w index.html.
 */
export const SHARED_FAQ_ITEMS: SharedFAQItem[] = [
  {
    id: 'pierwsza-konsultacja',
    question: 'Jak wygląda pierwsza konsultacja u psychoterapeuty i czy trzeba się przygotować?',
    answer:
      'Pierwsza konsultacja psychologiczna trwa 50 minut i nie wymaga żadnego specjalnego przygotowania. Nie trzeba układać planu wypowiedzi ani wiedzieć z góry, od czego zacząć — terapeuta pomaga w rozmowie poprzez uważne, wspierające pytania. Zazwyczaj pierwsze 3–5 spotkań ma charakter konsultacji wstępnych, które służą zrozumieniu Twojej sytuacji, zebraniu wywiadu oraz wspólnemu ustaleniu celów i najodpowiedniejszej formy pomocy. Konsultacje nie zobowiązują do natychmiastowego rozpoczęcia długoterminowej terapii.',
    category: 'Ogólne',
    iconKey: 'help',
  },
  {
    id: 'psycholog-vs-psychoterapeuta',
    question: 'Czym różni się psycholog od psychoterapeuty i na czym polega nurt psychodynamiczny?',
    answer:
      'Psycholog to absolwent jednolitych studiów magisterskich z psychologii, uprawniony do diagnozy, konsultacji i wsparcia psychologicznego. Psychoterapeuta to specjalista, który dodatkowo ukończył wieloletnie podyplomowe szkolenie psychoterapeutyczne i prowadzi regularne leczenie psychoterapeutyczne pod stałą superwizją. Nurt psychodynamiczny zakłada, że na nasze obecne emocje, objawy i relacje wpływają nieświadome mechanizmy oraz wcześniejsze doświadczenia. Praca w bezpiecznej relacji terapeutycznej pozwala je zrozumieć i prowadzi do trwałej, głębokiej zmiany funkcjonowania.',
    category: 'Nurt psychodynamiczny',
    iconKey: 'sparkles',
  },
  {
    id: 'problemy-gdansk-jasien',
    question: 'Z jakimi problemami można zgłosić się do gabinetu w Gdańsku Jasieniu?',
    answer:
      'Do gabinetu przy ul. Kartuskiej 356a w Gdańsku zgłaszają się osoby dorosłe, młodzież oraz rodzice z dziećmi doświadczający m.in. przewlekłego lęku i napadów paniki, obniżonego nastroju i depresji, wypalenia zawodowego, silnego stresu, trudności w relacjach i stawianiu granic, niskiego poczucia własnej wartości, objawów psychosomatycznych oraz kryzysów życiowych (takich jak rozstanie, żałoba czy nagła zmiana sytuacji życiowej). Pomoc obejmuje konsultacje psychologiczne, psychoterapię indywidualną, wsparcie w kryzysie oraz psychoterapię grupową.',
    category: 'Ogólne',
    iconKey: 'heart',
  },
  {
    id: 'tajemnica-zawodowa',
    question: 'Czy obowiązuje tajemnica zawodowa i jak dbacie o dyskrecję?',
    answer:
      'Tak. Jako psycholog i psychoterapeuta pracujący zgodnie z Kodeksem Etycznym Psychoterapeuty PTPPd jestem bezwzględnie zobowiązana do zachowania tajemnicy zawodowej. Poufnością objęte są zarówno wszystkie treści poruszane podczas sesji, jak i sam fakt korzystania z pomocy gabinetu. Jedynym ustawowym wyjątkiem jest sytuacja bezpośredniego zagrożenia życia lub zdrowia pacjenta bądź innych osób. Spotkania odbywają się w kameralnym, spokojnym gabinecie zapewniającym pełen komfort i prywatność.',
    category: 'Poufność i zasady',
    iconKey: 'lock',
  },
  {
    id: 'koszt-i-regularnosc',
    question: 'Ile kosztuje wizyta i jak wygląda regularność spotkań?',
    answer:
      'Konsultacja indywidualna, sesja psychoterapii indywidualnej oraz spotkanie wsparcia w kryzysie trwają 50 minut i kosztują 200 zł. W przypadku psychoterapii grupowej wymiar czasowy i koszt ustalane są indywidualnie. Sesje psychoterapii indywidualnej odbywają się regularnie, zazwyczaj raz lub dwa razy w tygodniu o stałej, wspólnie ustalonej porze — przewidywalny rytm spotkań tworzy bezpieczne ramy sprzyjające ciągłości procesu terapeutycznego.',
    category: 'Poufność i zasady',
    iconKey: 'clock',
  },
  {
    id: 'lokalizacja-i-dojazd',
    question: 'Gdzie dokładnie mieści się gabinet i jak dojechać (ul. Kartuska 356a, Gdańsk Jasień)?',
    answer:
      'Gabinet mieści się przy ul. Kartuskiej 356a (pierwsze piętro), 80-125 Gdańsk, w dzielnicy Gdańsk Jasień. Lokalizacja zapewnia wygodny dojazd z dzielnic Jasień, Morena, Piecki-Migowo, Ujeścisko, Wrzeszcz, Oliwa i Karczemki, a także szybki dostęp z obwodnicy Trójmiasta (S6) dla osób z Sopotu i Gdyni. Bezpośrednio przed budynkiem dostępne są bezpłatne miejsca parkingowe. Komunikacją miejską można dotrzeć tramwajem (przystanek Zabornia) lub autobusem (przystanek Damroki). Gabinet przyjmuje od poniedziałku do piątku w godzinach 08:00–20:00.',
    category: 'Ogólne',
    iconKey: 'mappin',
  },
  {
    id: 'psychoterapia-dzieci-i-mlodziezy',
    question: 'Jak wygląda psychoterapia dziecięca oraz praca z młodzieżą?',
    answer:
      'Psychoterapia dzieci i młodzieży jest zawsze dostosowana do wieku i etapu rozwojowego młodego człowieka. W przypadku młodszych dzieci pierwsza konsultacja odbywa się zazwyczaj z samymi rodzicami, a w pracy z dzieckiem ważnym narzędziem obok rozmowy jest swobodna zabawa i regularne spotkania konsultacyjne z opiekunami. Praca z nastolatkami opiera się na budowaniu zaufania, wsparciu w kryzysach tożsamościowych, szkolnych i rówieśniczych z poszanowaniem prywatności młodej osoby. Gabinet działa w pełnej zgodności ze Standardami Ochrony Małoletnich (SOM).',
    category: 'Dzieci i grupa',
    iconKey: 'shield',
  },
  {
    id: 'psychoterapia-grupowa',
    question: 'Dla kogo przeznaczona jest psychoterapia grupowa i jak działa?',
    answer:
      'Psychoterapia grupowa to forma leczenia, w której źródłem zrozumienia i zmiany są bezpieczne interakcje między uczestnikami w obecności psychoterapeuty. Jest szczególnie pomocna dla osób doświadczających trudności w relacjach interpersonalnych, poczucia osamotnienia, wycofania społecznego, lęku społecznego czy zaburzeń osobowości. Grupa tworzy dyskretną przestrzeń, w której można przyjrzeć się własnym wzorcom budowania więzi, otrzymać wsparcie oraz przećwiczyć nowe, zdrowsze sposoby komunikacji.',
    category: 'Dzieci i grupa',
    iconKey: 'users',
  },
];
