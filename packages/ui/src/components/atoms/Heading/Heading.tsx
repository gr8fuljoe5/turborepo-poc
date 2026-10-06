import React, { forwardRef } from 'react';
import { Heading as PrimerHeading } from '@primer/react';

export type HeadingProps = React.ComponentProps<typeof PrimerHeading> & {
  color?: string;
};

// The Conning display face is Georgia italic in navy. `color` is exposed so a
// caller can override it without rebuilding the whole `style` object.
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { color, style, ...props },
  ref,
) {
  return (
    <PrimerHeading
      ref={ref}
      style={{
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontStyle: 'italic',
        fontWeight: 400,
        color: color ?? 'var(--fg-headline, #011e60)',
        ...style,
      }}
      {...props}
    />
  );
});
