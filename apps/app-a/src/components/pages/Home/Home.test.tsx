import { afterEach, describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderWithPrimer, screen } from '@conning/test-utils/render';
import { Home } from './Home';

function renderHome() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return renderWithPrimer(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>,
  );
}

describe('Home', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders a card for each item returned by the API', async () => {
    const items = [
      { id: '1', name: 'First item', description: 'One' },
      { id: '2', name: 'Second item', description: 'Two' },
    ];
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(items)));
    vi.stubGlobal('fetch', fetchMock);

    renderHome();

    expect(await screen.findByRole('heading', { name: 'First item' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Second item' })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('/api/items');
  });

  it('shows an error when the API fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 500 })));

    renderHome();

    expect(await screen.findByRole('alert')).toHaveTextContent('Could not load items');
  });
});
