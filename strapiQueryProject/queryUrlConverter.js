const qs = require('qs');

const queryString = 'populate[seo][fields][0]=metaTitle&populate[seo][fields][1]=metaDescription&populate[seo][fields][2]=ogTitle&populate[seo][fields][3]=ogDescription&populate[seo][populate][ogImage][fields][0]=url&populate[block][on][hero.hero-simple][populate][heroBadge][populate][fields][0]=badgeText&populate[block][on][hero.hero-simple][populate][heroBtns][populate][ctaLink][populate][page][fields][0]=title&populate[block][on][hero.hero-simple][populate][heroBtns][populate][ctaLink][populate][page][fields][1]=slug&populate[block][on][hero.hero-simple][populate][heroBtns][populate][ctaLink][fields][0]=label&populate[block][on][hero.hero-simple][populate][heroBtns][populate][ctaLink][fields][1]=linkType&populate[block][on][hero.hero-simple][populate][heroBtns][populate][ctaLink][fields][2]=externalUrl&populate[block][on][hero.hero-simple][fields][0]=title&populate[block][on][hero.hero-simple][fields][1]=description&populate[block][on][blocks.base-row][populate][badge][fields][0]=badgeText&populate[block][on][blocks.base-row][populate][baseCards][fields][0]=title&populate[block][on][blocks.base-row][populate][baseCards][fields][1]=cardContent&populate[block][on][blocks.base-row][populate][CaseStudies][fields][0]=caseStudiesTitle&populate[block][on][blocks.base-row][populate][CaseStudies][fields][1]=caseStudiesContent&populate[block][on][blocks.base-row][populate][cta][fields][0]=ctaContent&populate[block][on][blocks.base-row][populate][cta][populate][ctaButtons][populate][page][fields][0]=title&populate[block][on][blocks.base-row][populate][cta][populate][ctaButtons][populate][page][fields][1]=slug&populate[block][on][blocks.base-row][populate][cta][populate][ctaButtons][fields][0]=label&populate[block][on][blocks.base-row][populate][cta][populate][ctaButtons][fields][1]=linkType&populate[block][on][blocks.base-row][populate][Faqs][populate][faq][fields][0]=faqTitle&populate[block][on][blocks.base-row][populate][Faqs][populate][faq][fields][1]=faqAnswer&populate[block][on][blocks.cta-section][fields][0]=title&populate[block][on][blocks.cta-section][fields][1]=ctaContent&populate[block][on][blocks.cta-section][populate][ctaButtons][fields][0]=label&populate[block][on][blocks.cta-section][populate][ctaButtons][fields][1]=linkType&populate[block][on][blocks.cta-section][populate][ctaButtons][populate][page][fields][0]=title&populate[block][on][blocks.cta-section][populate][ctaButtons][populate][page][fields][1]=slug';



const parsedObject = qs.parse(queryString);

console.log(parsedObject);
// Output:
// {
//   filters: { title: { $eq: 'Hello' } },
//   populate: 'categories',
//   sort: 'createdAt:desc',
//   pagination: { page: '1' }
// }