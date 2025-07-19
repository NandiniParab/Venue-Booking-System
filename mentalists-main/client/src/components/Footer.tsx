
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#10182f] border-t text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-white">
                EazyVenue
              </span>
            </Link>
            <p className="text-sm text-white">
              Your premier destination for finding and booking the perfect venue for any occasion. Making venue booking effortless and memorable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/venues" className="block text-sm text-white hover:text-primary">
                Browse Venues
              </Link>
              <Link to="/how-it-works" className="block text-sm text-white hover:text-primary">
                How It Works
              </Link>
              <Link to="/pricing" className="block text-sm text-white hover:text-primary">
                Pricing
              </Link>
              <Link to="/blog" className="block text-sm text-white hover:text-primary">
                Blog
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Services</h3>
            <div className="space-y-2">
              <Link to="/help" className="block text-sm text-white hover:text-primary">
                Help Center
              </Link>
              <Link to="/contact" className="block text-sm text-white hover:text-primary">
                Contact Us
              </Link>
              <Link to="/privacy" className="block text-sm text-white hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-sm text-white hover:text-primary">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-white">
                <MapPin className="h-4 w-4" />
                <span>123 Business Street, Mumbai, Maharashtra 400001</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-white">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-white">
                <Mail className="h-4 w-4" />
                <span>hello@eazyvenue.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-white">
          <p>&copy; 2024 EazyVenue. All rights reserved. | <Link to="/privacy" className="underline">Privacy Policy</Link> | <Link to="/terms" className="underline">Terms of Service</Link></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
