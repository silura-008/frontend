import React from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 sm:mb-0">
            <a
              href="https://www.facebook.com/"
              className="text-gray-400 hover:text-white transition-colors duration-300 rounded-full p-2 bg-gray-800 hover:bg-gray-700"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/"
              className="text-gray-400 hover:text-white transition-colors duration-300 rounded-full p-2 bg-gray-800 hover:bg-gray-700"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/"
              className="text-gray-400 hover:text-white transition-colors duration-300 rounded-full p-2 bg-gray-800 hover:bg-gray-700"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} mindcare. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
