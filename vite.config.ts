import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'istanbul',
      exclude: [
        'next.config.mjs', // Исключаем конфигурационный файл
        'next-env.d.ts',           // Исключаем автоматически сгенерированный файл
        'vite.config.ts',          // Исключаем конфигурационный файл Vite
        '**/*.json',               // Исключаем JSON-файлы
        '**/*.js',                 // Исключаем файлы манифестов и другие вспомогательные JS-файлы
        './src/tests/*.test.ts',             // Исключаем файлы тестов
        './src/app/**', // https://docs.google.com/spreadsheets/d/1zZB-FbbhvkX9SpE14CC1UScAvRS46C5_nqIJ5cD4Elg/edit?gid=19255438#gid=19255438
        '.next/**',
      ],
    },
  },
});
