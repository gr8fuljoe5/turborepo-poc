# Card

A bordered surface for grouping content. Primer has no `Card` primitive, so this is a plain `<div>` laid out with Tailwind utilities, composing Primer's `Text` for the body. Background and border colours come from Primer's semantic tokens (`--bgColor-default`, `--borderColor-default`), and the title uses the Conning headline colour (`--fg-headline`).

## Usage

```tsx
import { Card } from '@conning/ui/molecules/surfaces/Card/Card';

<Card title="Portfolio summary" subtitle="12 holdings">
  Everything looks good.
</Card>;
```

## Props

| Prop        | Type              | Description                                                            |
| ----------- | ----------------- | ---------------------------------------------------------------------- |
| `title`     | `React.ReactNode` | Optional heading. Omit it, `subtitle` and `action` to drop the header. |
| `subtitle`  | `React.ReactNode` | Muted line beneath `title`.                                            |
| `action`    | `React.ReactNode` | Content at the top-right of the header.                                |
| `children`  | `React.ReactNode` | Card body, rendered inside a Primer `Text`.                            |
| `className` | `string`          | Extra Tailwind classes merged onto the root `<div>`.                   |

Any other `<div>` props (`style`, `onClick`, `data-*`) are forwarded to the root element.

See [Storybook](./Card.stories.tsx) for live examples.
