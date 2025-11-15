import { ClientLogo } from '@/lib/types/layout';

export const clients: ClientLogo[] = [
  {
    id: 1,
    name: "Google",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    url: { url: "https://google.com" },
  },
  {
    id: 2,
    name: "Apple",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    url: { url: "https://apple.com" },
  },
  {
    id: 3,
    name: "Amazon",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    url: { url: "https://amazon.com" },
  },
  {
    id: 4,
    name: "Microsoft",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    url: { url: "https://microsoft.com" },
  },
  {
    id: 5,
    name: "Netflix",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    url: { url: "https://netflix.com" },
  },
];


export default clients;
