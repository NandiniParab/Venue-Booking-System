
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#a53f3f]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#a53f3f] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-black">EazyVenue</span>
            </Link>
            <p className="text-sm text-black">
              Your premier destination for finding and booking the perfect venue for any occasion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-black hover:text-[#a53f3f]">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-black hover:text-[#a53f3f]">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-black hover:text-[#a53f3f]">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-black hover:text-[#a53f3f]">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-black">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/venues" className="block text-sm text-black hover:text-[#a53f3f]">Browse Venues</Link>
              <Link to="/how-it-works" className="block text-sm text-black hover:text-[#a53f3f]">How It Works</Link>
              <Link to="/pricing" className="block text-sm text-black hover:text-[#a53f3f]">Pricing</Link>
              <Link to="/blog" className="block text-sm text-black hover:text-[#a53f3f]">Blog</Link>
            </div>
          </div>
          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-black">Support</h3>
            <div className="space-y-2">
              <Link to="/help" className="block text-sm text-black hover:text-[#a53f3f]">Help Center</Link>
              <Link to="/contact" className="block text-sm text-black hover:text-[#a53f3f]">Contact Us</Link>
              <Link to="/privacy" className="block text-sm text-black hover:text-[#a53f3f]">Privacy Policy</Link>
              <Link to="/terms" className="block text-sm text-black hover:text-[#a53f3f]">Terms of Service</Link>
            </div>
          </div>
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-black">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-black">
                <MapPin className="h-4 w-4" />
                <span>123 Business St, City, State 12345</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-black">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-black">
                <Mail className="h-4 w-4" />
                <span>hello@eazyvenue.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-black border-[#a53f3f]">
          <p>&copy; 2024 EazyVenue. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
