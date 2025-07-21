import {
  Benefit
} from '@/lib/types';
import { products } from './products';
import { services } from './services';
import { jobListings } from './jobs';

// Extended type for benefits with source tracking (internal use only)
interface BenefitWithSource extends Benefit {
  source: string;
  sourceId: number;
  sourceSlug?: string;
  sourceTitle: string;
}

// Extract all benefits from products, services, and job listings using pure prop drilling
const extractAllBenefits = (): BenefitWithSource[] => {
  const allBenefits: BenefitWithSource[] = [];
  let benefitId = 1;

  // Extract benefits from products
  products.forEach((product) => {
    if (product.benefits?.items) {
      product.benefits.items.forEach((item) => {
        allBenefits.push({
          id: benefitId++,
          title: item.title || '',
          description: item.description || '',
          icon: item.icon || 'Star',
          translationKey: `${product.slug || 'product'}-benefit-${item.id}`,
          source: 'product',
          sourceId: product.id,
          sourceSlug: product.slug || '',
          sourceTitle: product.title
        });
      });
    }
  });

  // Extract benefits from services
  services.forEach((service) => {
    if (service.benefits?.items) {
      service.benefits.items.forEach((item) => {
        allBenefits.push({
          id: benefitId++,
          title: item.title || '',
          description: item.description || '',
          icon: 'Star',
          translationKey: `${service.slug || 'service'}-benefit-${item.id}`,
          source: 'service',
          sourceId: service.id,
          sourceSlug: service.slug || '',
          sourceTitle: service.title
        });
      });
    }
  });

  // Extract benefits from job listings
  const uniqueJobBenefits = new Set<string>();
  jobListings.forEach((job) => {
    if (job.benefits && Array.isArray(job.benefits)) {
      job.benefits.forEach((benefit) => {
        uniqueJobBenefits.add(benefit);
      });
    }
  });

  // Convert unique job benefits to Benefit objects
  Array.from(uniqueJobBenefits).forEach((benefit) => {
    allBenefits.push({
      id: benefitId++,
      title: benefit,
      // description: `Comprehensive benefit available across our positions`,
      icon: 'Award',
      translationKey: `job-benefit-${benefit.toLowerCase().replace(/\s+/g, '-')}`,
      source: 'job',
      sourceId: 0, // No specific job ID since it's a general benefit
      sourceSlug: 'general',
      sourceTitle: 'Job Benefits'
    });
  });

  return allBenefits;
};

// Create the unified benefits object
export const benefits = {
  // Single data source containing all benefits (internal with source tracking)
  _data: extractAllBenefits(),
  
  // Public data following Benefit interface exactly
  get data(): Benefit[] {
    return this._data.map(({ source, sourceId, sourceSlug, sourceTitle, ...benefit }) => benefit);
  },
  
  // Helper methods for accessing benefits (returning proper Benefit objects)
  getAll: (): Benefit[] => {
    return benefits.data;
  },
  
  getBySource: (source: string): Benefit[] => {
    return benefits._data
      .filter(benefit => benefit.source === source)
      .map(({ source, sourceId, sourceSlug, sourceTitle, ...benefit }) => benefit);
  },
  
  getByProduct: (productSlug: string): Benefit[] => {
    return benefits._data
      .filter(benefit => benefit.source === 'product' && benefit.sourceSlug === productSlug)
      .map(({ source, sourceId, sourceSlug, sourceTitle, ...benefit }) => benefit);
  },
  
  getByService: (serviceSlug: string): Benefit[] => {
    return benefits._data
      .filter(benefit => benefit.source === 'service' && benefit.sourceSlug === serviceSlug)
      .map(({ source, sourceId, sourceSlug, sourceTitle, ...benefit }) => benefit);
  },
  
  getBySourceId: (sourceId: number): Benefit[] => {
    return benefits._data
      .filter(benefit => benefit.sourceId === sourceId)
      .map(({ source, sourceId, sourceSlug, sourceTitle, ...benefit }) => benefit);
  },
  
  getBySourceTitle: (sourceTitle: string): Benefit[] => {
    return benefits._data
      .filter(benefit => benefit.sourceTitle === sourceTitle)
      .map(({ source, sourceId, sourceSlug, sourceTitle, ...benefit }) => benefit);
  },
  
  getProductBenefits: (): Benefit[] => {
    return benefits.getBySource('product');
  },
  
  getServiceBenefits: (): Benefit[] => {
    return benefits.getBySource('service');
  },
  
  getJobBenefits: (): Benefit[] => {
    return benefits.getBySource('job');
  },
  
  getUniqueJobBenefits: (): Benefit[] => {
    // This ensures we get unique job benefits (already handled in extraction)
    return benefits.getBySource('job');
  },
  
  getJobBenefitsByPosition: (jobSlug: string): Benefit[] => {
    return benefits._data
      .filter(benefit => benefit.source === 'job' && benefit.sourceSlug === jobSlug)
      .map(({ source, sourceId, sourceSlug, sourceTitle, ...benefit }) => benefit);
  },
  
  search: (query: string): Benefit[] => {
    const lowerQuery = query.toLowerCase();
    return benefits._data
      .filter(benefit => 
        benefit.title.toLowerCase().includes(lowerQuery) ||
        benefit.description?.toLowerCase().includes(lowerQuery) ||
        benefit.sourceTitle.toLowerCase().includes(lowerQuery)
      )
      .map(({ source, sourceId, sourceSlug, sourceTitle, ...benefit }) => benefit);
  },
  
  getUniqueSources: (): string[] => {
    const sources = benefits._data.map(benefit => benefit.source);
    return Array.from(new Set(sources));
  },
  
  getSourceCounts: (): { [key: string]: number } => {
    const counts: { [key: string]: number } = {};
    benefits._data.forEach(benefit => {
      counts[benefit.source] = (counts[benefit.source] || 0) + 1;
    });
    return counts;
  }
};

// Export the unified benefits object
export default benefits;
