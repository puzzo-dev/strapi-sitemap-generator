import {
  TestimonialProps,
  ClientLogo
} from '@/lib/types';

// Import testimonial images
import maziGodwinImg from '@/assets/images/IMG_2247.JPG';
import jasperPaulImg from '@/assets/images/IMG_2248.JPG';
import chukwudiObasiImg from '@/assets/images/IMG_2249.JPG';

export const testimonials: TestimonialProps[] = [
  {
    id: 1,
    name: "Mazi Godwin",
    content:
      "I-Varse has a professional group of IT specialists. I am grateful for the consultancy services they rendered me. I recommend them to anyone who plans to take their business to the future.",
    rating: 5,
    image: "/default-avatar.jpg",
  },
  {
    id: 2,
    name: "Jasper Paul",
    content:
      "My business model was in a slump. I didn't know what to do, and I kept losing money. Then I contacted I-Varse, and now my business is up and running. Thank you, I-Varse!",
    rating: 5,
    image: "/default-avatar.jpg",
  },
  {
    id: 3,
    name: "Chukwudi Obasi",
    content:
      "I-Varse has the best SEO content writing service. I have used them for more projects than I can count. Their team's blog writing work has increased my company's Google ranking by 60%.",
    rating: 5,
    image: "/default-avatar.jpg",
  },
];

export const clientLogos: ClientLogo[] = [
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
