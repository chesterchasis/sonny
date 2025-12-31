import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// IMPORTACIÓN ELIMINADA: Ya no usamos react-scroll
// import { Link as ScrollLink } from 'react-scroll'; 
// IMPORTACIÓN AÑADIDA: Para los iconos
import { Home, User, GalleryVerticalEnd, Mail, Instagram, MessageCircle } from 'lucide-react';

// --- Datos del Portafolio (Separados de las traducciones) ---
// NOTA: Cambia estas URLs por tus imágenes locales, ej: '/img/proyecto-1.jpg'
// Coloca esas imágenes en la carpeta `public/img/` de tu proyecto Vite.
const projectData = [
  { id: 1, imgSrc: "/img/portfolio-1.jpg" },
  { id: 2, imgSrc: "/img/portfolio-2.jpg" },
  { id: 3, imgSrc: "/img/portfolio-3.jpg" },
  { id: 4, imgSrc: "/img/portfolio-4.jpg" },
  { id: 5, imgSrc: "/img/portfolio-5.jpg" },
  { id: 6, imgSrc: "/img/portfolio-6.jpg" },
];

// --- Traducciones (Inglés y Eslovaco) ---
const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Me',
      portfolio: 'Portfolio',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm Sonia 🎨",
      subtitle: "Graphic design student and visual art lover.",
      cta: "View my work",
    },
    about: {
      title: 'About Me',
      p1: 'I am a Graphic Design student at the <strong>High School of Visual Arts</strong>. I am passionate about digital illustration, typography, and how vivid colors can tell a story.',
      p2: 'I am currently exploring new drawing techniques and design software. My goal is to keep learning and create projects that inspire and connect with people.',
    },
    portfolio: {
      title: 'Portfolio',
      subtitle: 'A selection of my favorite works.',
      modalClose: 'Close',
      // Detalles de los items (solo texto)
      itemDetails: {
        1: { title: "Floral Portrait", desc: "Digital illustration (Procreate). A piece exploring the blend of nature and human form." },
        2: { title: "Hands", desc: "Graphite drawing (Traditional). A study on light, shadow, and anatomy." },
        3: { title: "Poster Design", desc: "School project (Typography). Created for a fictional music festival, focusing on bold type." },
        4: { title: "Coffee Shop", desc: "Scene (Illustrator). A vector illustration capturing a cozy atmosphere." },
        5: { title: "Branding", desc: "School project (Logo). Identity design for a conceptual eco-friendly brand." },
        6: { title: "Sketches", desc: "Character study (Traditional). Exploring expressions and forms for a personal project." },
      }
    },
    process: {
      title: 'My Process',
      subtitle: 'Here I share part of my process and what inspires me to create.',
      alt1: 'Quick sketch in a notebook',
      alt2: 'Color palette test',
      alt3: 'Digital lineart on a tablet',
    },
    contact: {
      title: 'Let\'s connect!',
      subtitle: 'Interested in collaborating or just want to chat? Contact me via my email or social media. 💌',
      mail: 'sonia.designs@gmail.com',
      ariaInsta: 'Instagram',
      ariaTiktok: 'TikTok', // Usamos MessageCircle para este
      ariaMail: 'Email',
    },
    footer: {
      copy: '© 2025 SoniaArt. All rights reserved.',
    },
  },
  sk: {
    nav: {
      home: 'Domov',
      about: 'O mne',
      portfolio: 'Portfólio',
      contact: 'Kontakt',
    },
    hero: {
      greeting: 'Ahoj, som Sonia 🎨',
      subtitle: 'Študentka grafického dizajnu a milovníčka vizuálneho umenia.',
      cta: 'Pozri moju prácu',
    },
    about: {
      title: 'O mne',
      p1: 'Som študentka grafického dizajnu na <strong>Strednej škole vizuálneho umenia</strong>. Mojou vášňou je digitálna ilustrácia, typografia a to, ako živé farby dokážu rozprávať príbeh.',
      p2: 'Momentálne objavujem nové techniky kreslenia a dizajnový softvér. Mojím cieľom je naďalej sa učiť a vytvárať projekty, ktoré inšpirujú a spájajú ľudí.',
    },
    portfolio: {
      title: 'Portfólio',
      subtitle: 'Výber mojich obľúbených prác.',
      modalClose: 'Zavrieť',
      itemDetails: {
        1: { title: "Kvetinový portrét", desc: "Digitálna ilustrácia (Procreate). Dielo skúmajúce spojenie prírody a ľudskej podoby." },
        2: { title: "Ruky", desc: "Kresba grafitom (Tradičná). Štúdia svetla, tieňa a anatómie." },
        3: { title: "Dizajn plagátu", desc: "Školský projekt (Typografia). Vytvorené pre fiktívny hudobný festival so zameraním na výrazné písmo." },
        4: { title: "Kaviareň", desc: "Scéna (Illustrator). Vektorová ilustrácia zachytávajúca útulnú atmosféru." },
        5: { title: "Branding", desc: "Školský projekt (Logo). Návrh identity pre koncepčnú ekologickú značku." },
        6: { title: "Skice", desc: "Štúdia postáv (Tradičná). Skúmanie výrazov a foriem pre osobný projekt." },
      }
    },
    process: {
      title: 'Môj proces',
      subtitle: 'Tu zdieľam časť môjho procesu a čo ma inšpiruje k tvorbe.',
      alt1: 'Rýchla skica v zošite',
      alt2: 'Test farebnej palety',
      alt3: 'Digitálny lineart na tablete',
    },
    contact: {
      title: 'Spojme sa!',
      subtitle: 'Máte záujem o spoluprácu alebo sa chcete len porozprávať? Kontaktujte ma e-mailom alebo sociálnych sieťach. 💌',
      mail: 'sonia.designs@gmail.com',
      ariaInsta: 'Instagram',
      ariaTiktok: 'TikTok',
      ariaMail: 'Email',
    },
    footer: {
      copy: '© 2025 SoniaArt. Všetky práva vyhradené.',
    },
  },
};

// --- Componente de Estilos Globales ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@300;400;600&display=swap');
    body {
      font-family: 'Poppins', sans-serif;
      background-color: #FFFFFF; /* Fondo blanco puro */
      color: #1A1A1A; /* Color de texto principal casi negro */
    }
    h1, h2, h3, h4, h5, h6, .font-playfair {
      font-family: 'Playfair Display', serif;
    }
    
    /* Configuración de scroll suave y scrollbar personalizada */
    html {
      scroll-padding-top: 80px; /* Ajuste para el header fijo */
      scrollbar-width: thin;
      scrollbar-color: #666666 #F3F4F6;
    }
    
    /* Personalización de scrollbar para webkit (Chrome, Safari, etc.) */
    ::-webkit-scrollbar {
      width: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: #F3F4F6;
    }
    
    ::-webkit-scrollbar-thumb {
      background-color: #666666;
      border-radius: 4px;
      transition: all 0.3s ease;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background-color: #444444;
    }
    
    /* Clase para desvanecer bordes de imagen (degradado más amplio) */
    .fade-image-edges {
      -webkit-mask-image: radial-gradient(circle, black 65%, transparent 100%);
      mask-image: radial-gradient(circle, black 65%, transparent 100%);
    }

    /* --- Animación de Scroll Infinito --- */
    @keyframes infinite-scroll {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    
    .animate-infinite-scroll {
      animation: infinite-scroll 40s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
    }

    .hover\:pause-animation:hover {
      animation-play-state: paused;
      transition: transform 0.3s ease;
      transform: scale(0.99);
    }
    
    .nav-link {
      @apply text-[#1A1A1A] hover:text-[#000000] transition-colors duration-200 cursor-pointer py-2;
    }
    .nav-link.active {
      /* Este 'active' es manejado por react-scroll, pero lo dejamos por si acaso */
      @apply text-[#000000] font-semibold;
    }
    
  `}</style>
);

// --- Componente Modal del Portafolio (Nuevo) ---
const PortfolioModal = ({ project, details, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      ></motion.div>

      {/* Contenido del Modal */}
      <motion.div
        className="relative z-10 w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 z-20"
          aria-label={details.modalClose}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="grid md:grid-cols-2">
          {/* Imagen */}
          <div className="bg-gray-100 flex items-center justify-center">
            <img
              src={project.imgSrc}
              alt={details.title}
              className="w-full h-full object-cover max-h-[80vh]"
              onError={(e) => e.target.src = 'https://placehold.co/800x600/cccccc/999999?text=Image+Not+Found&font=poppins'}
            />
          </div>
          {/* Detalles */}
          <div className="p-8 flex flex-col justify-center">
            <h3 className="text-3xl font-['Playfair_Display'] font-bold text-gray-900 mb-4">{details.title}</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {details.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


// --- Componente Principal de la App ---
export default function App() {
  const [lang, setLang] = useState('en'); // 'en' o 'sk'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); // Para el modal

  const t = translations[lang]; // Objeto de traducción actual

  // Variantes de animación para Framer Motion
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedProject]);

  // Función de scroll suave mejorada con animación personalizada
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      const duration = 1000; // Duración en ms (1.5 segundos)
      const start = window.pageYOffset;
      const distance = offsetPosition - start;
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Función de easing para un movimiento más suave
        const easing = t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

        window.scrollTo(0, start + (distance * easing(progress)));

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
    }
  };

  // Efecto para manejar el scroll suave en la carga inicial si hay hash en la URL
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    }
  }, []);

  const LangButton = ({ code, children }) => (
    <button
      onClick={() => setLang(code)}
      className={`font-medium ${lang === code ? 'text-[#000000] font-bold' : 'text-gray-500 hover:text-gray-900'}`}
    >
      {children}
    </button>
  );

  return (
    // CAMBIO: Eliminado HelmetProvider
    <>
      <GlobalStyles />
      {/* CAMBIO: Eliminado Helmet */}

      {/* ====== Header / Navbar ====== */}
      <header className="fixed top-0 left-0 w-full bg-white bg-opacity-90 backdrop-blur-md shadow-sm z-50 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            {/* Logo */}
            {/* CAMBIO: Usando <a> con onClick */}
            <a
              onClick={() => scrollToSection('inicio')}
              className="text-3xl font-['Playfair_Display'] font-bold text-[#1A1A1A] cursor-pointer"
            >
              Sonia<span className="text-[#000000]">Art</span>
            </a>

            {/* Menú de escritorio */}
            <div className="hidden md:flex items-center space-x-8">
              {/* CAMBIO: Usando <a> con onClick */}
              <a onClick={() => scrollToSection('inicio')} className="nav-link">{t.nav.home}</a>
              <a onClick={() => scrollToSection('sobre-mi')} className="nav-link">{t.nav.about}</a>
              <a onClick={() => scrollToSection('portafolio')} className="nav-link">{t.nav.portfolio}</a>
              <a onClick={() => scrollToSection('contacto')} className="nav-link">{t.nav.contact}</a>

              <div className="flex space-x-2 pl-4">
                <LangButton code="en">EN</LangButton>
                <span className="text-gray-300">|</span>
                <LangButton code="sk">SK</LangButton>
              </div>
            </div>

            {/* Botón de Menú Móvil */}
            {/* CAMBIO: Lógica de animación del menú móvil */}
            <div className="md:hidden flex items-center space-x-2">
              <AnimatePresence mode="wait">
                {!isMenuOpen ? (
                  // Estado 1: Menú CERRADO. Muestra botones de idioma
                  <motion.div
                    key="lang"
                    // CAMBIO: Animación más suave
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="flex items-center space-x-2"
                  >
                    <LangButton code="en">EN</LangButton>
                    <span className="text-gray-300">|</span>
                    <LangButton code="sk">SK</LangButton>
                  </motion.div>
                ) : (
                  // Estado 2: Menú ABIERTO. Muestra iconos de navegación
                  <motion.div
                    key="icons"
                    // CAMBIO: Animación más suave (misma dirección)
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="flex items-center space-x-4"
                  >
                    {/* CAMBIO: Usando <a> con onClick */}
                    <a onClick={() => { scrollToSection('inicio'); setIsMenuOpen(false); }} className="text-[#1A1A1A] hover:text-[#000000] cursor-pointer" aria-label={t.nav.home}>
                      <Home className="w-6 h-6" strokeWidth={1.5} />
                    </a>
                    {/* CAMBIO: Usando <a> con onClick */}
                    <a onClick={() => { scrollToSection('sobre-mi'); setIsMenuOpen(false); }} className="text-[#1A1A1A] hover:text-[#000000] cursor-pointer" aria-label={t.nav.about}>
                      <User className="w-6 h-6" strokeWidth={1.5} />
                    </a>
                    {/* CAMBIO: Usando <a> con onClick */}
                    <a onClick={() => { scrollToSection('portafolio'); setIsMenuOpen(false); }} className="text-[#1A1A1A] hover:text-[#000000] cursor-pointer" aria-label={t.nav.portfolio}>
                      <GalleryVerticalEnd className="w-6 h-6" strokeWidth={1.5} />
                    </a>
                    {/* CAMBIO: Usando <a> con onClick */}
                    <a onClick={() => { scrollToSection('contacto'); setIsMenuOpen(false); }} className="text-[#1A1A1A] hover:text-[#000000] cursor-pointer" aria-label={t.nav.contact}>
                      <Mail className="w-6 h-6" strokeWidth={1.5} />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icono de Hamburguesa / Cerrar */}
              <button onClick={() => setIsMenuOpen(is => !is)} className="text-[#1A1A1A] focus:outline-none z-10">
                <AnimatePresence mode="wait">
                  {!isMenuOpen ? (
                    <motion.svg
                      key="hamburger"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                      className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="close"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                      className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </motion.svg>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* CAMBIO: Eliminado el menú lateral de emojis/iconos */}

      <main>

        {/* ====== Sección Hero ====== */}
        <motion.section
          id="inicio"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="min-h-screen flex items-center pt-24 md:pt-0" // Añadido padding top para móvil
        >
          <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between">
            {/* Texto Hero */}
            <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
              <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-[#1A1A1A] mb-4">
                {t.hero.greeting}
              </h1>
              <p className="text-xl md:text-2xl text-[#4A4A4A] mb-8">
                {t.hero.subtitle}
              </p>
              {/* CAMBIO: Usando <a> con onClick para el botón CTA */}
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <a
                  onClick={() => scrollToSection('portafolio')}
                  className="inline-block bg-[#1A1A1A] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#000000] hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  {t.hero.cta}
                </a>
              </motion.div>
            </div>

            {/* Imagen Hero */}
            <div className="w-full md:w-2/5">
              <img src="/img/hero-portrait.jpg"
                alt="Ilustración de Sonia"
                className="w-full h-auto object-cover fade-image-edges"
                onError={(e) => e.target.src = 'https://placehold.co/600x800/f0f0f0/1A1A1A?text=Digital+Art&font=playfair'} />
            </div>
          </div>
        </motion.section>

        {/* ====== Sección Sobre Mí ====== */}
        <motion.section
          id="sobre-mi"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-24 bg-white"
        >
          <div className="container mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-full md:w-1/2 lg:w-2/5">
              <img src="/img/about-workspace.jpg"
                alt="Espacio de trabajo de Sonia"
                className="w-full h-auto object-cover aspect-square fade-image-edges"
                onError={(e) => e.target.src = 'https://placehold.co/500x500/f0f0f0/1A1A1A?text=Sketches&font=playfair'} />
            </div>
            <div className="w-full md:w-1/2 lg:w-3/5 text-center md:text-left">
              <h2 className="text-4xl font-['Playfair_Display'] font-bold text-[#1A1A1A] mb-6">{t.about.title}</h2>
              <p className="text-lg text-[#4A4A4A] leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t.about.p1 }} />
              <p className="text-lg text-[#4A4A4A] leading-relaxed">
                {t.about.p2}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ====== Sección Portafolio ====== */}
        <motion.section
          id="portafolio"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-24"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-['Playfair_Display'] font-bold text-center text-[#1A1A1A] mb-4">{t.portfolio.title}</h2>
            <p className="text-lg text-center text-[#4A4A4A] mb-12">{t.portfolio.subtitle}</p>
          </div>

          {/* ====== Carrusel Infinito ====== */}
          <div
            className="w-full overflow-hidden"
          >
            <div className="flex w-max hover:pause-animation animate-infinite-scroll">
              {/* Lista duplicada para el efecto de loop infinito */}
              {[...projectData, ...projectData].map((project, index) => {
                const details = t.portfolio.itemDetails[project.id];
                return (
                  <motion.div
                    key={`${project.id}-${index}`}
                    className="portfolio-item group relative overflow-hidden rounded-lg cursor-pointer flex-shrink-0 w-80 md:w-96 mx-4"
                    onClick={() => setSelectedProject(project)}
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                      mass: 1
                    }}
                  >
                    <img
                      src={project.imgSrc}
                      alt={details.title}
                      className="w-full h-full object-cover pointer-events-none"
                      onError={(e) => e.target.src = 'https://placehold.co/500x500/cccccc/999999?text=Error&font=poppins'} />
                    <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-white bg-black bg-opacity-0 group-hover:bg-opacity-70 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div>
                        <h3 className="text-2xl font-['Playfair_Display'] mb-2">{details.title}</h3>
                        <p className="text-sm font-['Poppins'] opacity-90">{details.desc.substring(0, 50)}...</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>

        {/* ====== Sección Proceso Creativo ====== */}
        <motion.section
          id="proceso"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-24 bg-white"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-['Playfair_Display'] font-bold text-center text-[#1A1A1A] mb-4">{t.process.title}</h2>
            <p className="text-lg text-center text-[#4A4A4A] mb-12">{t.process.subtitle}</p>

            <div className="flex flex-wrap justify-center gap-6">
              <img src="https://raw.githubusercontent.com/chesterchasis/sonny/refs/heads/main/public/img/miproceso1.jpg"
                alt={t.process.alt1}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 fade-image-edges"
                onError={(e) => e.target.src = 'https://placehold.co/400x300/f0f0f0/1A1A1A?text=Sketch&font=poppins'} />
              <img src="https://raw.githubusercontent.com/chesterchasis/sonny/refs/heads/main/public/img/miproceso2.jpg"
                alt={t.process.alt2}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 fade-image-edges"
                onError={(e) => e.target.src = 'https://placehold.co/400x300/f0f0f0/1A1A1A?text=Colors&font=poppins'} />
            </div>
          </div>
        </motion.section>

        {/* ====== Sección Contacto ====== */}
        <motion.section
          id="contacto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-24"
        >
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <h2 className="text-4xl font-['Playfair_Display'] font-bold text-[#1A1A1A] mb-6">
              {t.contact.title}
            </h2>
            <p className="text-xl text-[#4A4A4A] mb-8 max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>

            <div className="flex justify-center space-x-6 md:space-x-12 mt-12">
              {/* Instagram */}
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4A4A4A] hover:text-[#000000] transition-colors duration-200"
                aria-label={t.contact.ariaInsta}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                {/* CAMBIO: Icono profesional */}
                <Instagram className="w-10 h-10" strokeWidth={1.5} />
              </motion.a>

              {/* TikTok */}
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4A4A4A] hover:text-[#000000] transition-colors duration-200"
                aria-label={t.contact.ariaTiktok}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                {/* CAMBIO: Icono profesional (Tiktok no existe, usamos MessageCircle) */}
                <MessageCircle className="w-10 h-10" strokeWidth={1.5} />
              </motion.a>

              {/* Mail */}
              <motion.a
                href={`mailto:${t.contact.mail}`}
                className="text-[#4A4A4A] hover:text-[#000000] transition-colors duration-200"
                aria-label={t.contact.ariaMail}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                {/* CAMBIO: Icono profesional */}
                <Mail className="w-10 h-10" strokeWidth={1.5} />
              </motion.a>
            </div>

          </div>
        </motion.section>

      </main>

      {/* ====== Footer ====== */}
      <footer className="bg-white py-10">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p className="text-sm">{t.footer.copy}</p>
        </div>
      </footer>

      {/* ====== Modal del Portafolio (AnimatePresence) ====== */}
      <AnimatePresence>
        {selectedProject && (
          <PortfolioModal
            project={selectedProject}
            details={t.portfolio.itemDetails[selectedProject.id]}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

