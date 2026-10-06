export type Item = {
  id: string;
  name: string;
  description: string;
};

export const SERVICE_NAME = 'server-a';

export const items: Item[] = [
  { id: 'a-1', name: 'Alpha holdings', description: 'Static data served by server-a.' },
  { id: 'a-2', name: 'Alpha ratings', description: 'A second record from server-a.' },
  { id: 'a-3', name: 'Alpha watchlist', description: 'A third record from server-a.' },
];
