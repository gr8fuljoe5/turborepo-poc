import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { ThemeProvider, BaseStyles } from '@primer/react';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    options: {
      // Pin the atomic-design progression; alphabetical would read backwards.
      storySort: {
        order: ['Atoms', 'Molecules', 'Organisms'],
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <BaseStyles>
          <Story />
        </BaseStyles>
      </ThemeProvider>
    ),
  ],
};

export default preview;
