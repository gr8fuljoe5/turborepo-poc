import { defineConfig } from 'vitest/config';

// Shared Vitest settings for every React workspace. Consumers merge this with
// their own config via `mergeConfig(preset, defineConfig({ ... }))` and add
// their own `setupFiles` and `include`.
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    // Vitest's 5s default is too tight once Primer components mount in jsdom on
    // a loaded CI agent; the failure it produces is intermittent, not real.
    testTimeout: 20_000,
    server: {
      // @primer/react's BaseStyles imports a plain .css file as a side effect.
      // Left externalized, Vitest loads it via native Node ESM, which can't
      // parse .css; inlining routes it through Vite's transform pipeline.
      deps: {
        inline: ['@primer/react'],
      },
    },
  },
});
