import React from 'react';
import { Link } from 'wouter';
import IVarseLogo from '@/components/ui/IVarseLogo';

// Import icons
import { MapPin, Phone, Mail, Twitter, Facebook, Instagram, Linkedin, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-[#0a1929] pt-20 pb-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container-custom">
        {/* Footer top section with newsletter */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-5 gap-12 pb-16 border-b border-gray-200 dark:border-gray-800">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <IVarseLogo size={50} />
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mb-8">
              Leading digital innovation company providing premium web development and IT consulting services for businesses looking to transform their digital presence.
            </p>
            
            {/* Newsletter subscription */}
            <div className="mt-8">
              <h4 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Subscribe to our newsletter</h4>
              <div className="flex gap-2 max-w-md">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="gradient-bg px-4 py-2 rounded-lg text-white flex items-center justify-center hover:opacity-90">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Footer links sections */}
          <div>
            <h4 className="text-base font-bold mb-6 text-gray-900 dark:text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                    About Us
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                    Services
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                    Products
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                    Contact
                  </div>
                </Link>
              </li>
              <li>
                <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  Careers
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base font-bold mb-6 text-gray-900 dark:text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              <li>
                <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  Web Development
                </div>
              </li>
              <li>
                <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  Mobile App Development
                </div>
              </li>
              <li>
                <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  Cloud Infrastructure
                </div>
              </li>
              <li>
                <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  IT Consulting
                </div>
              </li>
              <li>
                <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  Digital Marketing
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base font-bold mb-6 text-gray-900 dark:text-white uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">5 Adams Street, Off Nnamdi Rd, Surulere, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">+234 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">contact@i-varse.com</span>
              </li>
            </ul>
            
            {/* Social media icons */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} I-VARSE Limited. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              Terms of Service
            </div>
            <div className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              Privacy Policy
            </div>
            <div className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              Cookie Policy
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
