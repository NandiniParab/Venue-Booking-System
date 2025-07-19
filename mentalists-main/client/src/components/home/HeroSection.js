import React from 'react';
import { Search, MapPin, Calendar, Users, CheckCircle, Shield, Award } from 'lucide-react';
import { Button } from '../button';
import { Input } from '../input';

const HeroSection = () => {
  return (
    <section className="relative hero-gradient py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Find Your
              <span className="text-gradient block">Perfect Venue</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Discover extraordinary venues for weddings, events, and celebrations across India
            </p>
          </div>

          {/* Search Box */}
          <div className="glass-card rounded-3xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Where?" 
                  className="pl-12 h-14 border-0 bg-background/60 text-lg rounded-2xl"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="When?" 
                  type="date" 
                  className="pl-12 h-14 border-0 bg-background/60 text-lg rounded-2xl"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Guests?" 
                  className="pl-12 h-14 border-0 bg-background/60 text-lg rounded-2xl"
                />
              </div>
              <Button className="h-14 text-lg font-medium rounded-2xl bg-primary hover:bg-primary/90">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span>Instant Booking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-accent" />
                <span>Verified Venues</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-accent" />
                <span>Best Price Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;