import React from 'react';
import { Link } from 'wouter';
import IVarseLogo from '@/components/ui/IVarseLogo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-dark border-t border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <IVarseLogo />
              <div className="ml-2 text-xl font-bold">I-VARSE</div>
            </div>
            <p className="text-gray-400 mb-6">
              Leading digital innovation company providing premium web development and IT consulting services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-light transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-light transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-light transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-light transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">HOW WE WORK</h4>
            <ul className="space-y-4">
              <li><Link href="/"><a className="text-gray-400 hover:text-primary-light transition-colors">About Us</a></Link></li>
              <li><Link href="/services"><a className="text-gray-400 hover:text-primary-light transition-colors">Services</a></Link></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-light transition-colors">Design and Research</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-light transition-colors">Development Process</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-light transition-colors">Customer Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">SERVICES</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-primary-light transition-colors">Cloud Infrastructure</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-light transition-colors">Mobile App Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-light transition-colors">Programming & Integration</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-light transition-colors">SEO Optimization</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-light transition-colors">Content Writing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">CONTACT</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-primary-light mt-1 mr-2"></i>
                <span className="text-gray-400">5 Adams Street, Off Nnamdi Rd, Surulere, Lagos, Nigeria</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt text-primary-light mt-1 mr-2"></i>
                <span className="text-gray-400">+234 123 456 7890</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope text-primary-light mt-1 mr-2"></i>
                <span className="text-gray-400">contact@i-varse.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} I-VARSE. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-primary-light transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-primary-light transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-primary-light transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
