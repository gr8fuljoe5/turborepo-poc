import { Heading } from '@conning/ui/atoms/Heading/Heading';

export function About() {
  return (
    <div className="flex flex-col gap-4">
      <Heading as="h1">About App A</Heading>
      <p>A dummy SPA in the Turborepo POC. Its data comes from server-a on port 4001.</p>
    </div>
  );
}
