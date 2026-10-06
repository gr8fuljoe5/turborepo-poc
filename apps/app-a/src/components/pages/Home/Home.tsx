import { Heading } from '@conning/ui/atoms/Heading/Heading';
import { Card } from '@conning/ui/molecules/surfaces/Card/Card';
import { useItems } from '@/hooks/use-items';

export function Home() {
  const { data, isPending, isError } = useItems();

  return (
    <div className="flex flex-col gap-4">
      <Heading as="h1">App A</Heading>
      {isPending ? <p>Loading items…</p> : null}
      {isError ? <p role="alert">Could not load items from server-a.</p> : null}
      {data?.map((item) => (
        <Card key={item.id} title={item.name}>
          {item.description}
        </Card>
      ))}
    </div>
  );
}
