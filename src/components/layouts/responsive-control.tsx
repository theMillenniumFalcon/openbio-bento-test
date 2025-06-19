import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface ResponsiveControlProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const ResponsiveControl = forwardRef<
  HTMLDivElement,
  ResponsiveControlProps
>(({ className, ...args }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'responsive-control',
        'box-border mx-auto w-full max-w-full',
        'px-2 sm:px-4 md:px-6 lg:px-8',
        className,
      )}
      {...args}
    />
  );
});

ResponsiveControl.displayName = 'ResponsiveControl';
