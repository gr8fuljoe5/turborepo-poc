# Heading

A wrapper around [`@primer/react`](https://primer.style/product/components/heading)'s `Heading` that applies the Conning display style — Georgia italic in the navy headline colour (`--fg-headline`). All Primer props are forwarded, with `ref` forwarding added.

## Usage

```tsx
import { Heading } from '@conning/ui/atoms/Heading/Heading';

<Heading as="h1">Portfolio Overview</Heading>;
```

## Props

| Prop      | Type                             | Description                                                  |
| --------- | -------------------------------- | ------------------------------------------------------------ |
| `as`      | `'h1' \| 'h2' \| … \| 'h6'`      | Rendered element. Defaults to `h2`.                          |
| `variant` | `'large' \| 'medium' \| 'small'` | Primer's type scale.                                         |
| `color`   | `string`                         | Overrides the headline colour.                               |
| `style`   | `React.CSSProperties`            | Merged last, so it can override the default font and colour. |

See [Storybook](./Heading.stories.tsx) for live examples.
