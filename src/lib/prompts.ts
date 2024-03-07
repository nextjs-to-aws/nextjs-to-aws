export const promptToCheckCrawlersAreAllowed = (
  robotsPageContent: string,
  urlToCrawl: string,
) => ({
  systemPrompt:
    "You are an AI service that determines if a website is crawlable based on it's robot.txt page, you only respond with true or false",
  prompt: `Based on this robots.txt page: "${robotsPageContent}", is ${urlToCrawl} crawlable? Respond only with true or false.`,
});

export interface IScrapedUrlResponseItem {
  title: string;
  imageUrl: string;
  summary: string;
  date: string;
}

export interface IScrapedUrlResponse {
  summary: string;
  list: IScrapedUrlResponseItem[];
}

const exampleJson: IScrapedUrlResponse = {
  summary: "This website is about x and y",
  list: [
    {
      title: "Some title",
      imageUrl: "https://example.com/image.png",
      summary: "This item is about x and y",
      date: "02/02/2022",
    },
    {
      title: "Other title",
      imageUrl: "https://example.com/image.png",
      summary: "This item is about x and y",
      date: "03/02/2022",
    },
  ],
};

export const promptToParseHtml = (htmlString: string, url: string) => ({
  systemPrompt:
    "You are an AI service that parses html, you only respond with json",
  prompt: `Based on this html string: "${htmlString}", using this json as a reference ${JSON.stringify(exampleJson)}, return a short summary of the whole page for the top summary value. In the list, return any repeating items, following the reference list example, include a brief summary of what the item is about. For any img tag inside that item, if the src doesn't already include the url (${url}), then compose the imageUrl with the ${url} plus the source, if it's alredy there then return the src as imageUrl. Only respond with json, in this format: ${JSON.stringify(exampleJson)}.`,
});

export const exampleChatResponse: IScrapedUrlResponse = {
  summary:
    "This website is about personal blog, programming, and technology-related topics.",
  list: [
    {
      title: "Understanding PATH",
      imageUrl: "https://tonyjara.com/assets/birbs/gygis.jpeg",
      summary: "This item is about x and y",
      date: "02/02/2022",
    },
    {
      title: "Where(), is(), and has(), CSS Pseudo classes",
      imageUrl: "https://tonyjara.com/assets/birbs/blackleggedseriema.jpeg",
      summary: "This item is about x and y",
      date: "02/02/2022",
    },
    {
      title: "My take on progressive enhancement",
      imageUrl: "https://tonyjara.com/assets/birbs/federal.jpg",
      summary: "This item is about x and y",
      date: "02/02/2022",
    },
    {
      title: "Chakra-ui Drag-n-Drop for images",
      imageUrl: "https://tonyjara.com/assets/birbs/avionsito.jpg",
      summary: "This item is about x and y",
      date: "02/02/2022",
    },
    {
      title: "Testing Postgres on NextJs api's with Jest and Typescript",
      imageUrl: "https://tonyjara.com/assets/birbs/avionsito.jpg",
      summary: "This item is about x and y",
      date: "02/02/2022",
    },
  ],
};
