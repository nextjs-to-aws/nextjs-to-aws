export const isDev = process.env.NODE_ENV === "development";

export const siteConfig = {
  name: "TheTea",
  productionUrl: isDev ? "http://localhost:3000" : "https://thetea.io",
  description:
    "A web application that allows you to subscribe to website url's to get latest updates whenever they change.",
  // url: isDev ? "http://localhost:3000" : "https://thetea.io",
  // ogImage: "https://tx.shadcn.com/og.jpg",
  // links: {
  //   twitter: "https://twitter.com/shadcn",
  //   github: "https://github.com/shadcn/taxonomy",
  // },
};
