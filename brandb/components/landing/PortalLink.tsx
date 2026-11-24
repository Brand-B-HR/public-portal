"use client";

import type { MouseEvent, ReactNode } from "react";
import { getAdminPortalUrl } from "@/lib/portal";

interface PortalLinkProps {
  className?: string;
  children: ReactNode;
}

/**
 * A link into the Admin Portal, which owns sign-in and sign-up.
 *
 * The static href is the configured or production URL. On click the hostname is checked so that a
 * developer running this site on localhost lands on the local Admin Portal instead.
 */
export default function PortalLink({ className, children }: PortalLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.href = getAdminPortalUrl(window.location.hostname);
  };

  return (
    <a href={getAdminPortalUrl()} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
