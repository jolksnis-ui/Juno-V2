'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';

/** Auth routes where header should not appear */
const AUTH_ROUTES = ['/login', '/open-account', '/forgot-password'];

/** Routes where header should use dark theme */
const DARK_HEADER_ROUTES = ['/corporate-account'];

/**
 * Conditionally renders Header based on current route
 * Hidden on auth pages, dark theme on corporate page, light theme elsewhere
 */
export function HeaderWrapper() {
  const pathname = usePathname();

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAuthRoute) return null;

  const isDark = DARK_HEADER_ROUTES.includes(pathname);

  return <Header isDark={isDark} />;
}
