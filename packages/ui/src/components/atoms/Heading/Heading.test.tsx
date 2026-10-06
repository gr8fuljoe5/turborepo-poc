import { describe, expect, it } from 'vitest';
import { renderWithPrimer, screen } from '@conning/test-utils/render';
import { Heading } from './Heading';

describe('Heading', () => {
  it('renders Georgia italic styling by default', () => {
    renderWithPrimer(<Heading>Overview</Heading>);

    expect(screen.getByRole('heading', { name: 'Overview' })).toHaveStyle({
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontStyle: 'italic',
    });
  });

  it('applies a custom color', () => {
    renderWithPrimer(<Heading color="rgb(1, 30, 96)">Overview</Heading>);

    expect(screen.getByRole('heading', { name: 'Overview' })).toHaveStyle({
      color: 'rgb(1, 30, 96)',
    });
  });

  it('lets an explicit style prop override the defaults', () => {
    renderWithPrimer(<Heading style={{ fontStyle: 'normal' }}>Overview</Heading>);

    expect(screen.getByRole('heading', { name: 'Overview' })).toHaveStyle({ fontStyle: 'normal' });
  });
});
