/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: '#0A0A0F',
        panel: '#12121B',
      },
      boxShadow: {
        glass: '0 8px 30px rgba(0, 0, 0, 0.35)',
      },
      backgroundImage: {
        gradientGlow:
          'radial-gradient(circle at 20% 20%, rgba(124,58,237,.35), transparent 30%), radial-gradient(circle at 80% 0%, rgba(14,165,233,.25), transparent 25%), radial-gradient(circle at 50% 80%, rgba(236,72,153,.25), transparent 35%)',
      },
    },
  },
  plugins: [],
};
