import { describe, expect, it } from 'vitest';
import { renderWithPrimer, screen } from '@conning/test-utils/render';
import { Card } from './Card';

describe('Card', () => {
  it('renders its title and body', () => {
    renderWithPrimer(<Card title="Summary">All good</Card>);

    expect(screen.getByRole('heading', { name: 'Summary' })).toBeInTheDocument();
    expect(screen.getByText('All good')).toBeInTheDocument();
  });

  it('renders the subtitle and action when given', () => {
    renderWithPrimer(
      <Card title="Summary" subtitle="12 holdings" action={<button>More</button>}>
        Body
      </Card>,
    );

    expect(screen.getByText('12 holdings')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'More' })).toBeInTheDocument();
  });

  it('omits the header divider when there is no header', () => {
    renderWithPrimer(<Card>Body only</Card>);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
  });

  it('merges a custom className onto the root', () => {
    renderWithPrimer(
      <Card className="w-64" data-testid="card">
        Body
      </Card>,
    );

    expect(screen.getByTestId('card')).toHaveClass('w-64', 'rounded-xl');
  });
});
