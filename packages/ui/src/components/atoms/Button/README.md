# Button

A thin wrapper around [`@primer/react`](https://primer.style/product/components/button)'s `Button`. All props are forwarded as-is, with `ref` forwarding added.

## Usage

```tsx
import { Button } from '@conning/ui/atoms/Button/Button';

<Button variant="primary" onClick={() => console.log('clicked')}>
  Save changes
</Button>;
```

## Props

Same as Primer's `ButtonProps`, notably:

| Prop       | Type                                                          | Description                            |
| ---------- | ------------------------------------------------------------- | -------------------------------------- |
| `variant`  | `'default' \| 'primary' \| 'invisible' \| 'danger' \| 'link'` | Visual style. Defaults to `'default'`. |
| `size`     | `'small' \| 'medium' \| 'large'`                              | Button and label size.                 |
| `disabled` | `boolean`                                                     | Disables the button.                   |
| `onClick`  | `React.MouseEventHandler<HTMLButtonElement>`                  | Click handler.                         |
| `children` | `React.ReactNode`                                             | Button label.                          |

See [Storybook](./Button.stories.tsx) for live examples.
