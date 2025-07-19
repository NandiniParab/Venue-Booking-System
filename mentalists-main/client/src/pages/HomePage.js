import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Shield, Award, ArrowDown, CheckCircle, Users, Star } from 'lucide-react';
import { Button } from '../components/button';
import HeroSection from '../components/home/HeroSection';
import FeaturedVenues from '../components/home/FeaturedVenues';

const testimonials = [
  {
    name: 'Amit Sharma',
    quote: 'Booking my wedding venue was so easy and stress-free. Highly recommend EazyVenue!',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Priya Singh',
    quote: 'The best prices and verified venues. I found the perfect place for my birthday!',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Rahul Verma',
    quote: 'Support was amazing and the process was super smooth. Will use again!',
    image: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-[#ffe9c1]">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200" alt="Venue Hero" className="absolute inset-0 w-full h-full object-cover object-center z-0" style={{filter:'brightness(0.6)'}} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#620808]/80 to-[#a53f3f]/60 z-10" />
        <div className="relative z-20 text-center max-w-2xl mx-auto py-20 px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">Find & Book Your <span className="text-[#f4ce74]">Dream Venue</span></h1>
          <p className="text-xl text-[#ffe9c1] mb-8">India's most trusted venue booking platform</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <input
              type="text"
              placeholder="Search venues by name, location, or type..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="rounded-2xl px-6 py-4 text-lg border-0 focus:ring-2 focus:ring-[#a53f3f] w-full sm:w-96"
              style={{background:'#ffe9c1', color:'#3a0303'}}
            />
            <Button size="lg" className="rounded-2xl text-lg bg-[#a53f3f] text-white hover:bg-[#3a0303]" asChild>
              <Link to={`/venues?search=${encodeURIComponent(searchTerm)}`}>Search</Link>
            </Button>
          </div>
          <div className="flex flex-col items-center mt-8 animate-bounce">
            <ArrowDown className="h-8 w-8 text-[#f4ce74]" />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3a0303]">Why Choose EazyVenue?</h2>
            <p className="text-xl text-[#a53f3f]">We make venue booking effortless and memorable</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center space-y-6 p-8 rounded-3xl shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl" style={{background:'#f4ce74'}}>
              <div className="w-20 h-20 bg-[#a53f3f] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Search className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#3a0303]">Smart Search</h3>
              <p className="text-[#000]">Find perfect matches for your event</p>
            </div>
            <div className="text-center space-y-6 p-8 rounded-3xl shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl" style={{background:'#f4ce74'}}>
              <div className="w-20 h-20 bg-[#a53f3f] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#3a0303]">Verified Quality</h3>
              <p className="text-[#000]">Every venue is personally verified for quality</p>
            </div>
            <div className="text-center space-y-6 p-8 rounded-3xl shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl" style={{background:'#f4ce74'}}>
              <div className="w-20 h-20 bg-[#a53f3f] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#3a0303]">Best Price</h3>
              <p className="text-[#000]">Transparent pricing, no hidden fees</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Venues Carousel */}
      <section className="py-20 bg-[#f4ce74]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3a0303] mb-4">Featured Venues</h2>
            <p className="text-xl text-[#a53f3f]">Handpicked venues loved by our users</p>
          </div>
          <FeaturedVenues />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3a0303] mb-4">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center space-y-4">
              <CheckCircle className="h-12 w-12 text-[#a53f3f]" />
              <h3 className="text-xl font-bold text-[#3a0303]">1. Discover</h3>
              <p className="text-[#a53f3f]">Browse and search for venues that fit your needs</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center space-y-4">
              <Users className="h-12 w-12 text-[#a53f3f]" />
              <h3 className="text-xl font-bold text-[#3a0303]">2. Book</h3>
              <p className="text-[#a53f3f]">Check availability and book instantly online</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center space-y-4">
              <Star className="h-12 w-12 text-[#a53f3f]" />
              <h3 className="text-xl font-bold text-[#3a0303]">3. Celebrate</h3>
              <p className="text-[#a53f3f]">Enjoy your event at a verified, top-rated venue</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#ffe9c1]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3a0303] mb-4">What Our Users Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center space-y-4">
                <img src={t.image} alt={t.name} className="w-20 h-20 rounded-full object-cover border-4 border-[#a53f3f]" />
                <p className="text-[#3a0303] italic">“{t.quote}”</p>
                <div className="font-bold text-[#a53f3f]">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden" style={{background:'#a53f3f'}}>
            <div className="relative space-y-8 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to Find Your Dream Venue?</h2>
              <p className="text-xl text-[#ffe9c1]">Join thousands of happy customers who found their perfect venues with us</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-2xl text-lg bg-white text-[#a53f3f] border-2 border-[#a53f3f] hover:bg-[#a53f3f] hover:text-white" asChild>
                  <Link to="/venues">Start Searching</Link>
                </Button>
                <Button size="lg" className="rounded-2xl text-lg bg-[#3a0303] text-white hover:bg-[#a53f3f]" asChild>
                  <Link to="/register">List Your Venue</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;