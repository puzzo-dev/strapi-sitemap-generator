import React from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface BlogPostErrorSectionProps {
  slug?: string;
}

const BlogPostErrorSection: React.FC<BlogPostErrorSectionProps> = ({ slug }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Alert variant="destructive" className="mb-8">
            <AlertDescription>
              {t('blog.postNotFound')}
            </AlertDescription>
          </Alert>
          <Link href="/blog">
            <Button variant="outline" className="flex items-center">
              <FiArrowLeft className="mr-2" /> {t('blog.backToBlog')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostErrorSection;