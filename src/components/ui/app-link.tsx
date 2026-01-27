'use client';

import Link, { type LinkProps } from 'next/link';
import { forwardRef } from 'react';

interface AppLinkProps
  extends LinkProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Disable Next.js auto scroll on navigation by default */
  scroll?: boolean;
}

/**
 * Link wrapper that disables auto scroll for smooth page transitions.
 */
const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ scroll = false, ...props }, ref) => {
    return <Link ref={ref} scroll={scroll} {...props} />;
  }
);

AppLink.displayName = 'AppLink';

export { AppLink, type AppLinkProps };
