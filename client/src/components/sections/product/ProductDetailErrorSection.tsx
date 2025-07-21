import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { PageContent } from "@/lib/types";

interface ProductDetailErrorSectionProps {
  error?: string;
  pageContent?: PageContent;
}

const ProductDetailErrorSection: React.FC<ProductDetailErrorSectionProps> = ({ 
  error,
  pageContent 
}) => {
  // Get error content from page content settings
  const errorSection = pageContent?.sections?.find(s => s.type === 'hero');
  const errorContent = errorSection?.settings?.productContent?.error?.notFound;

  // Default content if not available in pageContent
  const defaultContent = {
    title: "Product Not Found",
    description: "The product you're looking for doesn't exist or has been removed.",
    backButton: "Back to Products"
  };

  const content = errorContent || defaultContent;

  return (
    <div className="content-section bg-white dark:bg-[#132f4c] min-h-screen">
      <div className="container-custom py-16">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-2">
              {content.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {content.description}
            </p>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 mb-6">
                Error: {error}
              </p>
            )}
            <Button asChild>
              <a href="/products" className="inline-flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {content.backButton}
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailErrorSection;