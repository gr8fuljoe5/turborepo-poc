import { Heading } from '@conning/ui/atoms/Heading/Heading';

export function About() {
  return (
    <div className="flex flex-col gap-4">
      <Heading as="h1">About App B</Heading>
      <p>A dummy SPA in the Turborepo POC. Its data comes from server-b on port 4002.</p>
    </div>
  );
}
