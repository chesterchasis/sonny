import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Datos del Portafolio ---
const projectData = [
  { id: 1, imgSrc: `${import.meta.env.BASE_URL}img/porfolio1.jpg` },
  { id: 2, imgSrc: `${import.meta.env.BASE_URL}img/porfolio2.jpg` },
  { id: 3, imgSrc: `${import.meta.env.BASE_URL}img/porfolio3.jpg` },
];

// --- Traducciones (Inglés y Eslovaco) ---
const translations = {
  en: {
    nav: { home: 'HOME', about: 'ABOUT', portfolio: 'GALLERY', contact: 'CONTACT' },
    hero: { greeting: "Hi, I'm Sonia", subtitle: "Digital Artist & Graphic Designer" },
    about: {
      title: 'The Muse',
      p1: 'I believe in the quiet power of the digital canvas—where intentional strokes meet the tactile soul of traditional media. My work is a bridge between the precision of pixels and the beautiful imperfection of a graphite sketch.',
      p2: 'Based in the digital ether, I curate experiences that prioritize intellectual depth and visual calm. Every project is an exploration of grid tension, modern editorial flair, and the delicate dance of high-contrast typography.',
      cta: 'READ THE FULL STORY'
    },
    portfolio: { title: 'Curated Gallery', subtitle: 'SELECTED WORKS' },
    itemDetails: {
      1: { title: "Ephemeral Flow", desc: "DIGITAL PAINTING" },
      2: { title: "Grid Tension", desc: "EDITORIAL DESIGN" },
      3: { title: "Digital Soul", desc: "ILLUSTRATION" },
    },
    process: {
      title: 'The Alchemy',
      step1Title: 'The Spark', step1Desc: 'Everything begins with a visceral reaction. A word, a shadow, a fleeting thought captured in its rawest form. I start with physical media to ground the idea in reality before it migrates to the digital realm.',
      step2Title: 'The Execution', step2Desc: 'This is where structure meets soul. I refine the chaos using strict grids and deliberate color palettes. Every pixel is placed with intention, ensuring the final piece maintains the breath of the original sketch while embracing digital clarity.'
    },
    contact: {
      title: "Have a vision in mind?", subtitle: "LET'S CREATE",
      mail: 'kortisova.sona2008@gmail.com', cta: "SEND INQUIRY",
      placeholder: 'YOUR EMAIL'
    },
    footer: { copy: '© 2024 DIGITAL ARTIST STUDIO. ALL RIGHTS RESERVED.' },
  },
  sk: {
    nav: { home: 'DOMOV', about: 'O MNE', portfolio: 'GALÉRIA', contact: 'KONTAKT' },
    hero: { greeting: 'Ahoj, som Sonia', subtitle: 'Digitálna umelkyňa a grafická dizajnérka' },
    about: {
      title: 'Múza',
      p1: 'Verím v tichú silu digitálneho plátna – kde sa zámerné ťahy stretávajú s hmatateľnou dušou tradičných médií. Moja práca je mostom medzi presnosťou pixelov a krásnou nedokonalosťou grafitovej skice.',
      p2: 'Vychádzajúc z digitálneho éteru vytváram zážitky, ktoré uprednostňujú intelektuálnu hĺbku a vizuálny pokoj. Každý projekt je skúmaním napätia mriežky, moderného redakčného štýlu a jemného tanca vysoko kontrastnej typografie.',
      cta: 'ČÍTAŤ CELÝ PRÍBEH'
    },
    portfolio: { title: 'Vybraná galéria', subtitle: 'VYBRANÉ PRÁCE' },
    itemDetails: {
      1: { title: "Pominuteľný tok", desc: "DIGITÁLNA MAĽBA" },
      2: { title: "Napätie mriežky", desc: "REDAKČNÝ DIZAJN" },
      3: { title: "Digitálna duša", desc: "ILUSTRÁCIA" },
    },
    process: {
      title: 'Alchýmia',
      step1Title: 'Iskra', step1Desc: 'Všetko začína viscerálnou reakciou. Slovo, tieň, prchavá myšlienka zachytená v najsurovejšej podobe. Začínam s fyzickými médiami, aby som ukotvila myšlienku v realite predtým, ako prejde do digitálnej sféry.',
      step2Title: 'Realizácia', step2Desc: 'Tu sa štruktúra stretáva s dušou. Zjemňujem chaos pomocou prísnych mriežok a premyslených farebných paliet. Každý pixel je umiestnený zámerne, čím sa zabezpečí, že výsledné dielo si zachováva dych pôvodnej skice a zároveň využíva digitálnu čistotu.'
    },
    contact: {
      title: "Máte na mysli víziu?", subtitle: "TVORME SPOLU",
      mail: 'kortisova.sona2008@gmail.com', cta: "POSLAŤ DOPYT",
      placeholder: 'VÁŠ EMAIL'
    },
    footer: { copy: '© 2024 DIGITAL ARTIST STUDIO. VŠETKY PRÁVA VYHRADENÉ.' },
  }
};


export default function App() {
  const [lang, setLang] = useState('en');
  const [activeSection, setActiveSection] = useState('hero');
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'gallery', 'about', 'process', 'contact'];
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.clientHeight;
          if (window.scrollY >= top - height / 3) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-surface text-on-background font-body-md selection:bg-tertiary-fixed selection:text-on-tertiary-fixed relative">
      <div className="noise-overlay"></div>
      
      {/* Header Navigation Shell */}
      <header className="bg-surface/60 dark:bg-surface-container/60 backdrop-blur-[32px] text-primary dark:text-on-primary-fixed fixed top-0 w-full z-50 border-b border-outline-variant/30 flex justify-between items-center px-margin-mobile h-20">
        <span className="font-headline-md text-headline-md tracking-tighter text-primary dark:text-on-primary-fixed cursor-pointer" onClick={() => scrollToSection('hero')}>
          STUDIO
        </span>
        <div className="flex items-center gap-unit-4">
          <button onClick={() => setLang(lang === 'en' ? 'sk' : 'en')} className="font-label-caps text-label-caps border border-primary px-3 py-1 rounded hover:bg-primary hover:text-on-primary transition-all">
            {lang === 'en' ? 'SK' : 'EN'}
          </button>
          <span className="material-symbols-outlined text-primary transition-opacity duration-300 hover:opacity-70 cursor-pointer">menu</span>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[795px] flex flex-col items-center justify-center px-margin-mobile overflow-hidden" id="hero">
          <div className="ink-splash absolute top-[-10%] right-[-10%] w-80 h-80 bg-[#ffdad9] opacity-60"></div>
          <div className="ink-splash absolute bottom-[10%] left-[-20%] w-96 h-96 bg-[#e1dfdd] opacity-40"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative mb-unit-8">
              <div className="absolute inset-0 border border-outline-variant rotate-[3deg] translate-x-2 translate-y-2 -z-10"></div>
              <div className="w-64 h-80 glass-card overflow-hidden p-unit-2">
                <img alt="Sonia Portrait" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" src={`${import.meta.env.BASE_URL}img/digitalart.jpg`} onError={(e) => e.target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBysIa6J9kRfrmlWztMLmPjzbq_kYAIS_HX-uXPeOWGC8_BjhO_DEha0nqyHxUG4dWWlhVmIlRL7WoTkbv79T6_nCmYObTV42JyTTyS6I7ajOIqQjTaHnh_vBVwR6I2dMGzV6UdFcCVaHeRL5orcdcGl998qDWfJvUE5Ewy_V3_6w50376ebf8uhWHOqhYSaSlFra30u4omvtirHpMIgVsNwmmmSeQ4RLWftQyo9Un6JoUooQVIiZN6vvGBn9uuxt4U_KBNZk8iVpY'}/>
              </div>
            </div>
            <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg leading-tight mb-unit-4 text-primary">
              {t.hero.greeting}
            </h1>
            <p className="font-label-caps text-label-caps text-secondary tracking-[0.2em] uppercase">{t.hero.subtitle}</p>
          </div>
        </section>

        {/* Portfolio Gallery */}
        <section className="bg-surface-container-low py-section-gap" id="gallery">
          <div className="px-margin-mobile mb-unit-8 max-w-container-max mx-auto">
            <p className="font-label-caps text-label-caps text-secondary mb-unit-2">{t.portfolio.subtitle}</p>
            <h2 className="font-headline-lg text-headline-lg-mobile text-primary">{t.portfolio.title}</h2>
          </div>
          <div className="flex overflow-x-auto scroll-hide gap-unit-6 px-margin-mobile pb-unit-8">
            {projectData.map((project, index) => {
              const details = t.itemDetails[project.id] || { title: "Artwork", desc: "DIGITAL" };
              return (
                <div key={project.id} className="flex-none w-[80vw] md:w-[400px] group cursor-pointer relative">
                  <div className={`absolute inset-0 border border-outline-variant ${index % 2 === 0 ? '-rotate-2' : 'rotate-1'} -z-10 group-hover:rotate-0 transition-transform duration-500`}></div>
                  <div className="aspect-[4/3] overflow-hidden relative glass-card p-2">
                    <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src={project.imgSrc} alt={details.title} onError={(e) => e.target.src = 'https://placehold.co/800x600/cccccc/999999?text=Artwork&font=playfair'}/>
                    <div className="absolute inset-0 bg-tertiary-container/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-unit-4 text-center">
                      <h3 className="font-headline-md text-headline-md text-on-tertiary-fixed">{details.title}</h3>
                      <p className="font-label-caps text-label-caps text-on-tertiary-fixed/70 mt-unit-2">{details.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* About Me Section */}
        <section className="py-section-gap px-margin-mobile max-w-container-max mx-auto" id="about">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-unit-8 items-start">
            <div className="md:col-span-4">
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary border-b border-outline-variant pb-unit-4 mb-unit-4">{t.about.title}</h2>
            </div>
            <div className="md:col-span-8 space-y-unit-6">
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                {t.about.p1}
              </p>
              <p className="font-body-md text-body-md text-secondary">
                {t.about.p2}
              </p>
              <div className="pt-unit-4">
                <button className="border border-primary px-unit-6 py-unit-3 font-label-caps text-label-caps hover:bg-primary hover:text-on-primary transition-all duration-500">
                  {t.about.cta}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* My Process Section */}
        <section className="py-section-gap px-margin-mobile" id="process">
          <div className="max-w-container-max mx-auto">
            <h2 className="font-headline-lg text-headline-lg-mobile text-primary text-center mb-section-gap/2">{t.process.title}</h2>
            <div className="space-y-unit-8 relative">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center gap-unit-6 relative">
                <div className="w-full md:w-1/2 overflow-hidden border border-outline-variant p-2 rotate-[-1deg]">
                  <img className="w-full h-64 object-cover filter contrast-125 brightness-90" src={`${import.meta.env.BASE_URL}img/miproceso1.jpg`} alt={t.process.step1Title} onError={(e) => e.target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYdGojbNeH6TRKHLkdieGj9v37qBwUleI0WKgu1sXt9Z-_c-jmyUsrakCqSr04P983AoQTmdZ-eg7Zza6r7XFqj0r8stzdMU3r_Qgn2t1F860gxTesxxKju1QMS1OWGm3zaWz6iZuBM-k8sTHybKYC_-L3lF0k4ASTdem1XuNdgyyzA-BCyE9ccITcBaDf86_RCsaje5Qxs87smvscttfvoYn1tBPXoUIUQfTC7vb9OoChaOT8sjmxabjzO6VGGgpxj0vIQ0SAdX8'}/>
                </div>
                <div className="w-full md:w-1/2">
                  <span className="font-label-caps text-label-caps text-primary block mb-unit-2">PHASE 01</span>
                  <h3 className="font-headline-md text-headline-md mb-unit-4">{t.process.step1Title}</h3>
                  <p className="text-secondary font-body-md">{t.process.step1Desc}</p>
                </div>
              </div>
              {/* Visual Connector */}
              <div className="hidden md:block h-20 w-px bg-outline-variant/30 mx-auto"></div>
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-unit-6 relative">
                <div className="w-full md:w-1/2 overflow-hidden border border-outline-variant p-2 rotate-[1deg]">
                  <img className="w-full h-64 object-cover" src={`${import.meta.env.BASE_URL}img/miproceso2.jpg`} alt={t.process.step2Title} onError={(e) => e.target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRSQUseLNK6VpNuptdM_-x3RGyhFw58z76fKAxzpnFC18CoJz2mNQp_cvdAw-i_1Jdaw4reI5gC7cbkPxKLewCldjTtHLttGJEZm5Eu2NHeeV7y6CsvyGmeWwMax0FQqPSDU-0D7UrulamVnMW1qebJMvn7_ECRxJu97Cj62anV4q4oroyCjPFqHDqM03KzmevE8_ANJC_kFUCTPwlch-gPczBBo-quMZf1UGuH1hA32uC6Ihz0LWN76BLVX1ElkwIdkoBk_rHX68'}/>
                </div>
                <div className="w-full md:w-1/2 text-left md:text-right">
                  <span className="font-label-caps text-label-caps text-primary block mb-unit-2">PHASE 02</span>
                  <h3 className="font-headline-md text-headline-md mb-unit-4">{t.process.step2Title}</h3>
                  <p className="text-secondary font-body-md">{t.process.step2Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-surface-container py-section-gap px-margin-mobile" id="contact">
          <div className="max-w-xl mx-auto text-center">
            <p className="font-label-caps text-label-caps text-primary mb-unit-4">{t.contact.subtitle}</p>
            <h2 className="font-headline-lg text-headline-lg-mobile text-primary mb-unit-8">{t.contact.title}</h2>
            <div className="space-y-unit-6 mb-unit-12">
              <div className="group border-b border-outline-variant pb-unit-2">
                <input className="w-full bg-transparent border-none focus:ring-0 text-center font-headline-md text-headline-md placeholder:text-outline/40" placeholder={t.contact.placeholder} type="email" />
              </div>
            </div>
            <a className="inline-block border border-primary px-unit-10 py-unit-4 font-label-caps text-label-caps hover:bg-primary hover:text-on-primary transition-all duration-500 mb-unit-8" href={`mailto:${t.contact.mail}`}>
              {t.contact.cta}
            </a>
            <div className="flex justify-center gap-unit-6">
              <a className="font-label-caps text-label-caps text-secondary hover:text-primary transition-colors" href="https://www.instagram.com/sonia._.artwork?igsh=MTc4NTJjZjF1ZTF6aw==" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
              <a className="font-label-caps text-label-caps text-secondary hover:text-primary transition-colors" href="#">BEHANCE</a>
              <a className="font-label-caps text-label-caps text-secondary hover:text-primary transition-colors" href="#">LINKEDIN</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Shell */}
      <footer className="bg-surface dark:bg-surface-container w-full py-unit-8 border-t border-outline-variant flex flex-col items-center gap-unit-4 px-margin-mobile mb-16">
        <span className="font-headline-md text-headline-md text-primary">STUDIO</span>
        <div className="flex gap-unit-4">
          <a className="font-label-caps text-label-caps text-secondary dark:text-secondary-fixed hover:text-primary transition-all" href="https://www.instagram.com/sonia._.artwork?igsh=MTc4NTJjZjF1ZTF6aw==" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
          <a className="font-label-caps text-label-caps text-secondary dark:text-secondary-fixed hover:text-primary transition-all" href="#">BEHANCE</a>
          <a className="font-label-caps text-label-caps text-secondary dark:text-secondary-fixed hover:text-primary transition-all" href="#">LINKEDIN</a>
        </div>
        <p className="font-label-caps text-label-caps text-secondary/50 text-center">{t.footer.copy}</p>
      </footer>

      {/* Bottom Nav Bar Shell */}
      <nav className="bg-surface/60 dark:bg-surface-container/60 backdrop-blur-[32px] fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-margin-mobile border-t border-outline-variant/30 md:hidden">
        <button onClick={() => scrollToSection('hero')} className={`${activeSection === 'hero' ? 'text-primary dark:text-on-primary-fixed scale-110' : 'text-secondary/50 dark:text-secondary-fixed-dim/50'} hover:text-primary dark:hover:text-on-primary-fixed transition-colors active:scale-95 transition-transform duration-200`}>
          <span className="material-symbols-outlined">grid_view</span>
        </button>
        <button onClick={() => scrollToSection('gallery')} className={`${activeSection === 'gallery' ? 'text-primary dark:text-on-primary-fixed scale-110' : 'text-secondary/50 dark:text-secondary-fixed-dim/50'} hover:text-primary dark:hover:text-on-primary-fixed transition-colors active:scale-95 transition-transform duration-200`}>
          <span className="material-symbols-outlined">brush</span>
        </button>
        <button onClick={() => scrollToSection('about')} className={`${activeSection === 'about' ? 'text-primary dark:text-on-primary-fixed scale-110' : 'text-secondary/50 dark:text-secondary-fixed-dim/50'} hover:text-primary dark:hover:text-on-primary-fixed transition-colors active:scale-95 transition-transform duration-200`}>
          <span className="material-symbols-outlined">account_circle</span>
        </button>
        <button onClick={() => scrollToSection('process')} className={`${activeSection === 'process' ? 'text-primary dark:text-on-primary-fixed scale-110' : 'text-secondary/50 dark:text-secondary-fixed-dim/50'} hover:text-primary dark:hover:text-on-primary-fixed transition-colors active:scale-95 transition-transform duration-200`}>
          <span className="material-symbols-outlined">auto_awesome</span>
        </button>
        <button onClick={() => scrollToSection('contact')} className={`${activeSection === 'contact' ? 'text-primary dark:text-on-primary-fixed scale-110' : 'text-secondary/50 dark:text-secondary-fixed-dim/50'} hover:text-primary dark:hover:text-on-primary-fixed transition-colors active:scale-95 transition-transform duration-200`}>
          <span className="material-symbols-outlined">mail</span>
        </button>
      </nav>
      
      {/* Desktop Side Nav or additional nav logic could go here */}
      <nav className="hidden md:flex bg-surface/60 dark:bg-surface-container/60 backdrop-blur-[32px] fixed top-0 right-0 h-20 items-center justify-end px-margin-mobile z-50 mr-16">
        <div className="flex gap-unit-6">
           <button onClick={() => scrollToSection('gallery')} className={`${activeSection === 'gallery' ? 'text-primary font-bold' : 'text-secondary'} font-label-caps text-label-caps hover:text-primary transition-colors`}>{t.nav.portfolio}</button>
           <button onClick={() => scrollToSection('about')} className={`${activeSection === 'about' ? 'text-primary font-bold' : 'text-secondary'} font-label-caps text-label-caps hover:text-primary transition-colors`}>{t.nav.about}</button>
           <button onClick={() => scrollToSection('contact')} className={`${activeSection === 'contact' ? 'text-primary font-bold' : 'text-secondary'} font-label-caps text-label-caps hover:text-primary transition-colors`}>{t.nav.contact}</button>
        </div>
      </nav>
    </div>
  );
}
