export type Item = {
  id: string;
  name: string;
  description: string;
};

export const SERVICE_NAME = 'server-b';

export const items: Item[] = [
  { id: 'b-1', name: 'Bravo holdings', description: 'Static data served by server-b.' },
  { id: 'b-2', name: 'Bravo ratings', description: 'A second record from server-b.' },
  { id: 'b-3', name: 'Bravo watchlist', description: 'A third record from server-b.' },
];
