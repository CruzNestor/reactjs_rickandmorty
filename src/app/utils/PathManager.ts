export function getNumberPageFromUrl(url: string) : number {
  const match = url.match(/(?:\/page\/|[?&]page=)([1-9]\d*)/)
  if (match) {
    return Number(match[1]);
  }
  return 1;
}

export function getSearchTextFromUrl(url: string) : string {
  const match = url.match(/(?:name=)([\w\s]+\w*)/)
  if (match) {
    return match[1];
  }
  return '';
}