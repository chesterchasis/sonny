Portafolio Artístico de Sonia (Proyecto React + Vite)

Este es un proyecto de un portafolio web moderno, de una sola página, creado con React, Vite y Tailwind CSS. Está diseñado para ser un portafolio artístico, minimalista y profesional para una estudiante de diseño.

🎨 Características Principales

React + Vite: Construido sobre un stack moderno para un desarrollo rápido.

Diseño Responsive: Totalmente adaptable a dispositivos móviles y tabletas.

Multilenguaje (i18n): Soporte integrado para Inglés (en) y Eslovaco (sk) con un simple hook de useState.

Animaciones Suaves: Transiciones de framer-motion para la aparición de secciones y un menú móvil animado.

Carrusel Infinito: La sección de portafolio es un carrusel de scroll infinito que se pausa al pasar el ratón.

Modal (Lightbox): Al hacer clic en una obra del portafolio, se abre un modal con la imagen en grande y su descripción.

Iconos Profesionales: Usa lucide-react para todos los iconos, manteniendo un estilo limpio y consistente.

⚠️ Estado Actual: Faltan Contenidos

Este proyecto está 100% funcional, pero usa contenido de relleno. Para completarlo, necesitas personalizar:

1. Las Fotos del Portafolio

Actualmente, las imágenes son placeholders (ej. https://placehold.co/...).

Para cambiarlas:

Añade tus imágenes: Coloca tus archivos de imagen (ej. proyecto1.jpg, retrato.png) dentro de la carpeta public/img/ de tu proyecto.

Actualiza el código: Abre src/App.jsx y busca el array projectData (cerca de la línea 12).

Modifica las rutas: Cambia las URLs de placehold.co por las rutas locales de tus imágenes.

// Antes:
// { id: 1, imgSrc: "[https://placehold.co/800x600/](https://placehold.co/800x600/)..." }

// Después:
{ id: 1, imgSrc: "/img/proyecto1.jpg" }


Haz lo mismo con las imágenes de las secciones "Hero", "Sobre Mí" y "Proceso Creativo" directamente en el JSX.

2. Las Redes Sociales

Los iconos de Instagram, TikTok (icono de chat) y Mail en la sección de contacto apuntan a href="#".

Para cambiarlos:

Abre src/App.jsx y ve a la "Sección Contacto" (cerca de la línea 560).

Reemplaza el href="#" en las etiquetas <motion.a ...> por tus URLs reales.

// Antes:
<motion.a 
  href="#" 
  target="_blank" 
// ...
>
  <Instagram ... />
</motion.a>

// Después:
<motion.a 
  href="[https://www.instagram.com/tu-usuario](https://www.instagram.com/tu-usuario)" 
  target="_blank" 
// ...
>
  <Instagram ... />
</motion.a>


3. Iconos del Proyecto

Todos los iconos provienen de lucide-react. Si quieres cambiarlos (por ejemplo, el de TikTok), puedes encontrar cientos de iconos en lucide.dev e importarlos en la parte superior de src/App.jsx.

🚀 Instalación y Uso Local

Clona el repositorio:

git clone [https://github.com/chesterchasis/sonny.git](https://github.com/chesterchasis/sonny.git)


Entra en la carpeta:

cd sonny


Instala todas las dependencias:

npm install


Ejecuta el servidor de desarrollo:

npm run dev


Abre http://localhost:5173 en tu navegador.

🌐 Cómo Hacer "Host" en GitHub Pages

Para publicar tu web gratis en una URL de GitHub (ej. chesterchasis.github.io/sonny), sigue estos pasos:

Paso 1: Instala gh-pages

Esta herramienta facilita la publicación. Ejecuta esto en tu terminal:

npm install gh-pages --save-dev


Paso 2: Configura tu vite.config.js

Necesitamos decirle a Vite que la web no vivirá en la raíz (ej. dominio.com), sino en una sub-carpeta (ej. dominio.com/sonny/).

Abre tu archivo vite.config.js.

Añade la línea base:

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// [https://vitejs.dev/config/](https://vitejs.dev/config/)
export default defineConfig({
  plugins: [react()],
  base: '/sonny/' // <-- ¡AÑADE ESTA LÍNEA! (Usa el nombre de tu repo)
})


Paso 3: Añade los Scripts de Despliegue

Abre tu archivo package.json y añade estas dos líneas a la sección "scripts":

  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "...",
    "preview": "...",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },


predeploy: Se asegura de "construir" tu web (crear la carpeta dist) antes de publicar.

deploy: Toma la carpeta dist y la sube a una rama llamada gh-pages en tu GitHub.

Paso 4: ¡Publica!

Ahora, solo tienes que ejecutar este comando en tu terminal:

npm run deploy


Espera a que termine. Creará la carpeta dist, la subirá a la rama gh-pages y se limpiará sola.

Paso 5: Activa GitHub Pages

El último paso es decirle a GitHub que use esa nueva rama:

Ve a tu repositorio en GitHub.

Haz clic en Settings (Configuración).

En el menú de la izquierda, haz clic en Pages.

En la sección "Build and deployment", bajo "Source", selecciona Deploy from a branch.

Bajo "Branch", selecciona la rama gh-pages y la carpeta / (root).

Haz clic en Save.

¡Listo! En unos minutos, tu sitio estará visible en https://chesterchasis.github.io/sonny/