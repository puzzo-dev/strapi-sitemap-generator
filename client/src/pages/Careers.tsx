import React from 'react';

// Import section components
import {
  CareersHeroSection,
  WhyJoinUsSection,
  BenefitsSection,
  OpenPositionsSection,
  CareersCTASection,
} from '@/components/sections/careers';

const Careers: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <CareersHeroSection />

      {/* Why Join Us Section */}
      <WhyJoinUsSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Open Positions Section */}
      <OpenPositionsSection />

      {/* CTA Section */}
      <CareersCTASection />
    </>
  );
};

export default Careers;