/**
 * Layout for main site pages
 * Header is rendered globally via HeaderWrapper in root layout
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
