import { useQuery } from '@tanstack/react-query';

export type Item = {
  id: string;
  name: string;
  description: string;
};

export function useItems() {
  return useQuery({
    queryKey: ['items'],
    queryFn: async (): Promise<Item[]> => {
      const res = await fetch('/api/items');
      if (!res.ok) throw new Error(`GET /api/items failed: ${res.status}`);
      return res.json();
    },
  });
}
