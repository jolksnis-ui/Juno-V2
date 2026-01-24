'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';

/** Auth routes where header should not appear */
const AUTH_ROUTES = ['/login', '/open-account', '/forgot-password'];

/**
 * Conditionally renders Header based on current route
 * Hidden on auth pages, visible on all other pages
 */
export function HeaderWrapper() {
  const pathname = usePathname();

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAuthRoute) return null;

  return <Header />;
}
