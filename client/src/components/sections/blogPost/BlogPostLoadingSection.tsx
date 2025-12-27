import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const BlogPostLoadingSection: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-8xl">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full mb-8 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostLoadingSection;