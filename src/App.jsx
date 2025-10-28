import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// --- Datos del Portafolio (Separados de las traducciones) ---
// NOTA: Cambia estas URLs por tus imágenes locales, ej: '/img/proyecto-1.jpg'
// Coloca esas imágenes en la carpeta `public/img/` de tu proyecto Vite.
const projectData = [
  { id: 1, imgSrc: "https://placehold.co/800x600/E9D8E4/8B5CF6?text=Digital+Illustration&font=playfair" },
  { id: 2, imgSrc: "https://placehold.co/800x600/D4E7D4/8B5CF6?text=Traditional+Art&font=playfair" },
  { id: 3, imgSrc: "https://placehold.co/800x600/E0E0E0/8B5CF6?text=School+Project&font=playfair" },
  { id: 4, imgSrc: "https://placehold.co/800x600/F0E6D2/8B5CF6?text=Digital+Illustration&font=playfair" },
  { id: 5, imgSrc: "https://placehold.co/800x600/D2EBF0/8B5CF6?text=School+Project&font=playfair" },
  { id: 6, imgSrc: "https://placehold.co/800x600/E8E8E8/8B5CF6?text=Traditional+Art&font=playfair" },
];

// --- Traducciones (Inglés y Eslovaco) ---
const translations = {
  en: {
    metaTitle: 'SoniaArt | Portfolio',
    metaDescription: 'Portfolio of Sonia, a graphic design student and visual artist.',
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
      // CAMBIO: Título actualizado
      title: "Let's Connect!",
      // CAMBIO: Subtítulo actualizado
      subtitle: 'Contact me through my social networks or send me an email.',
      // CAMBIO: Etiquetas ARIA actualizadas
      ariaInsta: 'Instagram',
      ariaTikTok: 'TikTok',
      ariaEmail: 'Send an Email'
    },
    footer: {
      copy: '© 2025 SoniaArt. All rights reserved.',
    },
  },
  sk: {
    metaTitle: 'SoniaArt | Portfólio',
    metaDescription: 'Portfólio Sone, študentky grafického dizajnu a vizuálnej umelkyne.',
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
      // CAMBIO: Título actualizado
      title: 'Spojme sa!',
      // CAMBIO: Subtítulo actualizado
      subtitle: 'Kontaktujte ma cez moje sociálne siete alebo mi pošlite email.',
      // CAMBIO: Etiquetas ARIA actualizadas
      ariaInsta: 'Instagram',
      ariaTikTok: 'TikTok',
      ariaEmail: 'Poslať Email'
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
      background-color: #FBFBF8; /* Fondo de página blanco roto */
      color: #4A2E5F; /* CAMBIO: Color de texto principal violeta oscuro */
    }
    h1, h2, h3, h4, h5, h6, .font-playfair {
      font-family: 'Playfair Display', serif;
    }
    html {
      scroll-behavior: smooth;
    }
    /* Estilos para el formulario de Formspree */
    .form-input {
      @apply w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all duration-200; /* CAMBIO: Color de anillo de foco */
    }
    .form-label {
      @apply block text-left text-sm font-medium text-gray-700 mb-1;
    }
    
    /* CAMBIO: Clase para desvanecer bordes de imagen (degradado más amplio) */
    .fade-image-edges {
      -webkit-mask-image: radial-gradient(circle, black 65%, transparent 100%);
      mask-image: radial-gradient(circle, black 65%, transparent 100%);
    }

    /* ====== INICIO DEL CAMBIO: Animación de scroll infinito ====== */
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); } /* Se mueve al 50% porque duplicamos el contenido */
    }
    .animate-scrolling {
      animation: scroll 40s linear infinite; /* 40s es la velocidad, ajústala si lo deseas */
    }
    .hover-paused:hover {
      animation-play-state: paused;
    }
    /* ====== FIN DEL CAMBIO ====== */
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
                src={project.imgSrc.replace('500x500', '800x600')} // Cargar imagen más grande
                alt={details.title} 
                className="w-full h-full object-cover max-h-[80vh]"
                onError={(e) => e.target.src='https://placehold.co/800x600/cccccc/999999?text=Error&font=poppins'}
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

  // Función para el scroll suave de la barra de navegación
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const LangButton = ({ code, children }) => (
    <button
      onClick={() => setLang(code)}
      className={`font-medium ${lang === code ? 'text-[#8B5CF6]' : 'text-gray-500 hover:text-gray-900'}`} // CAMBIO: Color de idioma activo
    >
      {children}
    </button>
  );

  // ====== INICIO DEL CAMBIO: Duplicamos los proyectos para el loop infinito ======
  const loopedProjects = [...projectData, ...projectData];
  // ====== FIN DEL CAMBIO ======

  return (
    <HelmetProvider>
      <Helmet>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
      </Helmet>

      <GlobalStyles />

      {/* ====== Header / Navbar ====== */}
      <header className="fixed top-0 left-0 w-full bg-white bg-opacity-90 backdrop-blur-md shadow-sm z-50 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            {/* Logo */}
            <a onClick={() => scrollToSection('inicio')} className="text-3xl font-['Playfair_Display'] font-bold text-[#4A2E5F] cursor-pointer"> {/* CAMBIO: Color del logo */}
              Sonia<span className="text-[#8B5CF6]">Art</span> {/* CAMBIO: Color de acento del logo */}
            </a>
            
            {/* Menú de escritorio */}
            <div className="hidden md:flex items-center space-x-8">
              {/* CAMBIO: Colores de enlaces de navegación */}
              <a onClick={() => scrollToSection('inicio')} className="text-[#4A2E5F] hover:text-[#8B5CF6] transition-colors duration-200 cursor-pointer">{t.nav.home}</a>
              <a onClick={() => scrollToSection('sobre-mi')} className="text-[#4A2E5F] hover:text-[#8B5CF6] transition-colors duration-200 cursor-pointer">{t.nav.about}</a>
              <a onClick={() => scrollToSection('portafolio')} className="text-[#4A2E5F] hover:text-[#8B5CF6] transition-colors duration-200 cursor-pointer">{t.nav.portfolio}</a>
              <a onClick={() => scrollToSection('contacto')} className="text-[#4A2E5F] hover:text-[#8B5CF6] transition-colors duration-200 cursor-pointer">{t.nav.contact}</a>
              <div className="flex space-x-2 pl-4">
                <LangButton code="en">EN</LangButton>
                <span className="text-gray-300">|</span>
                <LangButton code="sk">SK</LangButton>
              </div>
              <button id="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#4A2E5F] focus:outline-none"> {/* CAMBIO: Color del icono de menú */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                </svg>
              </button>
            </div>
          </nav>
          
          <div id="mobile-menu" className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
            {/* CAMBIO: Colores de enlaces de navegación móvil */}
            <a onClick={() => { scrollToSection('inicio'); setIsMenuOpen(false); }} className="block py-2 text-[#4A2E5F] hover:text-[#8B5CF6] cursor-pointer">{t.nav.home}</a>
            <a onClick={() => { scrollToSection('sobre-mi'); setIsMenuOpen(false); }} className="block py-2 text-[#4A2E5F] hover:text-[#8B5CF6] cursor-pointer">{t.nav.about}</a>
            <a onClick={() => { scrollToSection('portafolio'); setIsMenuOpen(false); }} className="block py-2 text-[#4A2E5F] hover:text-[#8B5CF6] cursor-pointer">{t.nav.portfolio}</a>
            <a onClick={() => { scrollToSection('contacto'); setIsMenuOpen(false); }} className="block py-2 text-[#4A2E5F] hover:text-[#8B5CF6] cursor-pointer">{t.nav.contact}</a>
          </div>
        </div>
      </header>

      <main>
        
        {/* ====== Sección Hero ====== */}
        <motion.section 
          id="inicio"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="min-h-screen flex items-center pt-20 md:pt-0"
        >
          <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between">
            {/* Texto Hero */}
            <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
              <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-[#4A2E5F] mb-4"> {/* CAMBIO: Color de título */}
                {t.hero.greeting}
              </h1>
              <p className="text-xl md:text-2xl text-[#6D4C82] mb-8"> {/* CAMBIO: Color de subtítulo */}
                {t.hero.subtitle}
              </p>
              <motion.a 
                onClick={() => scrollToSection('portafolio')} 
                className="inline-block bg-[#8B5CF6] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#7a4ee0] hover:shadow-xl transition-all duration-300 cursor-pointer" // CAMBIO: Colores del botón
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {t.hero.cta}
              </motion.a>
            </div>
            
            {/* Imagen Hero */}
            <div className="w-full md:w-2/5">
              <img src="https://placehold.co/600x800/f0f0f0/8B5CF6?text=Artistic+Portrait&font=playfair" 
                   alt="Ilustración de Sonia"
                   className="w-full h-auto object-cover fade-image-edges" 
                   onError={(e) => e.target.src='https://placehold.co/600x800/f0f0f0/8B5CF6?text=Digital+Art&font=playfair'}/> {/* CAMBIO: Color placeholder */}
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
              <img src="https://placehold.co/500x500/f0f0f0/8B5CF6?text=My+Desk&font=playfair" 
                   alt="Espacio de trabajo de Sonia"
                   className="w-full h-auto object-cover aspect-square fade-image-edges" 
                   onError={(e) => e.target.src='https://placehold.co/500x500/f0f0f0/8B5CF6?text=Sketches&font=playfair'}/> {/* CAMBIO: Color placeholder */}
            </div>
            <div className="w-full md:w-1/2 lg:w-3/5 text-center md:text-left">
              <h2 className="text-4xl font-['Playfair_Display'] font-bold text-[#4A2E5F] mb-6">{t.about.title}</h2> {/* CAMBIO: Color de título */}
              <p className="text-lg text-[#6D4C82] leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t.about.p1 }} /> {/* CAMBIO: Color de texto */}
              <p className="text-lg text-[#6D4C82] leading-relaxed"> {/* CAMBIO: Color de texto */}
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
          {/* CAMBIO: Contenedor del portafolio. `container` se saca para que el overflow ocupe toda la pantalla */}
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-['Playfair_Display'] font-bold text-center text-[#4A2E5F] mb-4">{t.portfolio.title}</h2> {/* CAMBIO: Color de título */}
            <p className="text-lg text-center text-[#6D4C82] mb-12">{t.portfolio.subtitle}</p> {/* CAMBIO: Color de subtítulo */}
          </div>
          
          {/* ====== INICIO DEL CAMBIO: Carrusel Infinito CSS ====== */}
          <div 
            className="w-full overflow-hidden" // Contenedor que oculta el overflow
          >
            <div 
              className="flex gap-8 py-4 animate-scrolling hover-paused" // Pista de animación
            >
              {/* Mapeamos sobre la lista duplicada */}
              {loopedProjects.map((project, index) => {
                const details = t.portfolio.itemDetails[project.id];
                return (
                  <motion.div 
                    key={`${project.id}-${index}`} // Key única para la lista duplicada
                    className="portfolio-item group relative overflow-hidden rounded-lg cursor-pointer flex-shrink-0 w-80 md:w-96"
                    onClick={() => setSelectedProject(project)}
                    whileHover={{ scale: 1.03 }} 
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <img 
                      src={project.imgSrc.replace('800x600', '500x500')} 
                      alt={details.title}
                      className="w-full h-full object-cover pointer-events-none" 
                      onError={(e) => e.target.src='https://placehold.co/500x500/cccccc/999999?text=Error&font=poppins'}/>
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
          {/* ====== FIN DEL CAMBIO ====== */}
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
            <h2 className="text-4xl font-['Playfair_Display'] font-bold text-center text-[#4A2E5F] mb-4">{t.process.title}</h2> {/* CAMBIO: Color de título */}
            <p className="text-lg text-center text-[#6D4C82] mb-12">{t.process.subtitle}</p> {/* CAMBIO: Color de subtítulo */}
            
            <div className="flex flex-wrap justify-center gap-6">
              <img src="https://placehold.co/400x300/f0f0f0/cccccc?text=Quick+Sketch&font=poppins" 
                   alt={t.process.alt1}
                   className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 fade-image-edges" 
                   onError={(e) => e.target.src='https://placehold.co/400x300/f0f0f0/8B5CF6?text=Sketch&font=poppins'}/> {/* CAMBIO: Color placeholder */}
              <img src="https://placehold.co/400x300/f0f0f0/cccccc?text=Color+Palette&font=poppins" 
                   alt={t.process.alt2}
                   className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 fade-image-edges" 
                   onError={(e) => e.target.src='https://placehold.co/400x300/f0f0f0/8B5CF6?text=Colors&font=poppins'}/> {/* CAMBIO: Color placeholder */}
              <img src="https://placehold.co/400x300/f0f0f0/cccccc?text=Digital+Lineart&font=poppins" 
                   alt={t.process.alt3}
                   className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 fade-image-edges" 
                   onError={(e) => e.target.src='https://placehold.co/400x300/f0f0f0/8B5CF6?text=Lineart&font=poppins'}/> {/* CAMBIO: Color placeholder */}
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
            <h2 className="text-4xl font-['Playfair_Display'] font-bold text-[#4A2E5F] mb-6"> {/* CAMBIO: Color de título */}
              {t.contact.title} 💌
            </h2>
            <p className="text-xl text-[#6D4C82] mb-12 max-w-2xl mx-auto"> {/* CAMBIO: Aumentado mb-8 a mb-12 */}
              {t.contact.subtitle}
            </p>
            
            {/* --- INICIO DEL CAMBIO: Formulario eliminado --- */}
            {/* <form 
                action="https://formspree.io/f/YOUR_ID_HERE" 
                method="POST" 
                className="space-y-6"
              >
                ... (Formulario eliminado) ...
              </form>
            */}
            {/* --- FIN DEL CAMBIO --- */}

            <div className="flex justify-center space-x-8 mt-12"> {/* CAMBIO: Aumentado space-x-6 a space-x-8 */}
              {/* Instagram (Mantenido) */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#6D4C82] hover:text-[#8B5CF6] transition-colors duration-200" aria-label={t.contact.ariaInsta}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.227-1.669 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.669 4.771 4.919 4.919C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.74 0 8.333.011 7.053.072 2.695.272.273 2.69.073 7.052.012 8.333 0 8.74 0 12s.011 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.988 8.74 24 12 24s3.667-.011 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.061-1.28.073-1.687.073-4.947s-.011-3.667-.072-4.947C21.727 2.69 19.302.273 14.947.072 13.667.011 13.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>
              </a>
              
              {/* CAMBIO: TikTok (Añadido) */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#6D4C82] hover:text-[#8B5CF6] transition-colors duration-200" aria-label={t.contact.ariaTikTok}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.525.02c1.31-.02 2.61-.01 3.91.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.1.03-4.14-.61-5.72-1.98-1.58-1.37-2.56-3.19-2.8-5.1-.02-.16-.04-.33-.05-.51v-4.1c.83 1.37 2.09 2.39 3.56 2.93.57.21 1.16.35 1.75.42.01 2.8.01 5.59-.01 8.38-.01 1.09.32 2.18 1.02 3.02 1.14 1.38 3.02 2.01 4.71 1.54 1.11-.3 2.02-1.02 2.63-1.98.54-.84.8-1.84.8-2.86.02-2.89.01-5.78.01-8.67 0-1.87-.51-3.66-1.4-5.16-1.23-2.08-3.3-3.5-5.55-3.86-1.09-.17-2.19-.1-3.29.02v4.06c1.08-.01 2.16-.01 3.25.02z"/></svg>
              </a>
              
              {/* CAMBIO: Email (Añadido) */}
              <a href="mailto:sonia.designs@gmail.com" className="text-[#6D4C82] hover:text-[#8B5CF6] transition-colors duration-200" aria-label={t.contact.ariaEmail}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a>
              
              {/* CAMBIO: Behance y ArtStation eliminados */}
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
    </HelmetProvider>
  );
}



