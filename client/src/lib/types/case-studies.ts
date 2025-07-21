export interface CaseStudyProps {
  id: number;
  title: string;
  slug: string;
  description: string;
  client: string;
  industry: string;
  duration: string;
  teamSize: number;
  technologies: string[];
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  status: string;
  featured: boolean;
  publishedDate: string;
  content?: string;
  metrics?: { [key: string]: string };
  testimonial?: string;
  testimonialAuthor?: string;
  testimonialPosition?: string;
} 