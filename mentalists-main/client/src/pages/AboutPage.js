import React from 'react';
import { Users, Target, Award, Globe, Heart, Star, Zap, Shield } from 'lucide-react';
import { Card, CardContent } from '../components/card';
import { Button } from '../components/button';

const AboutPage = () => {
  const stats = [
    { number: "50,000+", label: "Happy Customers", icon: <Users className="h-8 w-8" /> },
    { number: "10,000+", label: "Venues Listed", icon: <Globe className="h-8 w-8" /> },
    { number: "500+", label: "Cities Covered", icon: <Target className="h-8 w-8" /> },
    { number: "15+", label: "Years Experience", icon: <Award className="h-8 w-8" /> }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
      description: "Visionary leader with 15+ years in hospitality industry"
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300",
      description: "Operations expert ensuring seamless venue bookings"
    },
    {
      name: "Arjun Patel",
      role: "Technology Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      description: "Tech innovator building cutting-edge solutions"
    },
    {
      name: "Sneha Reddy",
      role: "Customer Success",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
      description: "Dedicated to ensuring customer satisfaction"
    }
  ];

  const values = [
    {
      icon: <Heart className="h-12 w-12" />,
      title: "Customer First",
      description: "We put our customers at the heart of everything we do, ensuring their special moments are perfect."
    },
    {
      icon: <Star className="h-12 w-12" />,
      title: "Quality Assured",
      description: "Every venue and vendor on our platform is carefully vetted to meet our high standards."
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "Innovation",
      description: "We continuously innovate to provide the best booking experience with cutting-edge technology."
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Trust & Safety",
      description: "We ensure secure transactions and reliable services for complete peace of mind."
    }
  ];

  return (
    <div className="min-h-screen bg-[#ffe9c1]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-[#620808]">
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">About EazyVenue</h1>
            <p className="text-xl text-[#f4ce74] mb-8">We're on a mission to make venue booking effortless and memorable for everyone</p>
          </div>
        </div>
      </section>
      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#3a0303]">Our Story</h2>
              <p className="text-lg text-[#000]">Founded in 2009, EazyVenue began with a simple vision: to transform how people find and book venues for their special occasions. What started as a small startup has grown into India's leading venue booking platform.</p>
              <p className="text-lg text-[#000]">We understand that every event is unique and special. That's why we've built a platform that not only helps you find the perfect venue but also connects you with trusted vendors and services to make your event unforgettable.</p>
              <p className="text-lg text-[#000]">Today, we're proud to serve over 50,000 customers across 500+ cities, offering a curated selection of venues and vendors that meet our stringent quality standards.</p>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=600" alt="Our Story" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16" style={{background:'#f4ce74'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#3a0303]">Our Impact</h2>
            <p className="text-xl text-[#a53f3f]">Numbers that reflect our commitment to excellence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center rounded-2xl shadow-lg" style={{background:'#ffe9c1'}}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#a53f3f] flex items-center justify-center text-white mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-[#3a0303] mb-2">{stat.number}</div>
                  <div className="text-[#000]">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#3a0303]">Our Values</h2>
            <p className="text-xl text-[#a53f3f]">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center space-y-4 rounded-2xl shadow-lg" style={{background:'#f4ce74'}}>
                <div className="w-20 h-20 mx-auto rounded-full bg-[#a53f3f] flex items-center justify-center text-white">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-[#3a0303]">{value.title}</h3>
                <p className="text-[#000]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-16" style={{background:'#ffe9c1'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#3a0303]">Meet Our Team</h2>
            <p className="text-xl text-[#a53f3f]">The passionate people behind EazyVenue</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="rounded-2xl shadow-lg" style={{background:'#f4ce74'}}>
                <CardContent className="p-6 text-center">
                  <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                  <h3 className="text-xl font-bold text-[#3a0303] mb-2">{member.name}</h3>
                  <p className="text-[#a53f3f] font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-[#000]">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-[#3a0303]">Our Mission</h2>
            <p className="text-xl text-[#000] mb-8">To democratize venue booking by providing a seamless, transparent, and reliable platform that connects people with perfect spaces for their most important moments.</p>
            <div className="rounded-2xl p-8" style={{background:'#a53f3f'}}>
              <h3 className="text-2xl font-bold mb-4 text-white">Join Our Journey</h3>
              <p className="text-lg text-[#ffe9c1] mb-6">Whether you're planning a wedding, corporate event, or celebration, we're here to help you create unforgettable experiences.</p>
              <Button size="lg" className="bg-white text-[#a53f3f] border-2 border-[#a53f3f] hover:bg-[#a53f3f] hover:text-white">Get Started Today</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
