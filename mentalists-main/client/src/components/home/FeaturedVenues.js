import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Users, ArrowRight } from 'lucide-react';
import { Button } from '../button';
import { Card, CardContent } from '../card';
import { Badge } from '../badge';

const FeaturedVenues = () => {
  const venues = [
    {
      id: 1,
      name: "Royal Heritage Palace",
      location: "Mumbai Central",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
      rating: 4.9,
      price: "₹15,000/hour",
      capacity: "500 guests",
      type: "Wedding Hall",
      verified: true
    },
    {
      id: 2,
      name: "Modern Sky Lounge",
      location: "Bandra West",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
      rating: 4.8,
      price: "₹12,000/hour",
      capacity: "200 guests",
      type: "Rooftop",
      verified: true
    },
    {
      id: 3,
      name: "Garden Bliss Resort",
      location: "Lonavala",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
      rating: 4.7,
      price: "₹8,000/hour",
      capacity: "150 guests",
      type: "Outdoor",
      verified: true
    }
  ];

  return (
    <section className="py-20" style={{background:'#f4ce74'}}>
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Featured Venues</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked venues that guarantee an unforgettable experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <Card key={venue.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 glass-card bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-accent text-accent-foreground">
                    {venue.type}
                  </Badge>
                  {venue.verified && (
                    <Badge className="bg-green-500 text-white">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4 glass rounded-full px-3 py-1">
                  <div className="flex items-center space-x-1 text-white">
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span className="font-medium">{venue.rating}</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {venue.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{venue.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-primary">{venue.price}</div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {venue.capacity}
                    </div>
                  </div>
                  <Button className="rounded-xl">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="rounded-2xl" asChild>
            <Link to="/venues">
              Explore All Venues
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVenues;
