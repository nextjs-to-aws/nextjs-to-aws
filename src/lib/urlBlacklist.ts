export const domainBlacklist = ["reddit.com"];

export const checkIfDomainIsBlacklisted = (url: string) => {
  const parsedUrl = new URL(url);

  if (domainBlacklist.includes(parsedUrl.hostname)) {
    return true;
  }
  return false;
};
