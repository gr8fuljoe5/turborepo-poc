# Badge

A thin wrapper around [`@primer/react`](https://primer.style/product/components/label)'s `Label`, used as a status/tag badge. All props are forwarded as-is, with `ref` forwarding added.

## Usage

```tsx
import { Badge } from '@conning/ui/atoms/Badge/Badge';

<Badge variant="success">Active</Badge>;
```

## Props

Same as Primer's `LabelProps`:

| Prop       | Type                                                                              | Description                           |
| ---------- | --------------------------------------------------------------------------------- | ------------------------------------- |
| `variant`  | `'default' \| 'primary' \| 'accent' \| 'success' \| 'attention' \| 'danger' \| …` | Badge color. Defaults to `'default'`. |
| `size`     | `'small' \| 'large'`                                                              | Badge size.                           |
| `children` | `React.ReactNode`                                                                 | Badge label.                          |

See [Storybook](./Badge.stories.tsx) for live examples.
