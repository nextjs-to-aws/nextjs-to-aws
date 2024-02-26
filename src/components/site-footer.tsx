import * as React from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <section className="flex items-center justify-between p-2">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved
        </p>
      </section>
    </footer>
  );
}
