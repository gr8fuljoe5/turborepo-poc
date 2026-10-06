import { describe, expect, it } from 'vitest';
import { renderWithPrimer, screen } from '@conning/test-utils/render';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its children', () => {
    renderWithPrimer(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders with a variant applied', () => {
    renderWithPrimer(<Badge variant="danger">Danger</Badge>);
    expect(screen.getByText('Danger')).toBeInTheDocument();
  });
});
