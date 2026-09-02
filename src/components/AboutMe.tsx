import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  User, 
  Heart,
  Eye
} from 'lucide-react';
import { motion } from 'motion/react';

type TabType = 'wyksztalcenie' | 'doswiadczenie' | 'szkolenia';

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState<TabType>('wyksztalcenie');

  return (
    <section id="o-mnie" className="pt-12 md:pt-24 pb-4 md:pb-8 bg-brand-bg border-y border-brand-card/40">
      <div className="max-w-[1140px] mx-auto px-6">
        
        {/* main Grid: Introduction Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-10 md:mb-20">
          
          {/* Photo Column */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center pt-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[380px] aspect-[4/5] mb-6"
            >
              <div className="absolute -inset-2 bg-brand-accent/25 rounded-3xl -rotate-1.5 -z-10" />
              
              <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft-lift bg-brand-card border border-brand-card/40">
                <img
                  src="/alicjajankiewicz1.webp"
                  alt="Alicja Jankiewicz - Psycholog i Psychoterapeuta Gdańsk"
                  className="w-full h-full object-cover object-top filter brightness-[1.01] contrast-[0.99] hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full max-w-[380px] bg-linear-to-r from-brand-secondary/10 via-brand-accent/20 to-brand-secondary/10 border border-brand-secondary/30 p-4 rounded-2xl text-center shadow-xs flex flex-col items-center justify-center gap-1.5"
            >
              <span className="text-2xl sm:text-3xl font-serif font-black text-brand-primary tracking-tight">
                Ponad 10 lat praktyki
              </span>
              <p className="text-xs text-brand-muted font-light leading-relaxed max-w-[300px]">
                Wieloletnie doświadczenie kliniczne w diagnozie i psychoterapii indywidualnej oraz grupowej.
              </p>
            </motion.div>
          </div>

          {/* Text and Bio Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-3 text-left"
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-secondary tracking-widest uppercase">
                <User size={13} /> O mnie
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-brand-primary leading-tight">
                Poznaj moje podejście i filozofię pracy
              </h2>
              <div className="h-0.5 w-16 bg-brand-accent rounded mt-2 animate-pulse" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-brand-muted font-sans font-light leading-relaxed flex flex-col gap-4 text-sm sm:text-base text-justify"
            >
              <p>
                Nazywam się <strong className="text-brand-primary font-medium">Alicja Jankiewicz</strong>. Jestem doświadczonym psychologiem i psychoterapeutą psychodynamicznym. Ukończyłam całościowe, czteroletnie szkolenie z zakresu psychoterapii psychodynamicznej w Krakowskim Centrum Psychodynamicznym (KCP) – prestiżowej placówce posiadającej akredytację i rekomendację <strong className="text-brand-secondary font-medium">Polskiego Towarzystwa Psychologicznego</strong>.
              </p>
              <p>
                W moim gabinecie w Gdańsku (dzielnica Jasień, w bliskim sąsiedztwie dzielnic Kokoszki, Ujeścisko-Łostowice oraz Piecki-Migowo) prowadzę konsultacje psychologiczne oraz psychoterapię indywidualną dla <strong className="text-brand-primary font-medium">osób dorosłych, młodzieży oraz dzieci</strong>. Moje podejście terapeutyczne ukształtowało głębokie przekonanie, że każdy człowiek – niezależnie od wieku – potrzebuje bezpiecznej, pełnej zaufania przestrzeni, by móc wypowiedzieć i zrozumieć swoje wewnętrzne konflikty, lęki czy trudne emocje.
              </p>
              <p>
                Jako aktywny członek{' '}
                <a
                  href="https://www.ptppd.pl/czlonkowie-ptppd.html"
                  target="_blank"
                  rel="noreferrer"
                  className="font-indigo-600 font-medium text-brand-primary hover:text-brand-secondary underline underline-offset-4 decoration-current/30 decoration-1 hover:decoration-current transition-colors"
                >
                  Polskiego Towarzystwa Psychoterapii Psychodynamicznej (PTPPd)
                </a>
                , prowadzę procesy terapeutyczne zgodnie z najwyższymi standardami etycznymi zawodu psychoterapeuty. Swoją cykliczną pracę z dorosłymi oraz pacjentami młodszymi poddaję regularnej superwizji u certyfikowanych superwizorów Polskiego Towarzystwa Psychologicznego.
              </p>
            </motion.div>

            {/* Core Values row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              <div className="p-4 bg-brand-card/25 border border-brand-card/40 rounded-xl flex flex-col gap-1.5 text-left">
                <div className="text-brand-secondary flex items-center gap-1.5 font-medium font-serif text-sm">
                  <ShieldCheck size={16} /> Bezpieczeństwo
                </div>
                <p className="text-[11px] sm:text-xs text-brand-muted font-light leading-relaxed">
                  Pełna poufność i profesjonalne, wolne od oceniania wsparcie w trudnych chwilach.
                </p>
              </div>

              <div className="p-4 bg-brand-card/25 border border-brand-card/40 rounded-xl flex flex-col gap-1.5 text-left">
                <div className="text-brand-secondary flex items-center gap-1.5 font-medium font-serif text-sm">
                  <Heart size={16} /> Zrozumienie
                </div>
                <p className="text-[11px] sm:text-xs text-brand-muted font-light leading-relaxed">
                  Skupienie na Twoich indywidualnych potrzebach i tempie wprowadzania zmian.
                </p>
              </div>

              <div className="p-4 bg-brand-card/25 border border-brand-card/40 rounded-xl flex flex-col gap-1.5 text-left">
                <div className="text-brand-secondary flex items-center gap-1.5 font-medium font-serif text-sm">
                  <Eye size={16} /> Superwizja
                </div>
                <p className="text-[11px] sm:text-xs text-brand-muted font-light leading-relaxed">
                  Profesjonalna kontrola procesów terapeutycznych gwarantująca najwyższą jakość pomocy.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Highly expanded: Interactive Education & Experience Hub */}
        <div className="bg-brand-card/20 rounded-3xl border border-brand-card/40 p-6 sm:p-10 text-left">
          
          <div className="max-w-[750px] mb-8">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-accent/25 border border-brand-card/50 text-[10px] uppercase font-bold tracking-wider text-brand-secondary rounded-full mb-3">
              <Layers size={11} className="animate-spin-slow" /> Kwalifikacje zawodowe
            </div>
            {/* ZMIANA: h3 zmienione na h2 pod kątem struktury SEO */}
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-brand-primary leading-tight">
              Wykształcenie, szkolenia i doświadczenie kliniczne w Gdańsku
            </h2>
            <p className="text-brand-muted font-light text-sm sm:text-base mt-2">
              Zapewniam rzetelność i profesjonalizm poparty latami nauki, staży klinicznych oraz certyfikowanymi kursami terapeutycznymi.
            </p>
          </div>

          {/* Tab Button Switcher */}
          <div className="flex flex-col sm:flex-row gap-2 border-b border-brand-card/40 pb-4 mb-8">
            <button
              onClick={() => setActiveTab('wyksztalcenie')}
              className={`flex items-center justify-center sm:justify-start gap-2.5 px-5 py-3 rounded-xl transition-all cursor-pointer font-serif text-sm ${
                activeTab === 'wyksztalcenie'
                  ? 'bg-brand-primary text-white font-semibold shadow-soft-lift'
                  : 'bg-transparent text-brand-muted hover:bg-brand-card/40 hover:text-brand-primary'
              }`}
            >
              <GraduationCap size={18} />
              Edukacja &amp; Wykształcenie
            </button>
            <button
              onClick={() => setActiveTab('doswiadczenie')}
              className={`flex items-center justify-center sm:justify-start gap-2.5 px-5 py-3 rounded-xl transition-all cursor-pointer font-serif text-sm ${
                activeTab === 'doswiadczenie'
                  ? 'bg-brand-primary text-white font-semibold shadow-soft-lift'
                  : 'bg-transparent text-brand-muted hover:bg-brand-card/40 hover:text-brand-primary'
              }`}
            >
              <Briefcase size={17} />
              Doświadczenie kliniczne
            </button>
            <button
              onClick={() => setActiveTab('szkolenia')}
              className={`flex items-center justify-center sm:justify-start gap-2.5 px-5 py-3 rounded-xl transition-all cursor-pointer font-serif text-sm ${
                activeTab === 'szkolenia'
                  ? 'bg-brand-primary text-white font-semibold shadow-soft-lift'
                  : 'bg-transparent text-brand-muted hover:bg-brand-card/40 hover:text-brand-primary'
              }`}
            >
              <Award size={17} />
              Kursy, Szkolenia i Superwizja
            </button>
          </div>

          {/* Interactive Content Canvas */}
          {/* ZMIANA: Ukrywanie zakładek przez CSS (klasa hidden), aby Googlebot widział cały tekst bez klikania */}
          <div className="relative min-h-[300px]">
              
              {/* TAB 1: WYKSZTAŁCENIE */}
              <motion.div
                animate={{ opacity: activeTab === 'wyksztalcenie' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className={`${activeTab === 'wyksztalcenie' ? 'block' : 'hidden'} flex flex-col gap-6`}
              >
                <div className="relative border-l-2 border-brand-accent/50 pl-6 sm:pl-8 ml-3 py-2 flex flex-col gap-8">
                  <div className="relative">
                    <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-5 h-5 rounded-full bg-brand-secondary border-4 border-brand-bg flex items-center justify-center shadow-xs" />
                    <div>
                      <span className="inline-block px-2 py-0.5 bg-brand-accent/30 text-brand-secondary font-mono text-[10px] font-bold rounded mb-1">
                        Szkolenie Całościowe (4 lata)
                      </span>
                      {/* ZMIANA: h4 zmienione na h3 */}
                      <h3 className="font-serif font-bold text-lg text-brand-primary">
                        Krakowskie Centrum Psychodynamiczne
                      </h3>
                      <p className="text-xs text-brand-muted font-medium mt-0.5">
                        Szkoła Rekomendowana przez Polskie Towarzystwo Psychologiczne
                      </p>
                      <p className="text-sm text-brand-muted font-light mt-2 leading-relaxed">
                        Ukończona czteroletnia, całościowa i zaawansowana szkoła psychoterapii psychodynamicznej. Program szkolenia spełnia wymogi certyfikacyjne i przygotowuje do samodzielnego prowadzenia krótko- i długoterminowej terapii pacjentów z różnorodnymi zmaganiami psychicznymi.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-5 h-5 rounded-full bg-brand-secondary border-4 border-brand-bg flex items-center justify-center shadow-xs" />
                    <div>
                      <span className="inline-block px-2 py-0.5 bg-brand-accent/30 text-brand-secondary font-mono text-[10px] font-bold rounded mb-1">
                        Studia Magisterskie
                      </span>
                      {/* ZMIANA: h4 zmienione na h3 */}
                      <h3 className="font-serif font-bold text-lg text-brand-primary">
                        Uniwersytet Gdański
                      </h3>
                      <p className="text-xs text-brand-muted font-medium mt-0.5">
                        Kierunek: Psychologia, Specjalność: Psychologia Kliniczna
                      </p>
                      <p className="text-sm text-brand-muted font-light mt-2 leading-relaxed">
                        Uzyskanie tytułu magistra psychologii na podstawie obronionej pracy dyplomowej z zakresu klinicznego funkcjonowania jednostki. Studia dostarczyły rzetelnych, akademickich podstaw diagnozy, interwencji kryzysowej oraz psychologii zdrowia.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* TAB 2: DOŚWIADCZENIE */}
              <motion.div
                animate={{ opacity: activeTab === 'doswiadczenie' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className={`${activeTab === 'doswiadczenie' ? 'grid' : 'hidden'} grid-cols-1 md:grid-cols-2 gap-6`}
              >
                <div className="bg-brand-bg p-6 rounded-2xl border border-brand-card/40 flex gap-4 items-start shadow-2xs">
                  <div className="p-3 bg-brand-accent/25 rounded-xl text-brand-secondary shrink-0">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    {/* ZMIANA: h4 zmienione na h3 */}
                    <h3 className="font-serif font-semibold text-brand-primary text-base">
                      Centrum Interwencji Kryzysowej w Gdańsku
                    </h3>
                    <p className="text-xs font-mono text-brand-secondary mt-1">Staż i praca jako Konsultant</p>
                    <p className="text-xs sm:text-sm text-brand-muted font-light leading-relaxed mt-2.5">
                      Pomoc osobom w nagłym, niespodziewanym kryzysie psychicznym, emocjonalnym i rodzinnym. Prowadzenie konsultacji, wsparcie w odzyskiwaniu równowagi psychicznej oraz koordynacja działań pomocowych.
                    </p>
                  </div>
                </div>

                <div className="bg-brand-bg p-6 rounded-2xl border border-brand-card/40 flex gap-4 items-start shadow-2xs">
                  <div className="p-3 bg-brand-accent/25 rounded-xl text-brand-secondary shrink-0">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    {/* ZMIANA: h4 zmienione na h3 */}
                    <h3 className="font-serif font-semibold text-brand-primary text-base">
                      Gdański Ośrodek Pomocy Psychologicznej dla Dzieci i Młodzieży
                    </h3>
                    <p className="text-xs font-mono text-brand-secondary mt-1">Konsultacje i Terapia Indywidualna</p>
                    <p className="text-xs sm:text-sm text-brand-muted font-light leading-relaxed mt-2.5">
                      Praca terapeutyczna z młodzieżą borykającą się z kryzysami okresu dorastania, trudnościami w relacjach rówieśniczych oraz lękami. Prowadzenie konsultacji dla rodziców i opiekunów w celu wspierania procesów wychowawczych.
                    </p>
                  </div>
                </div>

                <div className="bg-brand-bg p-6 rounded-2xl border border-brand-card/40 flex gap-4 items-start shadow-2xs">
                  <div className="p-3 bg-brand-accent/25 rounded-xl text-brand-secondary shrink-0">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    {/* ZMIANA: h4 zmienione na h3 */}
                    <h3 className="font-serif font-semibold text-brand-primary text-base">
                      Wojewódzki Szpital Psychiatryczny im. prof. T. Bilikiewicza
                    </h3>
                    <p className="text-xs font-mono text-brand-secondary mt-1">Kliniczny Staż Oddziałowy (Gdańsk)</p>
                    <p className="text-xs sm:text-sm text-brand-muted font-light leading-relaxed mt-2.5">
                      Praktyka kliniczna na oddziałach ogólnopsychiatrycznych stacjonarnych. Udział w konsyliach lekarsko-terapeutycznych, asystowanie przy badaniach diagnostycznych oraz kooperacja z personelem medycznym.
                    </p>
                  </div>
                </div>

                <div className="bg-brand-bg p-6 rounded-2xl border border-brand-card/40 flex gap-4 items-start shadow-2xs">
                  <div className="p-3 bg-brand-accent/25 rounded-xl text-brand-secondary shrink-0">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    {/* ZMIANA: h4 zmienione na h3 */}
                    <h3 className="font-serif font-semibold text-brand-primary text-base">
                      Stowarzyszenie na rzecz Osób z Kryzysami Psychicznymi „Przyjazna Dłoń”
                    </h3>
                    <p className="text-xs font-mono text-brand-secondary mt-1">Grupy Wsparcia, Terapia Indywidualna i Grupowa</p>
                    <p className="text-xs sm:text-sm text-brand-muted font-light leading-relaxed mt-2.5">
                      Prowadzenie grup wsparcia dla rodzin osób doświadczających kryzysów psychicznych. Obecnie prowadzenie psychoterapii indywidualnej oraz terapii grupowej ukierunkowanej na osoby z zaburzeniami osobowości.
                    </p>
                  </div>
                </div>

                <div className="bg-brand-bg p-6 rounded-2xl border border-brand-card/40 flex gap-4 items-start shadow-2xs">
                  <div className="p-3 bg-brand-accent/25 rounded-xl text-brand-secondary shrink-0">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    {/* ZMIANA: h4 zmienione na h3 */}
                    <h3 className="font-serif font-semibold text-brand-primary text-base">
                      Indywidualna Praktyka Psychoterapeutyczna
                    </h3>
                    <p className="text-xs font-mono text-brand-secondary mt-1">Własny Gabinet Gdańsk</p>
                    <p className="text-xs sm:text-sm text-brand-muted font-light leading-relaxed mt-2.5">
                      Prowadzenie indywidualnej terapii psychodynamicznej dla młodzieży i osób dorosłych. Pomoc w szerokim spektrum zaburzeń emocjonalnych, trudnościach w budowaniu relacji, zaburzeniach osobowości oraz stanach depresyjnych.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* TAB 3: KURSY I SZKOLENIA */}
              <motion.div
                animate={{ opacity: activeTab === 'szkolenia' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className={`${activeTab === 'szkolenia' ? 'flex' : 'hidden'} flex-col gap-6`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Lewa kolumna */}
                  <div className="flex flex-col gap-5">
                    {/* ZMIANA: h4 zmienione na h3 */}
                    <h3 className="font-serif font-semibold text-brand-primary text-base border-b border-brand-card/40 pb-2 mb-1">
                      Główne Certyfikaty &amp; Przynależność
                    </h3>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-brand-secondary shrink-0 mt-0.5" />
                      <div>
                        {/* ZMIANA: h5 zmienione na h4 */}
                        <h4 className="font-serif font-bold text-sm sm:text-base text-brand-primary">Dyplom Psychoterapeuty Psychodynamicznego (KCP)</h4>
                        <p className="text-xs text-brand-muted font-light mt-0.5 leading-relaxed">
                          Czteroletnie całościowe podyplomowe kształcenie szkoleniowe w Krakowskim Centrum Psychodynamicznym, rekomendowane i akredytowane przez Polskie Towarzystwo Psychologiczne.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-brand-secondary shrink-0 mt-0.5" />
                      <div>
                        {/* ZMIANA: h5 zmienione na h4 */}
                        <h4 className="font-serif font-bold text-sm sm:text-base text-brand-primary">Aktywne Członkostwo w PTPPd</h4>
                        <p className="text-xs text-brand-muted font-light mt-0.5 leading-relaxed">
                          Przynależność do Polskiego Towarzystwa Psychoterapii Psychodynamicznej (PTPPd). Stałe podnoszenie kwalifikacji i udział w zebraniach szkoleniowych Oddziału Pomorskiego.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-brand-secondary shrink-0 mt-0.5" />
                      <div>
                        {/* ZMIANA: h5 zmienione na h4 */}
                        <h4 className="font-serif font-bold text-sm sm:text-base text-brand-primary">Systematyczna Superwizja Kliniczna (PTP / KCP)</h4>
                        <p className="text-xs text-brand-muted font-light mt-0.5 leading-relaxed">
                          Prowadzenie procesów psychoterapii pod stałą, certyfikowaną superwizją u superwizorów rekomendowanych przez Polskie Towarzystwo Psychologiczne oraz Krakowskie Centrum Psychodynamiczne.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Prawa kolumna */}
                  <div className="flex flex-col gap-5">
                    {/* ZMIANA: h4 zmienione na h3 */}
                    <h3 className="font-serif font-semibold text-brand-primary text-base border-b border-brand-card/40 pb-2 mb-1">
                      Szkolenia Specjalistyczne &amp; Warsztaty
                    </h3>

                    <div className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-brand-secondary shrink-0 mt-0.5" />
                      <div>
                        {/* ZMIANA: h5 zmienione na h4 */}
                        <h4 className="font-serif font-bold text-sm sm:text-base text-brand-primary">Psychoterapia dziecięca i wczesna interwencja</h4>
                        <p className="text-xs text-brand-muted font-light mt-0.5 leading-relaxed">
                          Szkolenia specjalistyczne dedykowane pracy terapeutycznej z najmłodszymi:<br />
                          • <strong>Setting w pudełku</strong> – psychoterapia psychodynamiczna dzieci (Ośrodek Mały Książę)<br />
                          • <strong>Poza zasadą zabawy</strong> – zabawa w psychoterapii dzieci (Ośrodek Mały Książę)<br />
                          • <strong>Problematyka wczesnej interwencji</strong> i zdrowia psychicznego małych dzieci (Instytut Matki i Dziecka)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-brand-secondary shrink-0 mt-0.5" />
                      <div>
                        {/* ZMIANA: h5 zmienione na h4 */}
                        <h4 className="font-serif font-bold text-sm sm:text-base text-brand-primary">Interwencja Kryzysowa w Praktyce (Gdańsk CIK)</h4>
                        <p className="text-xs text-brand-muted font-light mt-0.5 leading-relaxed">
                          Ukończone zaawansowane szkolenia z zakresu diagnozy i pomocy psychologicznej dla osób w nagłych kryzysach życiowych, emocjonalnych oraz po doświadczeniu traumy.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-brand-secondary shrink-0 mt-0.5" />
                      <div>
                        {/* ZMIANA: h5 zmienione na h4 */}
                        <h4 className="font-serif font-bold text-sm sm:text-base text-brand-primary">Zapobieganie samobójstwom dzieci i młodzieży</h4>
                        <p className="text-xs text-brand-muted font-light mt-0.5 leading-relaxed">
                          Szkolenia i warsztaty metodyczne poświęcone zapobieganiu autoagresji i wsparciu nastolatków oraz dzieci w kryzysie autodestrukcyjnym i suicydalnym.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-brand-secondary shrink-0 mt-0.5" />
                      <div>
                        {/* ZMIANA: h5 zmienione na h4 */}
                        <h4 className="font-serif font-bold text-sm sm:text-base text-brand-primary">Praca z pacjentem po stracie, w żałobie i kryzysach adaptacyjnych</h4>
                        <p className="text-xs text-brand-muted font-light mt-0.5 leading-relaxed">
                          Certyfikowany warsztat specjalistyczny ukierunkowany na łagodzenie procesów żałoby i adaptacji do głębokich kryzysów ról życiowych i rodzinnych.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-brand-secondary shrink-0 mt-0.5" />
                      <div>
                        {/* ZMIANA: h5 zmienione na h4 */}
                        <h4 className="font-serif font-bold text-sm sm:text-base text-brand-primary">Leczenie lęków i depresji oraz Sympozja o Zaburzeniach Osobowości</h4>
                        <p className="text-xs text-brand-muted font-light mt-0.5 leading-relaxed">
                          Ukończone bloki szkoleniowe z zakresu terapii lęku uogólnionego, stanów depresyjnych oraz udział w cyklicznych konferencjach naukowych dot. zaburzeń borderline i narcyzmu.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="bg-brand-accent/20 border border-brand-accent/55 p-4 rounded-xl text-xs text-brand-muted mt-4 leading-relaxed flex items-center gap-3">
                  <Sparkles size={18} className="text-brand-secondary shrink-0" />
                  <span>
                    Moja praktyka psychoterapeutyczna jest całkowicie zgodna ze standardami etycznymi oraz zaleceniami zawartymi w Kodeksie Etycznym Psychoterapeuty Polskiego Towarzystwa Psychoterapii Psychodynamicznej.
                  </span>
                </div>
              </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
