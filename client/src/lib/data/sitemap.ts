import { PageContent } from "@/lib/types/";
import { navItems } from "./config";
import { footerLinks } from "./footer";

// Extract main navigation links using prop drilling
const extractMainNavLinks = (): any[] => {
  const mainLinks: any[] = [];
  
  navItems.forEach((item) => {
    // Add main navigation item
    mainLinks.push({
      title: item.label,
      path: item.url.url,
      description: `Navigate to ${item.label.toLowerCase()} page`,
    });
    
    // Add child navigation items if they exist
    if (item.children && item.children.length > 0) {
      item.children.forEach((child) => {
        mainLinks.push({
          title: child.label,
          path: child.url.url,
          description: `Navigate to ${child.label.toLowerCase()} page`,
        });
      });
    }
  });
  
  return mainLinks;
};

// Extract footer column links using prop drilling
const extractFooterColumnLinks = (): any[] => {
  const footerColumnLinks: any[] = [];
  
  footerLinks.columns.forEach((column) => {
    column.links.forEach((link) => {
      if (link.title) {
        footerColumnLinks.push({
          title: link.title,
          path: link.href,
          description: `Access ${link.title.toLowerCase()} from footer`,
        });
      }
    });
  });
  
  return footerColumnLinks;
};

// Extract legal links using prop drilling
const extractLegalLinks = (): any[] => {
  return footerLinks.legalLinks.map((link) => ({
    title: link.title,
    path: link.href,
    description: `Legal information: ${link.title?.toLowerCase()}`,
  }));
};

export const sitemapContent: PageContent = {
    id: 1,
    slug: "sitemap",
    title: "Sitemap",
    description:
        "A complete guide to all the pages and resources available on our website.",
    metaTitle: "Sitemap | I-Varse Technologies",
    metaDescription:
        "Navigate through all pages and resources available on the I-Varse Technologies website.",
    sections: [
        {
            id: 1,
            type: "links",
            title: "Main Pages",
            settings: {
                links: extractMainNavLinks()
            }
        },
        {
            id: 2,
            type: "links",
            title: "Services",
            settings: {
                links: [
                    {
                        title: "Services Overview",
                        path: "/services",
                        description: "View all our technology services",
                    }
                ]
            }
        },
        {
            id: 3,
            type: "links",
            title: "Products & Solutions",
            settings: {
                links: [
                    {
                        title: "Products Overview",
                        path: "/products",
                        description: "View all our digital products and solutions",
                    }
                ]
            }
        },
        {
            id: 4,
            type: "links",
            title: "Industries",
            settings: {
                links: [
                    {
                        title: "Industries Overview",
                        path: "/industries",
                        description: "View all industries we serve",
                    }
                ]
            }
        },
        {
            id: 5,
            type: "links",
            title: "Case Studies",
            settings: {
                links: [
                    {
                        title: "Case Studies Overview",
                        path: "/case-studies",
                        description: "View all our success stories and case studies",
                    }
                ]
            }
        },
        {
            id: 6,
            type: "links",
            title: "Blog & Insights",
            settings: {
                links: [
                    {
                        title: "Blog Overview",
                        path: "/blog",
                        description: "Read our latest articles and insights",
                    }
                ]
            }
        },
        {
            id: 7,
            type: "links",
            title: "Legal & Policies",
            settings: {
                links: extractLegalLinks()
            }
        },
        {
            id: 8,
            type: "links",
            title: "Additional Resources",
            settings: {
                links: extractFooterColumnLinks()
            }
        },
    ],
}; 