import React, { useState } from 'react';
import { Calendar, Tag, Clock, Search, ArrowRight, MessageCircle, ChevronRight, User } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { Link } from 'wouter';

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Cloud Computing in 2025",
    excerpt: "Explore the emerging trends in cloud computing and how they'll reshape business operations in the coming years.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    date: "April 12, 2023",
    readTime: "5 min read",
    category: "Cloud Technology",
    featured: true,
    author: "Sarah Johnson"
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

// Blog categories
const categories = [
  "All Categories",
  "Cloud Technology",
  "Mobile Development",
  "Artificial Intelligence",
  "Cybersecurity",
  "UX Design",
  "Blockchain"
];

const Blog: React.FC = () => {
  // State for filtering and search
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  
  // Filter posts based on search term and selected category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All Categories' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Separate featured post from other posts
  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/50 to-white dark:from-[#0a192f] dark:via-[#0c1e3a] dark:to-[#132f4c] py-16 md:pt-24 md:pb-16 border-b border-blue-100 dark:border-blue-900/40 hero-section">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-900/40 animate-pulse-slow" />
          <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/30 animate-pulse-slower" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 mb-4 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
              TechVision Insights
            </div>
            
            <h1 className="heading-xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="gradient-text">Insights</span> & Discoveries
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Stay ahead of the curve with our latest articles, expert insights, and technology trend analyses.
            </p>
            
            <div className="max-w-2xl mx-auto relative animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  className="bg-white dark:bg-[#132f4c] border border-gray-200 dark:border-gray-700 rounded-full py-3 pl-12 pr-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Search for articles..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="flex items-center space-x-2 mb-8">
            <div className="h-1 w-10 bg-blue-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Featured Article</h2>
          </div>
          
          {featuredPost ? (
            <div key={featuredPost.id} className="grid grid-cols-1 lg:grid-cols-5 gap-8 card overflow-hidden p-0">
              <div className="lg:col-span-3 relative h-64 lg:h-auto">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-2 p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                    <Tag className="h-3 w-3 mr-1" />
                    {featuredPost.category}
                  </div>
                  <div className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                    <Calendar className="h-3 w-3 mr-1" />
                    {featuredPost.date}
                  </div>
                  <div className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                    <Clock className="h-3 w-3 mr-1" />
                    {featuredPost.readTime}
                  </div>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-800 dark:text-white">{featuredPost.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-700 dark:text-blue-300 mr-3">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{featuredPost.author}</span>
                </div>
                
                <GradientButton href={`/blog/${featuredPost.id}`} endIcon={<ArrowRight />}>
                  Read Article
                </GradientButton>
              </div>
            </div>
          ) : (
            <div className="card p-8 text-center">
              <p className="text-gray-600 dark:text-gray-300">No featured articles found with the current filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="content-section bg-gradient-to-b from-gray-50 to-white dark:from-[#0a1929] dark:to-[#0a1929] transition-colors duration-300">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-1 w-10 bg-blue-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Latest Articles</h2>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white">Stay Informed with TechVision</h3>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-2 md:gap-3 overflow-x-auto pb-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    category === activeCategory
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white dark:bg-[#132f4c] text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map(post => (
                <div key={post.id} className="card overflow-hidden p-0 hover-lift group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 inline-flex items-center rounded-full bg-blue-50/90 dark:bg-blue-900/80 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                      <Tag className="h-3 w-3 mr-1" />
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1.5" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center mb-5">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-700 dark:text-blue-300 mr-2">
                        <User className="w-3 h-3" />
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-300">{post.author}</span>
                    </div>
                    
                    <Link href={`/blog/${post.id}`}>
                      <a className="button-spec group">
                        <span>Read More</span>
                        <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center">
              <p className="text-gray-600 dark:text-gray-300">No articles found matching your search criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All Categories');
                }}
                className="mt-4 text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
          
          {regularPosts.length > 0 && (
            <div className="mt-12 text-center">
              <GradientButton href="/blog/archive" variant="outline">
                Load More Articles
              </GradientButton>
            </div>
          )}
        </div>
      </section>

      {/* Single Post Templates */}
      <section className="content-section bg-white dark:bg-[#132f4c]">
        <div className="container-custom">
          <div className="flex items-center space-x-2 mb-8">
            <div className="h-1 w-10 bg-blue-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Explore More</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member Template */}
            <div className="card p-6 hover-lift">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-300 mr-4">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">Team Members</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Meet our experts</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Learn more about the skilled professionals behind our success and innovation.
              </p>
              <Link href="/team">
                <a className="flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline">
                  <span>View Team Profiles</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </Link>
            </div>
            
            {/* Services Template */}
            <div className="card p-6 hover-lift">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-700 dark:text-purple-300 mr-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">Services</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Solutions we offer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Explore our comprehensive range of services designed to transform your business.
              </p>
              <Link href="/services">
                <a className="flex items-center text-purple-600 dark:text-purple-400 font-medium hover:underline">
                  <span>Explore Our Services</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </Link>
            </div>
            
            {/* Blog Articles Template */}
            <div className="card p-6 hover-lift">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-700 dark:text-amber-300 mr-4">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">Latest Articles</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Industry insights</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Dive into our thought leadership content and stay updated with the latest tech trends.
              </p>
              <Link href="/blog/categories">
                <a className="flex items-center text-amber-600 dark:text-amber-400 font-medium hover:underline">
                  <span>Browse by Categories</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="content-section bg-gradient-to-b from-gray-50 to-white dark:from-[#0a1929] dark:to-[#132f4c]">
        <div className="container-custom">
          <div className="gradient-bg rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Stay updated with our latest insights, industry news, and exclusive content delivered straight to your inbox.
              </p>
              
              <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-grow px-4 py-3 rounded-lg border-2 border-blue-400/30 focus:outline-none focus:border-blue-300"
                />
                <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
                  Subscribe
                </button>
              </div>
              
              <p className="text-sm text-white/70 mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;