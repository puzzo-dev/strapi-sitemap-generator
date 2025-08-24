import React from 'react';
import { DynamicContentProps } from '@/lib/types';



/**
 * Component to render dynamic content from Strapi CMS
 * Handles both plain text and rich text formats
 */
const DynamicContent: React.FC<DynamicContentProps> = ({ content }) => {
  // If content is a string, render it as HTML
  if (typeof content === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
  
  // If content is a Strapi rich text object
  if (content && typeof content === 'object') {
    // Handle Strapi's rich text format (could be blocks)
    if (Array.isArray(content.blocks)) {
      return (
        <>
          {content.blocks.map((block: any, index: number) => {
            switch (block.type) {
              case 'paragraph':
                return <p key={index} className="mb-4">{block.text}</p>;
              case 'heading':
                const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
                return <HeadingTag key={index} className="mt-6 mb-4">{block.text}</HeadingTag>;
              case 'list':
                if (block.format === 'ordered') {
                  return (
                    <ol key={index} className="list-decimal pl-5 mb-4">
                      {block.items.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <ul key={index} className="list-disc pl-5 mb-4">
                    {block.items.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
              case 'code':
                return (
                  <pre key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4 overflow-auto">
                    <code>{block.code}</code>
                  </pre>
                );
              case 'quote':
                return (
                  <blockquote key={index} className="border-l-4 border-blue-500 pl-4 italic mb-4">
                    {block.text}
                  </blockquote>
                );
              case 'image':
                return (
                  <div key={index} className="my-6">
                    <img 
                      src={block.url} 
                      alt={block.caption || 'Image'} 
                      className="max-w-full h-auto rounded"
                    />
                    {block.caption && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                        {block.caption}
                      </p>
                    )}
                  </div>
                );
              default:
                return <div key={index}>{JSON.stringify(block)}</div>;
            }
          })}
        </>
      );
    }
    
    // Handle Strapi's older format or custom object structure
    if (content.html) {
      return <div dangerouslySetInnerHTML={{ __html: content.html }} />;
    }
    
    // Fallback for unknown object structure
    return <div>{JSON.stringify(content)}</div>;
  }
  
  // Fallback for empty or invalid content
  return <p>No content available.</p>;
};

export default DynamicContent;