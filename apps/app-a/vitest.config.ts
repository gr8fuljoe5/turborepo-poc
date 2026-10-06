import { fileURLToPath } from 'node:url';
import { defineConfig, mergeConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import preset from '@conning/config/vitest.preset';

export default mergeConfig(
  preset,
  defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    test: {
      setupFiles: ['@conning/test-utils/setup'],
      include: ['src/**/*.test.{ts,tsx}'],
    },
  }),
);
