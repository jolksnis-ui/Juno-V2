'use client';

import { useContext, useRef, ReactNode } from 'react';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface FrozenRouterProps {
  children: ReactNode;
}

/**
 * Freezes the router context during page transitions.
 * This allows AnimatePresence to properly animate out the old page content
 * before rendering the new page, preventing the "double animation" issue.
 */
export const FrozenRouter = ({ children }: FrozenRouterProps) => {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
};

FrozenRouter.displayName = 'FrozenRouter';
