import React, { forwardRef } from 'react';
import { Label as PrimerLabel } from '@primer/react';

export type BadgeProps = React.ComponentProps<typeof PrimerLabel>;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(props, ref) {
  return <PrimerLabel ref={ref} {...props} />;
});
