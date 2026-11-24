import { CalendarCheck } from "lucide-react";
import { demoRequestUrl } from "@/lib/landing-content";

interface DemoLinkProps {
  className: string;
  /** Hide the icon where space is tight, such as the header. */
  showIcon?: boolean;
}

/** The single "Request a demo" entry point, so the label and destination change in one place. */
export default function DemoLink({ className, showIcon = true }: DemoLinkProps) {
  return (
    <a className={className} href={demoRequestUrl}>
      {showIcon && <CalendarCheck size={20} />}
      Request a demo
    </a>
  );
}
