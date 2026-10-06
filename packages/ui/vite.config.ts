import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Only Storybook reads this — the package itself ships TypeScript source and
// has no build step. Apps compile it with their own Vite config.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
