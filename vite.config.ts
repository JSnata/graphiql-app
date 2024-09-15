import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    // coverage: {
    //   provider: 'istanbul',
    //   exclude: ['next.config.mjs', // Исключаем конфигурационный файл
    //     'next-env.d.ts',           // Исключаем автоматически сгенерированный файл
    //     'vite.config.ts',          // Исключаем конфигурационный файл Vite
    //     '**/*.json',               // Исключаем JSON-файлы
    //     '**/*.js',                 // Исключаем файлы манифестов и другие вспомогательные JS-файлы
    //     // '.next/**'
    //     ],
    // },
  },
});
