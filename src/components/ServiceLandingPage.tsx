import React from 'react';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Brain,
  Users,
  LifeBuoy,
  Phone,
  ArrowRight,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';

export type ServiceRouteSlug =
  | 'psychoterapia-indywidualna-gdansk'
  | 'psycholog-dzieciecy-gdansk'
  | 'pomoc-w-kryzysie-gdansk';

export interface ServicePageMeta {
  slug: ServiceRouteSlug;
  path: string;
  canonicalUrl: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  h1: string;
  lead: string;
  bookingServiceId: string;
  duration: string;
  price: string;
  targetAudience: string;
  locationNote: string;
  indicationsTitle: string;
  indicationsSubtitle: string;
  indications: {
    title: string;
    description: string;
  }[];
  articleSections: {
    heading: string;
    paragraphs: string[];
    bulletPoints?: string[];
    highlightBox?: {
      title: string;
      text: string;
    };
  }[];
  processSteps: {
    stepNumber: string;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const SERVICE_PAGES_DATA: Record<ServiceRouteSlug, ServicePageMeta> = {
  'psychoterapia-indywidualna-gdansk': {
    slug: 'psychoterapia-indywidualna-gdansk',
    path: '/psychoterapia-indywidualna-gdansk',
    canonicalUrl: 'https://www.gabinetpsychologagdansk.pl/psychoterapia-indywidualna-gdansk',
    metaTitle: 'Psychoterapia Indywidualna Gdańsk (Jasień) – Nurt Psychodynamiczny | Alicja Jankiewicz',
    metaDescription:
      'Psychoterapia indywidualna w Gdańsku (ul. Kartuska 356a, Jasień). Leczenie zaburzeń lękowych, depresyjnych, trudności w relacjach i zaburzeń osobowości w nurcie psychodynamicznym.',
    badge: 'Psychoterapia dorosłych i młodzieży • Gdańsk Jasień',
    h1: 'Psychoterapia indywidualna w Gdańsku – trwała zmiana w nurcie psychodynamicznym',
    lead: 'Psychoterapia indywidualna to bezpieczna, poufna przestrzeń spotkania z samym sobą w obecności wykwalifikowanego psychoterapeuty. W moim gabinecie w Gdańsku (dzielnica Jasień, ul. Kartuska 356a) pomagam osobom dorosłym oraz młodzieży zrozumieć nieświadome źródła cierpienia, odzyskać wewnętrzną równowagę i budować satysfakcjonujące, autentyczne relacje.',
    bookingServiceId: 'konsultacja',
    duration: '50 minut',
    price: '200 zł',
    targetAudience: 'Osoby dorosłe oraz młodzież',
    locationNote: 'Gdańsk Jasień, ul. Kartuska 356a (bezpłatny parking przed gabinetem)',
    indicationsTitle: 'Kiedy warto rozważyć psychoterapię indywidualną?',
    indicationsSubtitle:
      'Do gabinetu trafiają zarówno osoby z konkretną diagnozą medyczną, jak i te, które doświadczają trudnego do nazwania poczucia pustki, przeciążenia lub powtarzających się impasów w życiu osobistym i zawodowym.',
    indications: [
      {
        title: 'Zaburzenia lękowe i napięcie emocjonalne',
        description:
          'Przewlekły niepokój, napady paniki, lęk społeczny, zamartwianie się, fobie lub natrętne myśli utrudniające codzienne funkcjonowanie.'
      },
      {
        title: 'Obniżony nastrój i stany depresyjne',
        description:
          'Utrata radości życia (anhedonia), chroniczne zmęczenie, poczucie bezradności, niska samoocena, nadmierne poczucie winy oraz trudności z motywacją.'
      },
      {
        title: 'Trudności w bliskich relacjach',
        description:
          'Powtarzające się bolesne schematy w związkach, lęk przed bliskością lub odrzuceniem, trudności w stawianiu granic, nadmierna uległość bądź konflikty interpersonalne.'
      },
      {
        title: 'Zaburzenia osobowości i kryzysy tożsamości',
        description:
          'Gwałtowne wahania emocjonalne, niestabilny obraz własnej osoby, poczucie wewnętrznej pustki oraz trudności w regulacji napięcia i impulsów.'
      },
      {
        title: 'Objawy psychosomatyczne',
        description:
          'Dolegliwości z ciała (bóle głowy, napięcia mięśniowe, problemy żołądkowe, bezsenność, kołatanie serca), które mimo badań lekarskich nie mają jednoznacznej przyczyny somatycznej.'
      },
      {
        title: 'Wypalenie zawodowe i perfekcjonizm',
        description:
          'Przeciążenie odpowiedzialnością, surowy wewnętrzny krytyk, niemożność odpoczynku oraz poczucie, że wartość własna zależy wyłącznie od osiąganych wyników.'
      }
    ],
    articleSections: [
      {
        heading: 'Na czym polega psychoterapia psychodynamiczna i dlaczego jej efekty są trwałe?',
        paragraphs: [
          'Psychoterapia psychodynamiczna wywodzi się z bogatej tradycji klinicznej oraz współczesnych badań nad rozwojem człowieka, teorią przywiązania i neurobiologią interpersonalną. Jej fundamentalnym założeniem jest uznanie, że znaczna część naszego życia psychicznego – w tym sposoby reagowania na stres, dobór partnerów życiowych czy przeżywanie własnej wartości – kształtowana jest przez nieświadome mechanizmy obronne, wewnętrzne konflikty oraz wczesne doświadczenia relacyjne.',
          'W odróżnieniu od krótkoterminowych metod skupionych wyłącznie na szybkim wygaszeniu pojedynczego objawu, podejście psychodynamiczne sięga do przyczyn trudności. Objaw – taki jak lęk, bezsenność czy somatyzacja – traktowany jest jako ważny sygnał informujący o tym, że dotychczasowe sposoby radzenia sobie przestały wystarczać.',
          'Podczas regularnych sesji w gabinecie przyglądamy się nie tylko bieżącym problemom, ale również temu, jak historia życia pacjenta oraz utrwalone wzorce przeżywania ożywają „tu i teraz” – także w bezpiecznej relacji terapeutycznej. Dzięki temu pacjent zyskuje nie tylko intelektualne zrozumienie swoich zachowań, ale przede wszystkim korektywne doświadczenie emocjonalne, które przekłada się na głęboką i stabilną zmianę poza gabinetem.'
        ],
        highlightBox: {
          title: 'Co daje pogłębiona praca psychodynamiczna?',
          text: 'Badania kliniczne nad skutecznością psychoterapii psychodynamicznej wykazują, że korzyści z procesu nie kończą się w dniu ostatniej sesji – zdolność do samorefleksji, regulacji emocji i budowania zdrowszych więzi rozwija się u pacjentów również w kolejnych latach po zakończeniu leczenia.'
        }
      },
      {
        heading: 'Znaczenie relacji terapeutycznej i wolnych skojarzeń',
        paragraphs: [
          'Podstawowym narzędziem leczenia w nurcie psychodynamicznym jest dialog oparty na autentycznym zaangażowaniu, neutralności i dyskrecji terapeuty. Podczas spotkań zachęcam pacjenta do swobodnego dzielenia się myślami, emocjami, wspomnieniami, wątpliwościami czy snami – bez konieczności cenzurowania się czy przygotowywania „właściwych” tematów przed wizytą.',
          'W gabinecie nie oceniam, nie narzucam gotowych rad i nie oceniam wyborów życiowych. Zamiast tego wspólnie badamy, co kryje się pod powierzchnią wypowiadanych słów: jakie uczucia są pomijane lub unieważniane, skąd bierze się lęk przed określoną zmianą i jakie nieświadome przekonania o sobie oraz innych ludziach podtrzymują cierpienie.',
          'Stałość ram terapeutycznych – ten sam dzień tygodnia, stała godzina, 50-minutowy czas trwania sesji oraz przewidywalne zasady współpracy – tworzy tzw. bezpieczny setting. To właśnie ta przewidywalność pozwala na stopniowe obniżenie lęku i dotarcie do głębszych warstw emocjonalnych, które w codziennym pośpiechu pozostają niedostępne.'
        ],
        bulletPoints: [
          'Pełna tajemnica zawodowa i poszanowanie autonomii pacjenta na każdym etapie procesu.',
          'Tempo pracy dostosowane do indywidualnej gotowości i zasobów psychicznych osoby zgłaszającej się po pomoc.',
          'Praca pod stałą, regularną superwizją certyfikowanych superwizorów Polskiego Towarzystwa Psychologicznego (PTP) oraz Polskiego Towarzystwa Psychoterapii Psychodynamicznej (PTPPd).',
          'Możliwość łączenia psychoterapii z leczeniem farmakologicznym (prowadzonym przez lekarza psychiatrę), jeśli wymaga tego nasilenie objawów.'
        ]
      },
      {
        heading: 'Jak długo trwa psychoterapia indywidualna?',
        paragraphs: [
          'Czas trwania psychoterapii jest zawsze kwestią indywidualną i zależy od złożoności zgłaszanych trudności, celów pacjenta oraz głębokości zmian, jakich pragnie dokonać. Podczas pierwszych spotkań konsultacyjnych wspólnie określamy ramy i cel pracy.',
          'W przypadku trudności skupionych wokół konkretnego obszaru życiowego proces może mieć charakter terapii ograniczonej w czasie (od kilku do kilkunastu miesięcy). Jeżeli natomiast cierpienie wynika z utrwalonych przez lata wzorców osobowościowych, przewlekłych zaburzeń lękowo-depresyjnych lub głębokich zranień relacyjnych, psychoterapia ma charakter długoterminowy. Spotkania odbywają się zazwyczaj raz (a w niektórych wskazaniach dwa razy) w tygodniu.'
        ]
      }
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Konsultacje wstępne (3–5 spotkań)',
        description:
          'Pierwsze wizyty służą poznaniu Twojej sytuacji życiowej, historii problemu oraz oczekiwań. To także czas, w którym możesz sprawdzić, jak czujesz się w kontakcie ze mną i w przestrzeni gabinetu.'
      },
      {
        stepNumber: '02',
        title: 'Wstępna konceptualizacja i kontrakt terapeutyczny',
        description:
          'Podsumowujemy wnioski z konsultacji. Przedstawiam moje rozumienie zgłaszanych trudności i proponuję adekwatną formę pomocy. Wspólnie ustalamy cele terapii, częstotliwość spotkań oraz zasady współpracy.'
      },
      {
        stepNumber: '03',
        title: 'Regularny proces psychoterapii (sesje 50-minutowe)',
        description:
          'Cotygodniowe spotkania o stałej porze, podczas których w bezpiecznych warunkach przepracowujemy źródła objawów, budujemy rozumienie emocji i wypracowujemy nowe, bardziej adaptacyjne sposoby funkcjonowania.'
      },
      {
        stepNumber: '04',
        title: 'Podsumowanie i domknięcie procesu',
        description:
          'Zakończenie terapii jest świadomie zaplanowanym etapem, podczas którego podsumowujemy osiągnięte zmiany, integrujemy zdobyte doświadczenie i przygotowujemy się do samodzielnego korzystania z wypracowanych zasobów.'
      }
    ],
    faqs: [
      {
        question: 'Jak przygotować się do pierwszej konsultacji psychoterapeutycznej?',
        answer:
          'Pierwsze spotkanie nie wymaga żadnego specjalnego przygotowania. Nie musisz układać planu wypowiedzi – podczas wizyty zadam pomocnicze pytania, które pozwolą nam spokojnie przyjrzeć się temu, co skłoniło Cię do poszukania wsparcia. Jeśli posiadasz wcześniejszą dokumentację medyczną (np. od lekarza psychiatry), możesz o niej wspomnieć.'
      },
      {
        question: 'Czym różni się konsultacja psychologiczna od psychoterapii?',
        answer:
          'Konsultacja to pierwsze 3 do 5 spotkań o charakterze diagnostyczno-orientacyjnym. Służą one zrozumieniu natury problemu i podjęciu wspólnej decyzji o dalszej współpracy. Psychoterapia właściwa rozpoczyna się po zawarciu ustnego kontraktu terapeutycznego i jest systematycznym procesem leczenia.'
      },
      {
        question: 'Czy w gabinecie obowiązuje tajemnica zawodowa?',
        answer:
          'Tak, bezwzględnie. Jako psycholog i psychoterapeuta jestem zobowiązana do zachowania pełnej poufności zarówno samego faktu korzystania z terapii, jak i wszystkich treści poruszanych podczas sesji, zgodnie z Kodeksem Etycznym Psychoterapeuty PTPPd oraz obowiązującymi przepisami prawa.'
      }
    ]
  },

  'psycholog-dzieciecy-gdansk': {
    slug: 'psycholog-dzieciecy-gdansk',
    path: '/psycholog-dzieciecy-gdansk',
    canonicalUrl: 'https://www.gabinetpsychologagdansk.pl/psycholog-dzieciecy-gdansk',
    metaTitle: 'Psycholog Dziecięcy i Psychoterapeuta Młodzieży Gdańsk (Jasień) | Alicja Jankiewicz',
    metaDescription:
      'Psycholog dziecięcy i psychoterapia młodzieży w Gdańsku (ul. Kartuska 356a, Jasień). Wsparcie w kryzysach rozwojowych, lękach, obniżonym nastroju i trudnościach rówieśniczych.',
    badge: 'Wsparcie dzieci, nastolatków i rodziców • Gdańsk Jasień',
    h1: 'Psycholog dziecięcy i psychoterapia młodzieży w Gdańsku – mądre wsparcie w rozwoju',
    lead: 'Dzieciństwo i okres dorastania to czas intensywnych przemian emocjonalnych, poznawczych i społecznych. W gabinecie w Gdańsku (ul. Kartuska 356a, dzielnica Jasień) oferuję profesjonalną pomoc psychologiczną oraz psychoterapię indywidualną dla dzieci i nastolatków, ściśle współpracując z rodzicami w atmosferze zrozumienia, szacunku i bezpieczeństwa.',
    bookingServiceId: 'konsultacja',
    duration: '50 minut',
    price: '200 zł',
    targetAudience: 'Dzieci, młodzież (nastolatkowie) oraz rodzice / opiekunowie',
    locationNote: 'Gdańsk Jasień, ul. Kartuska 356a (dogodny dojazd i bezpłatny parking)',
    indicationsTitle: 'Jakie sygnały u dziecka lub nastolatka warto skonsultować z psychologiem?',
    indicationsSubtitle:
      'Dzieci i nastolatkowie często nie potrafią jeszcze wprost opowiedzieć o swoim cierpieniu słowami – ich napięcie emocjonalne wyraża się wówczas poprzez zmianę zachowania, wycofanie, bunt lub dolegliwości somatyczne.',
    indications: [
      {
        title: 'Smutek, wycofanie i spadek nastroju',
        description:
          'Utrata dotychczasowych zainteresowań, izolowanie się od rówieśników i rodziny, płaczliwość, poczucie bycia gorszym, pesymistyczne myśli o sobie i przyszłości.'
      },
      {
        title: 'Lęki szkolne, separacyjne i społeczne',
        description:
          'Silny stres przed pójściem do szkoły lub przedszkola, paraliżujący lęk przed oceną, obawa przed rozstaniem z rodzicem, napady paniki lub wycofanie w grupie.'
      },
      {
        title: 'Trudności w regulacji emocji i wybuchy złości',
        description:
          'Gwałtowne reakcje emocjonalne, drażliwość, zachowania buntownicze, niskie poczucie własnej wartości maskowane agresją lub autoagresją.'
      },
      {
        title: 'Kryzysy rówieśnicze i adaptacyjne',
        description:
          'Doświadczenie odrzucenia, przemocy rówieśniczej (w tym cyberprzemocy), trudności ze zmianą szkoły, przeprowadzką lub odnalezieniem swojego miejsca w grupie.'
      },
      {
        title: 'Trudne zmiany w życiu rodziny',
        description:
          'Rozwód lub rozstanie rodziców, narodziny rodzeństwa, choroba bliskiej osoby, żałoba czy rekonstrukcja rodziny wymagająca nowego poukładania relacji.'
      },
      {
        title: 'Objawy psychosomatyczne i zaburzenia snu',
        description:
          'Poranne bóle brzucha i głowy przed wyjściem z domu, nudności na tle stresowym, tiki, problemy z zasypianiem, koszmary nocne lub przewlekłe zmęczenie.'
      }
    ],
    articleSections: [
      {
        heading: 'Jak wygląda pierwsza wizyta z dzieckiem lub nastolatkiem u psychologa?',
        paragraphs: [
          'Wielu rodziców przed umówieniem wizyty zastanawia się, czy na pierwsze spotkanie przyjść z dzieckiem, czy samemu. W przypadku młodszych dzieci pierwsze spotkanie odbywa się zazwyczaj wyłącznie z rodzicami (lub opiekunami prawnymi). Pozwala to na swobodne i szczere omówienie sytuacji rodzinnej, historii rozwoju dziecka od najmłodszych lat oraz niepokojących objawów – bez narażania dziecka na stres związany z przysłuchiwaniem się rozmowie dorosłych o jego trudnościach.',
          'W przypadku starszych nastolatków (młodzieży szkolnej i licealnej) pierwsze spotkanie może rozpocząć się od wspólnej rozmowy lub – po krótkim wprowadzeniu – podzielić na część z rodzicami oraz indywidualne spotkanie z młodym człowiekiem. Dla nastolatka niezwykle ważne jest poczucie podmiotowości i wiedza, że gabinet terapeuty jest bezpiecznym miejscem, w którym jego głos jest traktowany z powagą.',
          'Cały proces konsultacyjny obejmuje zazwyczaj od 3 do 5 spotkań (spotkania z rodzicami, indywidualne spotkania z dzieckiem/nastolatkiem oraz spotkanie podsumowujące). Na zakończenie konsultacji omawiamy wnioski diagnostyczne i wspólnie decydujemy o najbardziej pomocnej formie dalszego wsparcia.'
        ],
        highlightBox: {
          title: 'Współpraca z rodzicami to fundament skutecznej pomocy dziecku',
          text: 'Dziecko rozwija się w systemie rodzinnym. Dlatego równolegle do terapii indywidualnej dziecka lub nastolatka prowadzimy okresowe spotkania konsultacyjne dla rodziców, które pomagają lepiej rozumieć komunikaty emocjonalne dziecka i wspierać je w codziennym życiu bez naruszania jego zaufania do terapeuty.'
        }
      },
      {
        heading: 'Specyfika psychoterapii dzieci i młodzieży w ujęciu psychodynamicznym',
        paragraphs: [
          'Praca psychoterapeutyczna z młodym człowiekiem uwzględnia jego aktualny etap rozwojowy. U dzieci młodszych naturalnym językiem komunikacji emocjonalnej obok rozmowy jest zabawa tematyczna, rysunek oraz metafora. Poprzez spontaniczną aktywność w bezpiecznej relacji z terapeutą dziecko może wyrazić lęki, złość, poczucie bezradności czy konflikty wewnętrzne, których nie potrafi jeszcze ująć w pojęcia abstrakcyjne.',
          'Z kolei psychoterapia młodzieży przypomina w swojej formie pracę z osobami dorosłymi – opiera się na dialogu, jednak szczególny nacisk kładzie na wyzwania rozwojowe okresu adolescencji: kształtowanie tożsamości, separację od rodziców, budowanie granic, radzenie sobie z presją rówieśniczą i szkolną oraz przeżywanie własnej cielesności i emocjonalności.',
          'Nadrzędnym celem terapii nie jest „naprawienie” dziecka ani dopasowanie go do sztywnych oczekiwań otoczenia, lecz odblokowanie jego naturalnego potencjału rozwojowego, wzmocnienie odporności psychicznej i przywrócenie zdolności do czerpania radości z relacji oraz nauki.'
        ],
        bulletPoints: [
          'Doświadczenie kliniczne zdobyte m.in. na Dziennym Oddziale Psychiatrycznym dla Dzieci i Młodzieży, w Poradni Zdrowia Psychicznego, w placówkach oświatowych oraz w Centrum Interwencji Kryzysowej.',
          'Pełne wdrożenie i przestrzeganie Standardów Ochrony Małoletnich (SOM) gwarantujących najwyższy poziom bezpieczeństwa dziecka w gabinecie.',
          'Poszanowanie tajemnicy terapeutycznej nastolatka przy jednoczesnym dbaniu o bezpieczeństwo i przejrzystą komunikację z rodzicami w sprawach kluczowych.',
          'Holistyczne spojrzenie: w razie potrzeby współpraca ze szkołą, poradnią psychologiczno-pedagogiczną lub lekarzem psychiatrą dzieci i młodzieży.'
        ]
      },
      {
        heading: 'Jak przygotować dziecko lub nastolatka do wizyty w gabinecie?',
        paragraphs: [
          'Najważniejsza w rozmowie z dzieckiem przed pierwszą wizytą jest autentyczność i spokój rodzica. Warto unikać przedstawiania wizyty u psychologa jako kary („bo źle się zachowujesz”) lub egzaminu. Zamiast tego dobrze jest powiedzieć dziecku wprost, że idziecie do specjalisty, który pomaga dzieciom i rodzicom zrozumieć trudne emocje, zmartwienia czy napięcia, aby całej rodzinie żyło się lżej.',
          'Nastolatkowi warto pozostawić przestrzeń na własne pytania i wątpliwości – podkreślając, że pierwsze spotkania są konsultacjami, podczas których sam będzie mógł zobaczyć, czy czuje się w gabinecie bezpiecznie i swobodnie.'
        ]
      }
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Spotkanie z rodzicami (wywiad rozwojowy)',
        description:
          'Rozmowa z rodzicami/opiekunami bez udziału młodszego dziecka, poświęcona zebraniu dokładnego wywiadu rozwojowego, rodzinnego oraz omówieniu bieżących trudności.'
      },
      {
        stepNumber: '02',
        title: 'Spotkania diagnostyczno-konsultacyjne z dzieckiem / nastolatkiem',
        description:
          'Jedno do trzech spotkań indywidualnych z młodym pacjentem w formie dostosowanej do jego wieku (rozmowa, obserwacja, rysunek, zabawa), pozwalających poznać jego perspektywę i świat przeżyć.'
      },
      {
        stepNumber: '03',
        title: 'Podsumowanie konsultacji i plan pomocy',
        description:
          'Spotkanie z rodzicami (a w przypadku starszej młodzieży również z nastolatkiem), podczas którego omawiamy rozumienie problemu oraz ustalamy dalsze kroki: psychoterapię indywidualną, wsparcie rodzicielskie lub inne rekomendacje.'
      },
      {
        stepNumber: '04',
        title: 'Regularna psychoterapia i okresowe konsultacje rodzicielskie',
        description:
          'Cotygodniowe, 50-minutowe spotkania terapeutyczne z dzieckiem lub nastolatkiem, wspierane regularnymi spotkaniami z rodzicami służącymi omówieniu postępów i wskazówek wychowawczych.'
      }
    ],
    faqs: [
      {
        question: 'Czy na pierwszą wizytę przyjść z dzieckiem, czy samemu jako rodzic?',
        answer:
          'Jeśli zgłaszasz dziecko poniżej 13.–14. roku życia, na pierwsze spotkanie zapraszam samych rodziców (najlepiej oboje opiekunów). Pozwala nam to spokojnie porozmawiać o historii rozwoju dziecka i Waszych obawach. W przypadku starszych nastolatków (15–18 lat) możemy umówić pierwszą konsultację wspólnie lub po krótkim wstępie z rodzicem przejść do rozmowy z nastolatkiem.'
      },
      {
        question: 'Czy psycholog przekazuje rodzicom wszystko, o czym mówi nastolatek?',
        answer:
          'Aby psychoterapia nastolatka była skuteczna, młody człowiek musi mieć poczucie zaufania i dyskrecji – dlatego szczegółowe treści jego rozmów objęte są poufnością. Rodzice otrzymują natomiast ogólną informację o przebiegu procesu i obszarach pracy. Wyjątkiem jest sytuacja bezpośredniego zagrożenia zdrowia lub życia dziecka – wówczas rodzic jest informowany niezwłocznie.'
      },
      {
        question: 'Czy w gabinecie obowiązują Standardy Ochrony Małoletnich (SOM)?',
        answer:
          'Tak. Gabinet działa w pełnej zgodności z Ustawą o ochronie małoletnich. Dokument Standardów Ochrony Dzieci jest dostępny zarówno stacjonarnie w gabinecie przy ul. Kartuskiej 356a, jak i bezpośrednio na stronie internetowej w zakładce „Ochrona Dzieci”.'
      }
    ]
  },

  'pomoc-w-kryzysie-gdansk': {
    slug: 'pomoc-w-kryzysie-gdansk',
    path: '/pomoc-w-kryzysie-gdansk',
    canonicalUrl: 'https://www.gabinetpsychologagdansk.pl/pomoc-w-kryzysie-gdansk',
    metaTitle: 'Pomoc Psychologiczna w Kryzysie Gdańsk – Interwencja i Wsparcie | Alicja Jankiewicz',
    metaDescription:
      'Pomoc psychologiczna w kryzysie w Gdańsku (ul. Kartuska 356a, Jasień). Krótkoterminowe wsparcie w żałobie, po rozstaniu, utracie pracy, nagłych zmianach życiowych i przeciążeniu.',
    badge: 'Wsparcie krótkoterminowe i interwencja • Gdańsk Jasień',
    h1: 'Pomoc psychologiczna w kryzysie w Gdańsku – bezpieczna przystań w trudnym momencie życia',
    lead: 'Kryzys psychologiczny pojawia się wtedy, gdy nagłe wydarzenie lub narastające przez dłuższy czas przeciążenie przekracza nasze dotychczasowe możliwości radzenia sobie. W gabinecie w Gdańsku (ul. Kartuska 356a, dzielnica Jasień) oferuję empatyczną, profesjonalną pomoc psychologiczną i wsparcie w kryzysie dla osób dorosłych oraz młodzieży – pomagając odzyskać poczucie gruntu pod nogami.',
    bookingServiceId: 'konsultacja',
    duration: '50 minut',
    price: '200 zł',
    targetAudience: 'Osoby dorosłe oraz młodzież w ostrym lub przewlekłym kryzysie życiowym',
    locationNote: 'Gdańsk Jasień, ul. Kartuska 356a (szybki dojazd z S6 i dzielnic Gdańska)',
    indicationsTitle: 'W jakich sytuacjach życiowych warto skorzystać z pomocy w kryzysie?',
    indicationsSubtitle:
      'Nie musisz czekać, aż trudności przerodzą się w głębokie zaburzenia. Wczesne skorzystanie z profesjonalnego wsparcia psychologicznego pozwala bezpiecznie przejść przez destabilizujący etap życia.',
    indications: [
      {
        title: 'Żałoba i doświadczenie straty',
        description:
          'Śmierć bliskiej osoby, utrata ciąży, pożegnanie ważnej relacji lub utrata zdrowia, którym towarzyszy ból, odrętwienie, rozpacz i trudność w powrocie do codzienności.'
      },
      {
        title: 'Rozstanie, rozwód i kryzys w związku',
        description:
          'Zdrada, nagły rozpad relacji partnerskiej lub małżeńskiej, konieczność podjęcia trudnych decyzji życiowych, poczucie osamotnienia i lęk przed przyszłością.'
      },
      {
        title: 'Nagłe zmiany zawodowe i finansowe',
        description:
          'Utrata pracy, mobbing, wypalenie zawodowe, silny stres związany z przebranżowieniem lub nagłym pogorszeniem sytuacji materialnej i życiowej.'
      },
      {
        title: 'Kryzysy rozwojowe i punkty zwrotne',
        description:
          'Trudności związane z wejściem w dorosłość, narodzinami dziecka (w tym kryzys okołoporodowy), syndromem opuszczonego gniazda czy przejściem na emeryturę.'
      },
      {
        title: 'Doświadczenie wypadku lub nagłego wstrząsu',
        description:
          'Konfrontacja z nagłym zagrożeniem, diagnozą lekarską własną lub bliskiej osoby, wywołująca silne napięcie, bezsenność i poczucie utraty kontroli.'
      },
      {
        title: 'Przeciążenie emocjonalne i poczucie bezradności',
        description:
          'Stan, w którym codzienne obowiązki zaczynają przytłaczać, pojawia się płaczliwość, drażliwość, problemy ze snem i wrażenie, że „wszystko wymyka się z rąk”.'
      }
    ],
    articleSections: [
      {
        heading: 'Czym jest kryzys psychologiczny i jak działa krótkoterminowe wsparcie?',
        paragraphs: [
          'W psychologii kryzys nie jest oznaką słabości ani chorobą psychiczną – jest naturalną reakcją ludzkiej psychiki na sytuację graniczną, w której dotychczasowe strategie adaptacyjne przestają działać. Kiedy tracimy kogoś bliskiego, rozpada się ważny związek lub nasze poczucie bezpieczeństwa zostaje nagle zachwiane, układ nerwowy reaguje silnym alarmem: pojawia się chaos myśli, bezsenność, lęk, złość lub emocjonalne zamrożenie.',
          'Pomoc psychologiczna w kryzysie (wsparcie krótkoterminowe) różni się od długoterminowej psychoterapii tym, że koncentruje się przede wszystkim na aktualnym wydarzeniu oraz przywróceniu równowagi psychicznej „tu i teraz”. Moje wieloletnie doświadczenie zdobyte m.in. w Centrum Interwencji Kryzysowej pozwala mi towarzyszyć pacjentom w sposób uważny, ugruntowujący i dający realne poczucie oparcia.',
          'W trakcie spotkań tworzymy bezpieczną przestrzeń, w której wszystkie – nawet najbardziej bolesne czy sprzeczne – emocje mogą zostać nazwane, przyjęte i przeżyte bez oceniania. Wspólnie porządkujemy sytuację, oddzielamy to, na co masz wpływ, od tego, co wymaga opłakania i akceptacji, oraz wypracowujemy konkretne sposoby radzenia sobie z napięciem w najbliższych dniach i tygodniach.'
        ],
        highlightBox: {
          title: 'Od stabilizacji do głębszego zrozumienia',
          text: 'Dla wielu osób kilka lub kilkanaście spotkań wsparcia w kryzysie wystarcza, aby odzyskać sprawczość i równowagę. Dla innych bezpieczne przejście przez kryzys staje się ważnym punktem wyjścia do podjęcia głębszej psychoterapii indywidualnej, jeśli kryzys ujawnił wcześniejsze, nieprzepracowane trudności.'
        }
      },
      {
        heading: 'Dlaczego nie warto zostawać z kryzysem w samotności?',
        paragraphs: [
          'Częstym odruchem w obliczu nagłego cierpienia jest próba „przeczekania”, zaciskania zębów lub chronienia bliskich przed własnymi trudnymi emocjami. Niestety nieprzeżyty, stłumiony kryzys bardzo często ulega utrwaleniu – przeradzając się po kilku miesiącach w przewlekłe zaburzenia depresyjne, lękowe lub dolegliwości psychosomatyczne.',
          'Rozmowa z psychologiem i psychoterapeutą daje coś, czego często nie są w stanie zapewnić nawet najbardziej życzliwi bliscy: pełną neutralność, profesjonalną wiedzę o dynamice kryzysu i żałoby oraz przestrzeń, w której nie musisz nikogo pocieszać ani udawać, że jesteś silniejszy, niż czujesz się w danej chwili.'
        ],
        bulletPoints: [
          'Obniżenie ostrego napięcia emocjonalnego i odzyskanie poczucia bezpieczeństwa.',
          'Zrozumienie naturalnych faz kryzysu oraz procesu żałoby – normalizacja trudnych przeżyć.',
          'Odbudowanie wewnętrznych zasobów, sprawczości i zdolności do podejmowania decyzji.',
          'Indywidualnie dopasowana liczba spotkań (wsparcie krótkoterminowe od kilku do kilkunastu wizyt).'
        ]
      },
      {
        heading: 'Pomoc w kryzysie w Gdańsku – spokojna lokalizacja i pełna dyskrecja',
        paragraphs: [
          'Mój gabinet znajduje się w spokojnej części Gdańska (dzielnica Jasień, ul. Kartuska 356a), z dala od zgiełku ścisłego centrum, ale z bardzo wygodnym dojazdem zarówno z dzielnic: Ujeścisko, Morena, Karczemki, Kokoszki, jak i bezpośrednio z obwodnicy Trójmiasta (S6). Bezpłatny parking tuż przed wejściem oraz bezpośrednie sąsiedztwo przystanków komunikacji miejskiej (Zabornia, Damroki) sprawiają, że dotarcie na wizytę nie wiąże się z dodatkowym stresem logistycznym.'
        ]
      }
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Pierwsze spotkanie i zatrzymanie eskalacji napięcia',
        description:
          'Uważne wysłuchanie Twojej sytuacji w atmosferze spokoju i akceptacji. Zadbamy o obniżenie najsilniejszego lęku, nazwanie tego, co się wydarzyło, oraz ocenę najpilniejszych potrzeb.'
      },
      {
        stepNumber: '02',
        title: 'Uporządkowanie sytuacji i uruchomienie zasobów',
        description:
          'Wspólnie przyglądamy się Twoim zasobom wewnętrznym oraz sieci wsparcia. Porządkujemy priorytety na najbliższy czas, aby przywrócić poczucie wpływu i przewidywalności.'
      },
      {
        stepNumber: '03',
        title: 'Towarzyszenie w przeżywaniu emocji i adaptacji do zmiany',
        description:
          'Cykl spotkań wspierających (zazwyczaj od kilku do kilkunastu sesji), podczas których bezpiecznie przechodzisz przez kolejne etapy kryzysu, straty lub życiowej zmiany.'
      },
      {
        stepNumber: '04',
        title: 'Odzyskanie równowagi lub decyzja o dalszej pracy',
        description:
          'Domknięcie wsparcia kryzysowego po ustabilizowaniu samopoczucia bądź – jeśli wyrazisz taką potrzebę – płynne przejście do długoterminowej psychoterapii indywidualnej.'
      }
    ],
    faqs: [
      {
        question: 'Ile spotkań obejmuje pomoc psychologiczna w kryzysie?',
        answer:
          'Wsparcie w kryzysie ma charakter krótkoterminowy i trwa zazwyczaj od kilku do kilkunastu spotkań (po 50 minut każde). Dokładną liczbę wizyt dostosowujemy elastycznie do Twojego samopoczucia oraz tempa powrotu do równowagi psychicznej.'
      },
      {
        question: 'Skąd mam wiedzieć, czy potrzebuję wsparcia w kryzysie, czy psychoterapii?',
        answer:
          'Nie musisz rozstrzygać tego przed pierwszą wizytą. Podczas pierwszych spotkań konsultacyjnych wspólnie przyjrzymy się Twojej sytuacji. Jeśli trudności wiążą się głównie z nagłym wydarzeniem życiowym, skupimy się na wsparciu kryzysowym. Jeśli natomiast kryzys uruchomił głębsze, wieloletnie wzorce cierpienia, możemy rozważyć psychoterapię.'
      },
      {
        question: 'Co zrobić w sytuacji nagłego zagrożenia życia lub ostrego kryzysu w nocy?',
        answer:
          'Gabinet prywatny prowadzi wizyty po wcześniejszym umówieniu terminu i nie pełni całodobowego dyżuru medycznego. W sytuacji bezpośredniego zagrożenia życia lub zdrowia należy niezwłocznie zadzwonić pod numer alarmowy 112, zgłosić się na najbliższą Izbę Przyjęć szpitala psychiatrycznego (np. Wojewódzki Szpital Psychiatryczny w Gdańsku przy ul. Srebrniki) lub skorzystać z całodobowego Centrum Wsparcia (tel. 800 70 2222).'
      }
    ]
  }
};

interface ServiceLandingPageProps {
  slug: ServiceRouteSlug;
  onBackToHome: () => void;
  onOpenBooking: (serviceId?: string | null) => void;
  onNavigateToService: (slug: ServiceRouteSlug) => void;
  onNavigateToStandards?: () => void;
}

export default function ServiceLandingPage({
  slug,
  onBackToHome,
  onOpenBooking,
  onNavigateToService,
  onNavigateToStandards
}: ServiceLandingPageProps) {
  const page = SERVICE_PAGES_DATA[slug];

  const otherServices = (Object.keys(SERVICE_PAGES_DATA) as ServiceRouteSlug[]).filter(
    (key) => key !== slug
  );

  const getServiceIcon = (serviceSlug: ServiceRouteSlug) => {
    switch (serviceSlug) {
      case 'psychoterapia-indywidualna-gdansk':
        return <Brain className="w-6 h-6 text-brand-primary" />;
      case 'psycholog-dzieciecy-gdansk':
        return <Users className="w-6 h-6 text-brand-primary" />;
      case 'pomoc-w-kryzysie-gdansk':
        return <LifeBuoy className="w-6 h-6 text-brand-primary" />;
    }
  };

  return (
    <article className="pb-20 pt-6 md:pt-10 bg-brand-bg">
      {/* Breadcrumb & Top Navigation */}
      <div className="max-w-[1140px] mx-auto px-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-brand-muted">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onBackToHome();
              }}
              className="hover:text-brand-primary transition-colors font-medium inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft size={15} />
              Strona główna
            </a>
            <span className="text-brand-muted/40">/</span>
            <span className="text-brand-secondary font-medium truncate max-w-[260px] sm:max-w-none">
              {page.slug === 'psychoterapia-indywidualna-gdansk'
                ? 'Psychoterapia indywidualna Gdańsk'
                : page.slug === 'psycholog-dzieciecy-gdansk'
                ? 'Psycholog dziecięcy Gdańsk'
                : 'Pomoc w kryzysie Gdańsk'}
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 text-xs font-medium text-brand-secondary bg-brand-card/70 px-3.5 py-1.5 rounded-full border border-brand-accent/40">
            <MapPin size={13} className="text-brand-primary" />
            <span>Gdańsk Jasień • ul. Kartuska 356a</span>
          </div>
        </div>
      </div>

      {/* Hero Section with H1 */}
      <header className="max-w-[1140px] mx-auto px-6 mb-14 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-brand-card/85 border border-brand-accent/40 rounded-3xl p-7 sm:p-10 md:p-14 shadow-soft-lift relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase bg-brand-accent/45 text-brand-secondary border border-brand-accent/60">
                <Sparkles size={13} />
                {page.badge}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-brand-primary leading-[1.18] tracking-tight">
                {page.h1}
              </h1>

              <p className="text-base sm:text-lg text-brand-muted font-sans font-light leading-relaxed">
                {page.lead}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenBooking(page.bookingServiceId)}
                  className="inline-flex items-center gap-2.5 bg-brand-primary text-white font-serif px-7 py-3.5 rounded-xl text-base font-medium shadow-soft-lift hover:bg-brand-primary/95 transition-all cursor-pointer"
                >
                  <Calendar size={18} />
                  Umów konsultację w gabinecie
                </button>
                <a
                  href="tel:+48514309526"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-brand-primary/25 bg-brand-bg/90 text-brand-primary hover:bg-brand-bg font-serif text-sm sm:text-base font-medium transition-all"
                >
                  <Phone size={16} className="text-brand-secondary" />
                  +48 514 309 526
                </a>
              </div>
            </div>

            {/* Key Facts Sidebar Card inside Hero */}
            <div className="lg:col-span-4 bg-brand-bg/95 p-6 sm:p-7 rounded-2xl border border-brand-card shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-3 border-b border-brand-card">
                <div className="p-2.5 rounded-xl bg-brand-card text-brand-primary">
                  {getServiceIcon(slug)}
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-brand-muted block">
                    Informacje organizacyjne
                  </span>
                  <strong className="font-serif text-brand-primary text-base">
                    Gabinet Alicja Jankiewicz
                  </strong>
                </div>
              </div>

              <ul className="flex flex-col gap-3.5 text-sm">
                <li className="flex items-start gap-3">
                  <Clock size={17} className="text-brand-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-brand-muted block text-xs">Czas trwania i koszt sesji</span>
                    <span className="font-semibold text-brand-charcoal">
                      {page.duration} / {page.price}
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <HeartHandshake size={17} className="text-brand-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-brand-muted block text-xs">Dla kogo</span>
                    <span className="font-medium text-brand-charcoal">{page.targetAudience}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={17} className="text-brand-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-brand-muted block text-xs">Miejsce spotkań</span>
                    <span className="font-medium text-brand-charcoal">{page.locationNote}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck size={17} className="text-brand-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-brand-muted block text-xs">Standardy kliniczne</span>
                    <span className="font-medium text-brand-charcoal">
                      KCP • Członek PTPPd • Stała superwizja PTP
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Indications Grid */}
      <section className="max-w-[1140px] mx-auto px-6 mb-16 md:mb-24">
        <div className="max-w-[760px] mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-brand-primary mb-3">
            {page.indicationsTitle}
          </h2>
          <p className="text-brand-muted font-sans font-light leading-relaxed text-base">
            {page.indicationsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {page.indications.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="bg-brand-card/70 p-6 rounded-2xl border border-brand-card hover:border-brand-accent/50 transition-all shadow-soft-lift flex flex-col gap-2.5"
            >
              <div className="flex items-center gap-2.5 text-brand-primary font-serif font-semibold text-lg">
                <CheckCircle2 size={18} className="text-brand-secondary shrink-0" />
                <h3>{item.title}</h3>
              </div>
              <p className="text-sm text-brand-muted font-sans font-light leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Exhaustive Article Content + Author Sidebar */}
      <section className="max-w-[1140px] mx-auto px-6 mb-16 md:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Deep Article Column */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            {page.articleSections.map((section, index) => (
              <div
                key={section.heading}
                className="bg-white/60 dark:bg-brand-card/40 p-7 sm:p-9 rounded-2xl border border-brand-card/80 shadow-xs"
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-secondary mb-2">
                  <BookOpen size={14} />
                  <span>Wiedza dla pacjenta • Część {index + 1}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-brand-primary mb-5 leading-snug">
                  {section.heading}
                </h2>
                <div className="flex flex-col gap-4 text-brand-charcoal/90 font-sans font-light leading-relaxed text-base">
                  {section.paragraphs.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="mt-6 pt-6 border-t border-brand-card flex flex-col gap-3">
                    {section.bulletPoints.map((point, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-sm sm:text-base text-brand-charcoal">
                        <CheckCircle2 size={18} className="text-brand-secondary shrink-0 mt-0.5" />
                        <span className="font-light leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.highlightBox && (
                  <div className="mt-6 bg-brand-card/80 border-l-4 border-brand-secondary p-5 rounded-r-xl">
                    <h3 className="font-serif font-semibold text-brand-primary text-base mb-1.5">
                      {section.highlightBox.title}
                    </h3>
                    <p className="text-sm text-brand-muted font-light leading-relaxed">
                      {section.highlightBox.text}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sticky Therapist E-E-A-T & Local Access Column */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-6">
            <div className="bg-brand-card p-6 sm:p-7 rounded-2xl border border-brand-accent/40 shadow-soft-lift">
              <div className="flex items-center gap-4 mb-5">
                <img
                  src="/alicjajankiewicz1.webp"
                  alt="Alicja Jankiewicz – Psycholog i Psychoterapeuta Psychodynamiczny w Gdańsku"
                  className="w-16 h-16 rounded-2xl object-cover object-top border border-brand-accent/50 shadow-xs"
                />
                <div>
                  <h3 className="font-serif font-semibold text-lg text-brand-primary">
                    mgr Alicja Jankiewicz
                  </h3>
                  <p className="text-xs text-brand-secondary font-medium">
                    Psycholog • Psychoterapeuta Psychodynamiczny
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-brand-muted font-light leading-relaxed mb-5">
                Absolwentka psychologii ze specjalnością kliniczną na Uniwersytecie Gdańskim oraz
                4-letniego Studium Psychoterapii w Krakowskim Centrum Psychodynamicznym. Członkini
                Polskiego Towarzystwa Psychoterapii Psychodynamicznej (PTPPd). Swoją pracę poddaje
                regularnej superwizji certyfikowanych superwizorów PTP i PTPPd.
              </p>

              {slug === 'psycholog-dzieciecy-gdansk' && onNavigateToStandards && (
                <button
                  type="button"
                  onClick={onNavigateToStandards}
                  className="w-full mb-4 py-2.5 px-4 rounded-xl bg-brand-bg text-brand-secondary hover:text-brand-primary text-xs font-semibold flex items-center justify-center gap-2 border border-brand-accent/50 transition-colors cursor-pointer"
                >
                  <ShieldCheck size={15} />
                  Zobacz Standardy Ochrony Małoletnich (SOM)
                </button>
              )}

              <button
                onClick={() => onOpenBooking(page.bookingServiceId)}
                className="w-full py-3.5 px-5 rounded-xl bg-brand-primary text-white font-serif text-sm font-medium shadow-soft-lift hover:bg-brand-primary/95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar size={16} />
                Zarezerwuj termin wizyty
              </button>
            </div>

            {/* Local Gdańsk Accessibility Card */}
            <div className="bg-brand-card/65 p-6 rounded-2xl border border-brand-card">
              <h3 className="font-serif font-semibold text-base text-brand-primary mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-brand-secondary" />
                Lokalizacja i dojazd w Gdańsku
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted font-light leading-relaxed mb-3">
                Gabinet mieści się przy <strong className="font-medium text-brand-charcoal">ul. Kartuskiej 356a w Gdańsku</strong>.
              </p>
              <p className="text-xs text-brand-secondary font-normal leading-relaxed bg-brand-bg/80 p-3.5 rounded-xl border border-brand-card">
                Dogodny dojazd z dzielnic: Gdańsk Jasień, Ujeścisko, Morena, Karczemki oraz z obwodnicy Trójmiasta (S6). Bezpłatne miejsca parkingowe dostępne są bezpośrednio przed budynkiem.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Step-by-Step Process Section */}
      <section className="max-w-[1140px] mx-auto px-6 mb-16 md:mb-24">
        <div className="bg-brand-card/75 rounded-3xl p-7 sm:p-10 md:p-12 border border-brand-card">
          <div className="max-w-[680px] mb-10">
            <span className="text-xs uppercase tracking-widest font-semibold text-brand-secondary block mb-2">
              Przebieg współpracy krok po kroku
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-brand-primary">
              Jak wygląda rozpoczęcie współpracy w moim gabinecie?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {page.processSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-brand-bg p-6 rounded-2xl border border-brand-card/80 flex flex-col justify-between gap-4"
              >
                <div>
                  <span className="inline-block font-serif text-2xl font-bold text-brand-secondary/75 mb-3">
                    {step.stepNumber}
                  </span>
                  <h3 className="font-serif font-semibold text-lg text-brand-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-brand-muted font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated FAQ for this Service */}
      <section className="max-w-[1140px] mx-auto px-6 mb-16 md:mb-24">
        <div className="max-w-[760px] mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-secondary mb-2">
            <HelpCircle size={14} />
            <span>Najczęstsze pytania pacjentów</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-brand-primary">
            Pytania i odpowiedzi dotyczące tej formy pomocy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {page.faqs.map((faq) => (
            <div
              key={faq.question}
              className="bg-brand-card/60 p-6 sm:p-7 rounded-2xl border border-brand-card flex flex-col gap-3"
            >
              <h3 className="font-serif font-semibold text-lg text-brand-primary leading-snug">
                {faq.question}
              </h3>
              <p className="text-sm text-brand-muted font-light leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-linking to the other dedicated service routes */}
      <section className="max-w-[1140px] mx-auto px-6">
        <div className="border-t border-brand-card pt-12">
          <h2 className="text-xl sm:text-2xl font-serif font-semibold text-brand-primary mb-6">
            Pozostałe specjalistyczne obszary pomocy w gabinecie:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherServices.map((otherSlug) => {
              const otherPage = SERVICE_PAGES_DATA[otherSlug];
              return (
                <a
                  key={otherSlug}
                  href={otherPage.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateToService(otherSlug);
                  }}
                  className="group bg-brand-card/55 hover:bg-brand-card p-6 rounded-2xl border border-brand-card hover:border-brand-accent/60 transition-all flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">
                      {otherPage.badge}
                    </span>
                    <h3 className="font-serif font-semibold text-lg text-brand-primary group-hover:text-brand-secondary transition-colors">
                      {otherPage.h1}
                    </h3>
                  </div>
                  <div className="p-2.5 rounded-full bg-brand-bg text-brand-primary group-hover:translate-x-1 transition-transform shrink-0">
                    <ArrowRight size={18} />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </article>
  );
}
