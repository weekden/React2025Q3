/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/React2025Q3/class-components/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setupTests.ts',
    include: ['./src/__tests__', 'src/**/*.test.{js,ts,tsx}'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'text-summary'],
      reportsDirectory: './coverage',
      all: true,
      include: ['src/**/*.{js,ts,tsx}'],
      exclude: [
        './src/__tests__',
        'src/**/*.test.{js,ts,tsx}',
        'node_modules',
        'dist',
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
    watch: false,
    reporters: ['default'],
    maxConcurrency: 5,
    testTimeout: 10000,
    mockReset: true,
  },
});
