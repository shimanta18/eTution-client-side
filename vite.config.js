import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
})


module.exports = {
  theme: {
    extend: {
      animation: {
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'progress-bar': 'progressBar 4s linear forwards',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        progressBar: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
    },
  },
};