import { describe, expect, it, vi } from 'vitest';
import { renderWithPrimer, screen, userEvent } from '@conning/test-utils/render';
import { Button } from './Button';

describe('Button', () => {
  it('renders its children', () => {
    renderWithPrimer(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    renderWithPrimer(<Button onClick={onClick}>Click me</Button>);

    await userEvent.click(screen.getByRole('button', { name: 'Click me' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn();
    renderWithPrimer(
      <Button onClick={onClick} disabled>
        Click me
      </Button>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Click me' }));

    expect(onClick).not.toHaveBeenCalled();
  });
});
