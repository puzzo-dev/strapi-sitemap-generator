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
      "Partnering with I-VARSE transformed how we approach technology. Their consultancy didn't just solve immediate challenges—it positioned us strategically for sustained growth. The expertise and foresight they brought to our digital transformation journey have been invaluable.",
    rating: 5,
    image: "/default-avatar.jpg",
  },
  {
    id: 2,
    name: "Jasper Paul",
    content:
      "When operational inefficiencies threatened our bottom line, I-VARSE didn't just diagnose the problem—they architected a comprehensive solution. The platform they delivered eliminated friction, automated workflows, and gave us the visibility we needed to make confident decisions. Our trajectory has completely reversed.",
    rating: 5,
    image: "/default-avatar.jpg",
  },
  {
    id: 3,
    name: "Chukwudi Obasi",
    content:
      "The digital strategy expertise at I-VARSE is exceptional. Their content engineering and SEO approach increased our organic visibility by 60% while establishing thought leadership in our space. Multiple successful engagements later, they remain our trusted partner for digital excellence.",
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
