import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star, Users, ArrowRight, Grid, List, Heart, Verified, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Card, CardContent } from '../components/card';
import { Badge } from '../components/badge';
import Modal from '../components/Modal';

// Helper: generate next 30 days
const getNext30Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
};

const VenuesPage = (props) => {
  const [viewMode, setViewMode] = useState('grid');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [likedVenues, setLikedVenues] = useState(() => new Set());
  // Booking state: { [venueId]: [{date: 'YYYY-MM-DD', time: '10:00'}] }
  const [bookings, setBookings] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Local mock data
  const mockVenues = [
    {
      id: 1,
      name: "Grand Ballroom Elite",
      location: "Downtown Plaza, Mumbai",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
      rating: 4.9,
      reviews: 156,
      price: 15000,
      capacity: "200-500",
      type: "Wedding Hall",
      amenities: ["WiFi", "Parking", "Catering", "Sound System"],
      verified: true,
      liked: false
    },
    {
      id: 2,
      name: "Modern Conference Center",
      location: "Business District, Delhi",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
      rating: 4.8,
      reviews: 89,
      price: 12000,
      capacity: "50-300",
      type: "Conference",
      amenities: ["WiFi", "Projector", "Parking", "Coffee Service"],
      verified: true,
      liked: true
    },
    {
      id: 3,
      name: "Garden Paradise Resort",
      location: "Lonavala, Maharashtra",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
      rating: 4.7,
      reviews: 203,
      price: 8000,
      capacity: "50-150",
      type: "Outdoor",
      amenities: ["Garden", "Parking", "Kitchen", "Pool"],
      verified: true,
      liked: false
    }
  ];

  // Use venues from props if valid, else fallback to mockVenues
  const venues = Array.isArray(props.venues) ? props.venues : mockVenues;
  const safeVenues = Array.isArray(venues) ? venues : [];
  const filteredVenues = safeVenues.filter(venue =>
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleToggleLike = (venueId) => {
    setLikedVenues(prev => {
      const newSet = new Set(prev);
      if (newSet.has(venueId)) newSet.delete(venueId);
      else newSet.add(venueId);
      return newSet;
    });
  };
  const handleBookNow = (venue) => {
    setSelectedVenue(venue);
    setShowBookingModal(true);
    setSelectedDate(null);
    setAvailableTimes([]);
    setSelectedTime('');
    setBookingSuccess(false);
  };
  const handleViewDetails = (venue) => {
    setSelectedVenue(venue);
    setShowDetailsModal(true);
  };

  // Mock: unavailable dates (randomly block 5 days for demo)
  const unavailableDates = React.useMemo(() => {
    const days = getNext30Days();
    return days.filter((_, i) => i % 7 === 0).map(d => d.toISOString().slice(0,10));
  }, []);

  // When date is selected, show available times (mocked)
  useEffect(() => {
    if (!selectedDate) return;
    // Mock: 3 slots per day, block if already booked
    const allSlots = ['10:00', '14:00', '18:00'];
    const booked = (bookings[selectedVenue?.id] || []).filter(b => b.date === selectedDate).map(b => b.time);
    setAvailableTimes(allSlots.filter(t => !booked.includes(t)));
    setSelectedTime('');
  }, [selectedDate, bookings, selectedVenue]);

  const handleBooking = () => {
    if (!selectedVenue || !selectedDate || !selectedTime) return;
    setBookings(prev => {
      const prevVenue = prev[selectedVenue.id] || [];
      return {
        ...prev,
        [selectedVenue.id]: [...prevVenue, { date: selectedDate, time: selectedTime }]
      };
    });
    setBookingSuccess(true);
    setTimeout(() => {
      setShowBookingModal(false);
    }, 1200);
  };

  const VenueCard = ({ venue, layout }) => {
    if (layout === 'list') {
      return (
        <Card className="overflow-hidden glass-card border-0 hover:shadow-xl transition-all duration-300">
          <div className="flex">
            <div className="w-80 flex-shrink-0 relative">
              <img
                src={venue.image}
                alt={venue.name}
                className="w-full h-64 object-cover"
              />
              <Button
                variant="ghost"
                size="sm"
                className={`absolute top-4 right-4 rounded-full ${likedVenues.has(venue.id) ? 'text-red-500' : 'text-white'} hover:bg-white/20`}
                onClick={() => handleToggleLike(venue.id)}
                aria-label="Like venue"
              >
                <Heart className={`h-5 w-5 ${likedVenues.has(venue.id) ? 'fill-current' : ''}`} />
              </Button>
            </div>
            <CardContent className="flex-1 p-8">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-primary text-primary-foreground">{venue.type}</Badge>
                      {venue.verified && (
                        <Badge className="bg-green-500 text-white">
                          <Verified className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{venue.rating}</span>
                        <span className="text-muted-foreground">({venue.reviews} reviews)</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold">{venue.name}</h3>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{venue.location}</span>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="text-3xl font-bold text-primary">₹{venue.price.toLocaleString()}/hr</div>
                    <div className="text-muted-foreground flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {venue.capacity} guests
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {venue.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="rounded-full">
                      {amenity}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center space-x-4 pt-4">
                  <Button variant="outline" className="rounded-xl" onClick={() => handleViewDetails(venue)}>
                    View Details
                  </Button>
                  <Button className="rounded-xl" onClick={() => handleBookNow(venue)}>
                    Book Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      );
    }

    return (
      <Card className="overflow-hidden glass-card border-0 hover:shadow-xl transition-all duration-500 group">
        <div className="relative overflow-hidden">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-primary text-primary-foreground">{venue.type}</Badge>
            {venue.verified && (
              <Badge className="bg-green-500 text-white">
                <Verified className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-4 right-4 rounded-full ${likedVenues.has(venue.id) ? 'text-red-500' : 'text-white'} hover:bg-white/20`}
            onClick={() => handleToggleLike(venue.id)}
            aria-label="Like venue"
          >
            <Heart className={`h-5 w-5 ${likedVenues.has(venue.id) ? 'fill-current' : ''}`} />
          </Button>
          <div className="absolute bottom-4 right-4 glass rounded-full px-3 py-1">
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
          
          <div className="flex flex-wrap gap-2">
            {venue.amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="secondary" className="text-xs rounded-full">
                {amenity}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">₹{venue.price.toLocaleString()}/hr</div>
              <div className="text-sm text-muted-foreground flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {venue.capacity} guests
              </div>
            </div>
            <Button className="rounded-xl" onClick={() => handleBookNow(venue)}>
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-[#ffe9c1]">
      {/* Header */}
      <section className="py-16 bg-[#620808]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white">Discover Amazing <span className="block text-[#f4ce74]">Venues</span></h1>
              <p className="text-xl text-[#f4ce74]">Find the perfect space for your next event</p>
            </div>
            {/* Search Bar */}
            <div className="rounded-3xl p-6" style={{background:'#f4ce74'}}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#a53f3f] h-5 w-5" />
                  <Input
                    placeholder="Search venues by name, location, or type..."
                    className="pl-12 h-14 border-0 bg-white text-[#000] text-lg rounded-2xl"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') e.preventDefault(); }}
                  />
                </div>
                <Button
                  className="h-14 px-8 rounded-2xl bg-[#a53f3f] text-white hover:bg-[#3a0303]"
                  onClick={() => { /* No alert, just filter */ }}
                >
                  <Search className="h-5 w-5 mr-2" />Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Filters and Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button variant="outline" className="rounded-xl border-[#a53f3f] text-[#a53f3f] bg-white hover:bg-[#a53f3f] hover:text-white" onClick={() => setShowFilterModal(true)}>Filters</Button>
              <Button variant="outline" className="rounded-xl border-[#a53f3f] text-[#a53f3f] bg-white hover:bg-[#a53f3f] hover:text-white" onClick={() => setShowSortModal(true)}>Sort</Button>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => setViewMode('grid')} className={`rounded-xl ${viewMode==='grid'?'bg-[#a53f3f] text-white':'bg-white text-[#a53f3f] border border-[#a53f3f]'}`}>Grid</Button>
              <Button onClick={() => setViewMode('list')} className={`rounded-xl ${viewMode==='list'?'bg-[#a53f3f] text-white':'bg-white text-[#a53f3f] border border-[#a53f3f]'}`}>List</Button>
            </div>
          </div>
          {/* Venue Cards */}
          <div className={`grid ${viewMode==='grid'?'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6':'grid-cols-1 gap-6'}`}>
            {filteredVenues.map((venue) => (
              <Card key={venue.id} className="rounded-2xl shadow-lg" style={{background:'#f4ce74'}}>
                <div className="relative overflow-hidden rounded-t-lg">
                  <img src={venue.image} alt={venue.name} className="w-full h-64 object-cover" />
                  <Button variant="ghost" size="sm" className={`absolute top-4 right-4 bg-white ${likedVenues.has(venue.id) ? 'text-red-500' : 'text-[#a53f3f]'} hover:bg-[#a53f3f] hover:text-white`} onClick={() => handleToggleLike(venue.id)} aria-label="Like venue"><Heart className={`h-5 w-5 ${likedVenues.has(venue.id) ? 'fill-current' : ''}`} /></Button>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#3a0303]">{venue.name}</h3>
                  <div className="flex items-center space-x-2 text-[#a53f3f] text-sm"><MapPin className="h-4 w-4" /><span>{venue.location}</span></div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-[#a53f3f] font-medium">{venue.type}</span>
                    <span className="text-[#3a0303]">|</span>
                    <span className="text-[#a53f3f]">{venue.capacity} guests</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Star className="h-4 w-4 text-[#f4ce74]" />
                    <span className="font-medium text-[#000]">{venue.rating}</span>
                    <span className="text-sm text-[#a53f3f]">({venue.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {venue.amenities.slice(0, 3).map((amenity, index) => (<Badge key={index} variant="secondary" className="text-xs bg-white text-[#a53f3f]">{amenity}</Badge>))}
                    {venue.amenities.length > 3 && (<Badge variant="secondary" className="text-xs bg-white text-[#a53f3f]">+{venue.amenities.length - 3} more</Badge>)}
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-[#a53f3f]"> 9{venue.price.toLocaleString()}/hr</div>
                      <div className="text-sm text-[#a53f3f] flex items-center"><Users className="h-3 w-3 mr-1" />{venue.capacity} guests</div>
                    </div>
                    <Button className="rounded-xl bg-[#a53f3f] text-white hover:bg-[#3a0303]" onClick={() => handleBookNow(venue)}>Book Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Modals */}
      {showFilterModal && (
        <Modal onClose={() => setShowFilterModal(false)} title="Filters">
          <div className="p-4">[Mock filter options here]</div>
        </Modal>
      )}
      {showSortModal && (
        <Modal onClose={() => setShowSortModal(false)} title="Sort">
          <div className="p-4">[Mock sort options here]</div>
        </Modal>
      )}
      {showBookingModal && selectedVenue && (
        <Modal onClose={() => setShowBookingModal(false)} title={`Book ${selectedVenue.name}`}>
          <div className="p-4">
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-[#a53f3f]">Select Date</label>
              <div className="grid grid-cols-5 gap-2">
                {getNext30Days().map(d => {
                  const iso = d.toISOString().slice(0,10);
                  const isUnavailable = unavailableDates.includes(iso);
                  const isBooked = (bookings[selectedVenue.id]||[]).some(b => b.date === iso);
                  return (
                    <button
                      key={iso}
                      className={`rounded-lg px-2 py-1 text-xs font-medium border transition-all duration-150
                        ${selectedDate===iso ? 'bg-[#a53f3f] text-white' : isUnavailable ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : isBooked ? 'bg-yellow-100 text-[#a53f3f]' : 'bg-white text-[#a53f3f]'}
                        border-[#a53f3f]`}
                      disabled={isUnavailable}
                      onClick={() => setSelectedDate(iso)}
                    >
                      {d.getDate()}/{d.getMonth()+1}
                    </button>
                  );
                })}
              </div>
            </div>
            {selectedDate && (
              <div className="mb-4">
                <label className="block font-semibold mb-2 text-[#a53f3f]">Select Time Slot</label>
                <div className="flex gap-2">
                  {availableTimes.length === 0 && <span className="text-gray-400">No slots available</span>}
                  {availableTimes.map(t => (
                    <button
                      key={t}
                      className={`rounded-lg px-3 py-1 text-sm font-medium border border-[#a53f3f] transition-all duration-150
                        ${selectedTime===t ? 'bg-[#a53f3f] text-white' : 'bg-white text-[#a53f3f]'}`}
                      onClick={() => setSelectedTime(t)}
                    >{t}</button>
                  ))}
                </div>
              </div>
            )}
            <Button
              className="w-full bg-[#a53f3f] text-white hover:bg-[#3a0303] mt-2"
              disabled={!selectedDate || !selectedTime}
              onClick={handleBooking}
            >
              Book Now
            </Button>
            {bookingSuccess && <div className="text-green-600 font-semibold mt-2">Booking successful!</div>}
          </div>
        </Modal>
      )}
      {showDetailsModal && selectedVenue && (
        <Modal onClose={() => setShowDetailsModal(false)} title={selectedVenue.name}>
          <div className="p-4">[Mock details for {selectedVenue.name}]</div>
        </Modal>
      )}
    </div>
  );
};

export default VenuesPage;
