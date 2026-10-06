import React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { ThemeProvider, BaseStyles } from '@primer/react';

const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <BaseStyles>{children}</BaseStyles>
  </ThemeProvider>
);

export function renderWithPrimer(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: Providers, ...options });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
