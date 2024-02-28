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
      title: "Feed",
      href: "/feed",
      icon: "coffee",
    },
    {
      title: "Subscriptions",
      href: "/home",
      icon: "mailbox",
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
