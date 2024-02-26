import { type DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Posts",
      href: "/home",
      icon: "post",
    },
    {
      title: "Billing",
      href: "/home/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/home/settings",
      icon: "settings",
    },
  ],
};
