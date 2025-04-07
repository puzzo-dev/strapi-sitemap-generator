import React from 'react';
import { Link, useRoute } from 'wouter';
import { Calendar, Clock, Tag, User, ArrowLeft, Share2, MessageCircle, ThumbsUp, Bookmark, ArrowRight } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';

// Reuse blog posts data from the Blog component
const blogPosts = [
  {
    id: 1,
    title: "The Future of Cloud Computing in 2025",
    excerpt: "Explore the emerging trends in cloud computing and how they'll reshape business operations in the coming years.",
    content: `
      <p>Cloud computing has become the backbone of modern digital infrastructure, enabling businesses to scale operations, reduce costs, and increase flexibility. As we approach 2025, several emerging trends are set to reshape how organizations leverage cloud technologies.</p>
      
      <h2>1. Multi-Cloud Strategies Become Standard</h2>
      <p>Organizations are increasingly adopting multi-cloud approaches, utilizing services from multiple providers to avoid vendor lock-in and leverage the best capabilities from each platform. By 2025, we expect over 85% of enterprise organizations to implement multi-cloud strategies.</p>
      
      <h2>2. AI-Driven Cloud Management</h2>
      <p>Artificial intelligence will play a pivotal role in cloud management, from automatic resource allocation to predictive maintenance and security threat detection. AI-powered tools will optimize performance, reduce costs, and enhance security postures.</p>
      
      <h2>3. Edge Computing Integration</h2>
      <p>The proliferation of IoT devices and the need for real-time processing is driving cloud capabilities closer to the source of data generation. We'll see tighter integration between centralized cloud infrastructure and edge computing nodes, creating a seamless computing continuum.</p>
      
      <h2>4. Enhanced Security Measures</h2>
      <p>As cloud adoption grows, so do security challenges. Zero-trust architectures, advanced encryption, and AI-based threat detection will become standard components of cloud security strategies.</p>
      
      <h2>5. Serverless Computing Expansion</h2>
      <p>Serverless computing models will continue to gain traction, allowing developers to focus on code without worrying about the underlying infrastructure. This approach reduces operational overhead and enables more rapid innovation.</p>
      
      <h2>Conclusion</h2>
      <p>The cloud computing landscape in 2025 will be characterized by greater flexibility, intelligence, and integration. Organizations that prepare for these trends now will be better positioned to leverage cloud technologies for competitive advantage in the future.</p>
    `,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    date: "April 12, 2023",
    readTime: "5 min read",
    category: "Cloud Technology",
    featured: true,
    author: "Sarah Johnson",
    authorRole: "Cloud Solutions Architect",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    tags: ["Cloud Computing", "Digital Transformation", "Technology Trends", "IT Infrastructure"],
    relatedPosts: [2, 4, 6]
  },
  {
    id: 2,
    title: "Essential Mobile App Development Strategies for Startups",
    excerpt: "Learn the key strategies for developing mobile applications that can help your startup thrive in a competitive market.",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    date: "March 24, 2023",
    readTime: "8 min read",
    category: "Mobile Development",
    author: "David Chen"
  },
  {
    id: 3,
    title: "How AI is Transforming Customer Service",
    excerpt: "Discover the ways artificial intelligence is revolutionizing customer service experiences and improving business outcomes.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    date: "February 15, 2023",
    readTime: "6 min read",
    category: "Artificial Intelligence",
    author: "Emily Roberts"
  },
  {
    id: 4,
    title: "The Ultimate Guide to Cybersecurity in 2023",
    excerpt: "Protect your business with our comprehensive guide to the latest cybersecurity threats and mitigation strategies.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    date: "January 30, 2023",
    readTime: "10 min read",
    category: "Cybersecurity",
    author: "Michael Anderson"
  },
  {
    id: 5,
    title: "5 Ways to Improve Your Website's UX Design",
    excerpt: "Enhance user experience and boost conversions with these proven UX design principles for modern websites.",
    image: "https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    date: "December 12, 2022",
    readTime: "7 min read",
    category: "UX Design",
    author: "Olivia Martinez"
  },
  {
    id: 6,
    title: "Understanding Blockchain Beyond Cryptocurrency",
    excerpt: "Explore the practical applications of blockchain technology across various industries beyond crypto.",
    image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    date: "November 5, 2022",
    readTime: "9 min read",
    category: "Blockchain",
    author: "Daniel Taylor"
  }
];

const BlogPost: React.FC = () => {
  const [, params] = useRoute('/blog/:id');
  const postId = params?.id ? parseInt(params.id, 10) : -1;
  
  // Find the blog post by ID
  const post = blogPosts.find(post => post.id === postId);
  
  // Handle not found case
  if (!post) {
    return (
      <div className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="card p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link href="/blog">
              <a className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Back to Blog</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Get related posts if they exist
  const relatedPosts = post.relatedPosts 
    ? post.relatedPosts.map(id => blogPosts.find(post => post.id === id)).filter(Boolean)
    : blogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/40 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
          <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />
        </div>

        <div className="container-custom relative z-10 max-w-4xl">
          <Link href="/blog">
            <a className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Back to Blog</span>
            </a>
          </Link>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
              <Tag className="h-3 w-3 mr-1" />
              {post.category}
            </div>
            <div className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
              <Calendar className="h-3 w-3 mr-1" />
              {post.date}
            </div>
            <div className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
              <Clock className="h-3 w-3 mr-1" />
              {post.readTime}
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-6">{post.title}</h1>
          
          <div className="flex items-center mb-8">
            {post.authorImage ? (
              <img 
                src={post.authorImage} 
                alt={post.author} 
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-700 dark:text-blue-300 mr-4">
                <User className="w-6 h-6" />
              </div>
            )}
            <div>
              <div className="font-medium text-gray-800 dark:text-white">{post.author}</div>
              {post.authorRole && (
                <div className="text-sm text-gray-600 dark:text-gray-400">{post.authorRole}</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="content-section bg-white dark:bg-[#132f4c] pt-0 md:pt-0">
        <div className="container-custom max-w-5xl">
          <div className="relative h-64 md:h-96 overflow-hidden rounded-lg -mt-8 shadow-xl">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="content-section bg-white dark:bg-[#132f4c] pt-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar for larger screens */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 flex flex-col items-center space-y-6">
                <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  <ThumbsUp className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-8">
              <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-800 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300">
                <div dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }} />
              </article>
              
              {/* Tags */}
              {post.tags && (
                <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Link key={index} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                        <a className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                          {tag}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Author Info */}
              <div className="mt-12 p-6 bg-gray-50 dark:bg-[#0a1929] rounded-lg">
                <div className="flex items-center mb-4">
                  {post.authorImage ? (
                    <img 
                      src={post.authorImage} 
                      alt={post.author} 
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-700 dark:text-blue-300 mr-4">
                      <User className="w-8 h-8" />
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-lg text-gray-800 dark:text-white">{post.author}</div>
                    {post.authorRole && (
                      <div className="text-gray-600 dark:text-gray-400">{post.authorRole}</div>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Sarah is a cloud solutions architect with over 10 years of experience in designing and implementing scalable cloud infrastructure. She specializes in multi-cloud strategies and digital transformation.
                </p>
                <div className="mt-4">
                  <Link href="/team">
                    <a className="text-blue-600 dark:text-blue-400 font-medium hover:underline">View Profile</a>
                  </Link>
                </div>
              </div>
              
              {/* Social sharing on mobile */}
              <div className="mt-8 flex items-center justify-center space-x-4 lg:hidden">
                <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <ThumbsUp className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <MessageCircle className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Bookmark className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Right sidebar / related posts */}
            <div className="lg:col-span-3">
              <div className="sticky top-24">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Related Articles</h3>
                <div className="space-y-6">
                  {relatedPosts.map(related => related && (
                    <div key={related.id} className="group">
                      <Link href={`/blog/${related.id}`}>
                        <a className="block">
                          <div className="aspect-video rounded-lg overflow-hidden mb-3">
                            <img 
                              src={related.image} 
                              alt={related.title} 
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <h4 className="font-medium text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                            {related.title}
                          </h4>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{related.date}</span>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <Link href="/blog">
                    <a className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium">
                      <span>View all articles</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="content-section bg-gray-50 dark:bg-[#0a1929]">
        <div className="container-custom max-w-4xl">
          <div className="card p-8 md:p-12 shadow-md border border-gray-100 dark:border-gray-800 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">Subscribe to TechVision Insights</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Get the latest articles, resources, and insights delivered straight to your inbox. Stay ahead in the technology space with our expert analysis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-[#132f4c] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <GradientButton className="px-6 whitespace-nowrap">Subscribe Now</GradientButton>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              We respect your privacy and will never share your information. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPost;