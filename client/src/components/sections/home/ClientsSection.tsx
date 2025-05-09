import React from 'react';
import { useClientLogos } from '@/hooks/useStrapiContent';
import { clientLogos } from '@/lib/data';

const ClientsSection: React.FC = () => {
  const { data: apiClientLogos, isLoading: isClientLogosLoading } = useClientLogos();

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            Trusted By Industry Leaders
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We work with leading companies around the world to transform their businesses through innovative digital solutions.
          </p>
        </div>

        {/* Client Logos */}
        <div className="mt-10">
          {isClientLogosLoading ? (
            <div className="flex overflow-x-hidden overflow-y-hidden pb-4 gap-8 justify-center items-center flex-wrap">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-32 h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex-shrink-0 mb-4"></div>
              ))}
            </div>
          ) : (
            <div className="flex overflow-x-hidden overflow-y-hidden pb-4 gap-8 justify-center items-center flex-wrap">
              {(apiClientLogos || clientLogos).map((client, index) => (
                <a
                  key={index}
                  href={client.url || "#"}
                  className="transition-opacity duration-300 hover:opacity-80 flex items-center justify-center flex-shrink-0 mb-4"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    src={client.image}
                    alt={client.name}
                    className="h-8 md:h-10 object-contain w-20 md:w-24 filter dark:invert dark:brightness-150 dark:contrast-75"
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;