/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "on-tertiary-container": "#a47979",
        "on-primary": "#ffffff",
        "on-error": "#ffffff",
        "on-tertiary-fixed": "#2f1314",
        "outline": "#78767b",
        "on-surface-variant": "#47464b",
        "on-primary-fixed-variant": "#47464a",
        "inverse-surface": "#313030",
        "on-secondary-fixed-variant": "#474745",
        "surface-container-low": "#f7f3f2",
        "error": "#ba1a1a",
        "surface-dim": "#ddd9d9",
        "tertiary-fixed-dim": "#ecbbba",
        "on-primary-fixed": "#1c1b1f",
        "surface-variant": "#e5e2e1",
        "surface": "#fdf8f8",
        "on-error-container": "#93000a",
        "on-tertiary": "#ffffff",
        "on-secondary-container": "#636361",
        "secondary-container": "#e1dfdd",
        "on-background": "#1c1b1c",
        "error-container": "#ffdad6",
        "surface-container": "#f1eded",
        "primary-container": "#1c1b1f",
        "surface-tint": "#5f5e62",
        "background": "#fdf8f8",
        "on-tertiary-fixed-variant": "#603d3e",
        "surface-container-lowest": "#ffffff",
        "on-surface": "#1c1b1c",
        "inverse-on-surface": "#f4f0f0",
        "surface-container-high": "#ebe7e7",
        "secondary-fixed": "#e4e2df",
        "primary": "#000000",
        "outline-variant": "#c8c5cb",
        "primary-fixed-dim": "#c8c5ca",
        "primary-fixed": "#e5e1e6",
        "on-secondary-fixed": "#1b1c1a",
        "on-secondary": "#ffffff",
        "surface-container-highest": "#e5e2e1",
        "on-primary-container": "#858387",
        "tertiary-container": "#2f1314",
        "secondary-fixed-dim": "#c8c6c4",
        "surface-bright": "#fdf8f8",
        "inverse-primary": "#c8c5ca",
        "tertiary-fixed": "#ffdad9",
        "tertiary": "#000000",
        "secondary": "#5e5e5c"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "gutter": "32px",
        "unit": "8px",
        "margin-mobile": "20px",
        "container-max": "1280px",
        "section-gap": "120px"
      },
      "fontFamily": {
        "headline-md": ["Playfair Display", "serif"],
        "label-caps": ["DM Sans", "sans-serif"],
        "headline-lg": ["Playfair Display", "serif"],
        "body-lg": ["DM Sans", "sans-serif"],
        "display-lg-mobile": ["Playfair Display", "serif"],
        "body-md": ["DM Sans", "sans-serif"],
        "display-lg": ["Playfair Display", "serif"]
      },
      "fontSize": {
        "headline-md": ["32px", {"lineHeight": "1.3", "fontWeight": "600"}],
        "label-caps": ["12px", {"lineHeight": "1", "letterSpacing": "0.1em", "fontWeight": "700"}],
        "headline-lg": ["40px", {"lineHeight": "1.2", "fontWeight": "600"}],
        "body-lg": ["18px", {"lineHeight": "1.7", "fontWeight": "400"}],
        "display-lg-mobile": ["48px", {"lineHeight": "1.1", "fontWeight": "700"}],
        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "display-lg": ["72px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}