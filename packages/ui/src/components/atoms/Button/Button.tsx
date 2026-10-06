import React, { forwardRef } from 'react';
import { Button as PrimerButton } from '@primer/react';

export type ButtonProps = React.ComponentProps<typeof PrimerButton>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  return <PrimerButton ref={ref} {...props} />;
});
