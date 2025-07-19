
import React, { useState } from 'react';
import { Search, MapPin, Star, Wifi, Car, Coffee, Users, Heart } from 'lucide-react';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Card, CardContent, CardHeader } from '../components/card';
import { Badge } from '../components/badge';
import Modal from '../components/Modal';
import { useEffect } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

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

const HotelsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Cities');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookings, setBookings] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const locations = ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune'];

  const hotels = [
    {
      id: 1,
      name: "The Grand Palace Hotel",
      location: "Mumbai, Maharashtra",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      rating: 4.8,
      reviews: 234,
      price: "₹8,500",
      originalPrice: "₹12,000",
      discount: 30,
      amenities: ["Free WiFi", "Parking", "Restaurant", "Spa"],
      roomType: "Deluxe Room",
      featured: true
    },
    {
      id: 2,
      name: "Luxury Suites & Resort",
      location: "Delhi, NCR",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
      rating: 4.7,
      reviews: 189,
      price: "₹6,800",
      originalPrice: "₹9,500",
      discount: 28,
      amenities: ["Pool", "Gym", "Free Breakfast", "WiFi"],
      roomType: "Executive Suite",
      featured: false
    },
    {
      id: 3,
      name: "Heritage Palace",
      location: "Bangalore, Karnataka",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
      rating: 4.9,
      reviews: 156,
      price: "₹12,000",
      originalPrice: "₹15,000",
      discount: 20,
      amenities: ["Heritage", "Garden", "Restaurant", "Parking"],
      roomType: "Royal Suite",
      featured: true
    },
    {
      id: 4,
      name: "Modern Business Hotel",
      location: "Chennai, Tamil Nadu",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
      rating: 4.6,
      reviews: 98,
      price: "₹4,500",
      originalPrice: "₹6,000",
      discount: 25,
      amenities: ["Business Center", "WiFi", "Conference", "Airport"],
      roomType: "Business Room",
      featured: false
    },
    {
      id: 5,
      name: "Beachside Resort",
      location: "Goa",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
      rating: 4.8,
      reviews: 267,
      price: "₹9,200",
      originalPrice: "₹11,500",
      discount: 20,
      amenities: ["Beach Access", "Pool", "Water Sports", "Spa"],
      roomType: "Ocean View",
      featured: true
    },
    {
      id: 6,
      name: "Mountain View Lodge",
      location: "Shimla, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400",
      rating: 4.5,
      reviews: 123,
      price: "₹3,800",
      originalPrice: "₹5,000",
      discount: 24,
      amenities: ["Mountain View", "Fireplace", "Restaurant", "Parking"],
      roomType: "Deluxe Room",
      featured: false
    }
  ];

  const filteredHotels = hotels.filter(hotel => 
    (selectedLocation === 'All Cities' || hotel.location.includes(selectedLocation)) &&
    (hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) || hotel.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
    const booked = (bookings[selectedHotel?.id] || []).filter(b => b.date === selectedDate).map(b => b.time);
    setAvailableTimes(allSlots.filter(t => !booked.includes(t)));
    setSelectedTime('');
  }, [selectedDate, bookings, selectedHotel]);

  const handleBookNow = (hotel) => {
    setSelectedHotel(hotel);
    setShowBookingModal(true);
    setSelectedDate(null);
    setAvailableTimes([]);
    setSelectedTime('');
    setBookingSuccess(false);
  };

  const handleBooking = () => {
    if (!selectedHotel || !selectedDate || !selectedTime) return;
    setBookings(prev => {
      const prevHotel = prev[selectedHotel.id] || [];
      return {
        ...prev,
        [selectedHotel.id]: [...prevHotel, { date: selectedDate, time: selectedTime }]
      };
    });
    setBookingSuccess(true);
    setTimeout(() => {
      setShowBookingModal(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#ffe9c1]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-[#620808]">
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Discover Perfect Hotels</h1>
            <p className="text-xl text-[#f4ce74] mb-8">Find the perfect accommodation for your stay</p>
            {/* Search Bar */}
            <div className="rounded-2xl p-6 max-w-3xl mx-auto" style={{background:'#f4ce74'}}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a53f3f] h-4 w-4" />
                  <Input placeholder="Search hotels by name or location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 border-0 bg-white text-[#000]" />
                </div>
                <select className="p-3 rounded-lg border-0 bg-white text-[#000]" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                  {locations.map(location => (<option key={location} value={location}>{location}</option>))}
                </select>
                <Button className="bg-[#a53f3f] text-white hover:bg-[#3a0303]" onClick={() => {}}>
                  <Search className="h-4 w-4 mr-2" />Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hotels Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-[#3a0303]">Featured Hotels</h2>
            <p className="text-[#a53f3f]">Discover our handpicked selection of premium hotels</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <Card key={hotel.id} className="rounded-2xl shadow-lg" style={{background:'#f4ce74'}}>
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
                    {hotel.featured && (<Badge className="absolute top-3 left-3 bg-[#a53f3f] text-white">Featured</Badge>)}
                    {hotel.discount > 0 && (<Badge className="absolute top-3 right-3 bg-[#f4ce74] text-[#a53f3f]">{hotel.discount}% OFF</Badge>)}
                    <Button variant="ghost" size="sm" className="absolute bottom-3 right-3 bg-white text-[#a53f3f] hover:bg-[#a53f3f] hover:text-white"><Heart className="h-4 w-4" /></Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#3a0303]">{hotel.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-[#a53f3f]"><MapPin className="h-4 w-4" /><span>{hotel.location}</span></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1"><Star className="h-4 w-4 text-[#f4ce74]" /><span className="font-medium text-[#000]">{hotel.rating}</span></div>
                      <span className="text-sm text-[#a53f3f]">({hotel.reviews} reviews)</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-[#a53f3f]">{hotel.roomType}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-[#a53f3f]">{hotel.price}</span>
                        {hotel.originalPrice && (<span className="text-sm text-[#3a0303] line-through">{hotel.originalPrice}</span>)}
                        <span className="text-sm text-[#a53f3f]">per night</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.slice(0, 3).map((amenity, index) => (<Badge key={index} variant="secondary" className="text-xs bg-white text-[#a53f3f]">{amenity}</Badge>))}
                      {hotel.amenities.length > 3 && (<Badge variant="secondary" className="text-xs bg-white text-[#a53f3f]">+{hotel.amenities.length - 3} more</Badge>)}
                    </div>
                    <div className="flex space-x-2 pt-4">
                      <Button variant="outline" className="flex-1 border-[#a53f3f] text-[#a53f3f] bg-white hover:bg-[#a53f3f] hover:text-white">View Details</Button>
                      <Button className="flex-1 bg-[#a53f3f] text-white hover:bg-[#3a0303]" onClick={() => handleBookNow(hotel)}>Book Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Book With Us?</h2>
            <p className="text-xl text-muted-foreground">
              Experience the best in hospitality and comfort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary to-destructive flex items-center justify-center">
                <Wifi className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold">Free WiFi</h3>
              <p className="text-sm text-muted-foreground">
                Complimentary high-speed internet
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-destructive to-primary flex items-center justify-center">
                <Car className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold">Free Parking</h3>
              <p className="text-sm text-muted-foreground">
                Complimentary parking for all guests
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary to-destructive flex items-center justify-center">
                <Coffee className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold">Breakfast Included</h3>
              <p className="text-sm text-muted-foreground">
                Start your day with delicious breakfast
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-destructive to-primary flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold">24/7 Service</h3>
              <p className="text-sm text-muted-foreground">
                Round-the-clock customer service
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Booking Modal */}
      {showBookingModal && selectedHotel && (
        <Modal onClose={() => setShowBookingModal(false)} title={`Book ${selectedHotel.name}`}>
          <div className="p-4">
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-[#a53f3f]">Select Date</label>
              <div className="grid grid-cols-5 gap-2">
                {getNext30Days().map(d => {
                  const iso = d.toISOString().slice(0,10);
                  const isUnavailable = unavailableDates.includes(iso);
                  const isBooked = (bookings[selectedHotel.id]||[]).some(b => b.date === iso);
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
    </div>
  );
};

export default HotelsPage;
