
import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Phone, Mail, Globe, Heart } from 'lucide-react';
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

const VendorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [bookings, setBookings] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const categories = ['All', 'Photographers', 'Caterers', 'Decorators', 'DJ & Music', 'Makeup Artists', 'Planners'];

  const vendors = [
    {
      id: 1,
      name: "Royal Photography Studio",
      category: "Photographers",
      image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400",
      rating: 4.8,
      reviews: 234,
      location: "Mumbai, Maharashtra",
      price: "₹25,000 - ₹75,000",
      services: ["Wedding Photography", "Pre-wedding", "Candid Photography"],
      phone: "+91 98765 43210",
      email: "info@royalphoto.com",
      website: "www.royalphoto.com",
      verified: true
    },
    {
      id: 2,
      name: "Spice Garden Catering",
      category: "Caterers",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
      rating: 4.7,
      reviews: 189,
      location: "Delhi, NCR",
      price: "₹500 - ₹1,200 per plate",
      services: ["Indian Cuisine", "Continental", "Live Counters"],
      phone: "+91 98765 43211",
      email: "info@spicegarden.com",
      website: "www.spicegarden.com",
      verified: true
    },
    {
      id: 3,
      name: "Elegant Decorators",
      category: "Decorators",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400",
      rating: 4.9,
      reviews: 156,
      location: "Bangalore, Karnataka",
      price: "₹50,000 - ₹2,00,000",
      services: ["Floral Decor", "Theme Decoration", "Lighting"],
      phone: "+91 98765 43212",
      email: "info@elegantdecor.com",
      website: "www.elegantdecor.com",
      verified: true
    },
    {
      id: 4,
      name: "Beat Box Entertainment",
      category: "DJ & Music",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      rating: 4.6,
      reviews: 98,
      location: "Pune, Maharashtra",
      price: "₹15,000 - ₹45,000",
      services: ["DJ Services", "Live Band", "Sound System"],
      phone: "+91 98765 43213",
      email: "info@beatbox.com",
      website: "www.beatbox.com",
      verified: false
    }
  ];

  const filteredVendors = vendors.filter(vendor =>
    (selectedCategory === 'All' || vendor.category === selectedCategory) &&
    (vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || vendor.location.toLowerCase().includes(searchTerm.toLowerCase()) || vendor.category.toLowerCase().includes(searchTerm.toLowerCase()))
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
    const booked = (bookings[selectedVendor?.id] || []).filter(b => b.date === selectedDate).map(b => b.time);
    setAvailableTimes(allSlots.filter(t => !booked.includes(t)));
    setSelectedTime('');
  }, [selectedDate, bookings, selectedVendor]);

  const handleBookNow = (vendor) => {
    setSelectedVendor(vendor);
    setShowBookingModal(true);
    setSelectedDate(null);
    setAvailableTimes([]);
    setSelectedTime('');
    setBookingSuccess(false);
  };

  const handleBooking = () => {
    if (!selectedVendor || !selectedDate || !selectedTime) return;
    setBookings(prev => {
      const prevVendor = prev[selectedVendor.id] || [];
      return {
        ...prev,
        [selectedVendor.id]: [...prevVendor, { date: selectedDate, time: selectedTime }]
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Find Perfect Vendors</h1>
            <p className="text-xl text-[#f4ce74] mb-8">Connect with verified vendors for your special occasions</p>
            {/* Search Bar */}
            <div className="rounded-2xl p-6 max-w-2xl mx-auto" style={{background:'#f4ce74'}}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a53f3f] h-4 w-4" />
                  <Input placeholder="Search vendors by name, location, or category..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 border-0 bg-white text-[#000]" />
                </div>
                <Button className="bg-[#a53f3f] text-white hover:bg-[#3a0303]">
                  <Search className="h-4 w-4 mr-2" />Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Filters & Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <Button key={cat} variant={selectedCategory===cat?'default':'outline'} className={`rounded-full px-4 py-1 text-sm ${selectedCategory===cat?'bg-[#a53f3f] text-white':'border-[#a53f3f] text-[#a53f3f] bg-white hover:bg-[#a53f3f] hover:text-white'}`} onClick={() => setSelectedCategory(cat)}>{cat}</Button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVendors.map((vendor) => (
              <Card key={vendor.id} className="rounded-2xl shadow-lg overflow-hidden flex flex-col" style={{background:'#f4ce74'}}>
                <img src={vendor.image} alt={vendor.name} className="h-48 w-full object-cover" />
                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-[#3a0303] mb-2">{vendor.name}</h2>
                    <div className="flex items-center space-x-2 text-[#a53f3f] text-sm mb-2"><MapPin className="h-4 w-4" /><span>{vendor.location}</span></div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-[#a53f3f] font-medium">{vendor.category}</span>
                      <span className="text-[#3a0303]">|</span>
                      <span className="text-[#a53f3f]">{vendor.services.slice(0,2).join(', ')}{vendor.services.length>2?` +${vendor.services.length-2} more`:''}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="h-4 w-4 text-[#f4ce74]" />
                      <span className="font-medium text-[#000]">{vendor.rating}</span>
                      <span className="text-sm text-[#a53f3f]">({vendor.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-[#a53f3f]">{vendor.price}</div>
                    </div>
                   <Button className="rounded-xl bg-[#a53f3f] text-white hover:bg-[#3a0303]" onClick={() => handleBookNow(vendor)}>Book Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Booking Modal */}
      {showBookingModal && selectedVendor && (
        <Modal onClose={() => setShowBookingModal(false)} title={`Book ${selectedVendor.name}`}>
          <div className="p-4">
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-[#a53f3f]">Select Date</label>
              <div className="grid grid-cols-5 gap-2">
                {getNext30Days().map(d => {
                  const iso = d.toISOString().slice(0,10);
                  const isUnavailable = unavailableDates.includes(iso);
                  const isBooked = (bookings[selectedVendor.id]||[]).some(b => b.date === iso);
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

export default VendorsPage;
