import React from 'react';
import { Text } from '@primer/react';

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: React.ReactNode;
  /** Muted line rendered beneath `title`, e.g. a row count or summary detail. */
  subtitle?: React.ReactNode;
  /** Rendered at the top-right of the header, e.g. a badge or overflow menu. */
  action?: React.ReactNode;
  children?: React.ReactNode;
};

export function Card({ title, subtitle, action, children, className, ...rest }: CardProps) {
  const hasHeader = Boolean(title || subtitle || action);

  return (
    <div
      className={[
        'rounded-xl border p-4 md:p-6 shadow-sm',
        'border-[var(--borderColor-default,#d1d9e0)] bg-[var(--bgColor-default,#fff)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {hasHeader ? (
        <div className="flex items-end justify-between gap-2">
          <div>
            {title ? (
              <h3
                className="m-0 text-[20px] leading-[32px]"
                style={{ color: 'var(--fg-headline, #011E60)' }}
              >
                {title}
              </h3>
            ) : null}
            {subtitle ? (
              <Text
                as="div"
                className="text-[14px] leading-[20px]"
                style={{ color: 'var(--fgColor-muted, #59636e)' }}
              >
                {subtitle}
              </Text>
            ) : null}
          </div>
          {action ? <div>{action}</div> : null}
        </div>
      ) : null}
      {hasHeader ? <hr className="mt-3 mb-3 border-0 border-t border-[#DEDBCD]" /> : null}
      <Text as="div" className="text-[14px]" style={{ color: 'var(--fgColor-muted, #59636e)' }}>
        {children}
      </Text>
    </div>
  );
}
