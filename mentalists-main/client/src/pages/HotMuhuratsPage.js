import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { Button } from '../components/button';
import { Badge } from '../components/badge';
import { Calendar as CalendarIcon } from 'lucide-react';

const mockMuhurats = [
  {
    id: 1,
    date: '2025-08-15',
    event: 'Wedding',
    description: 'Auspicious day for weddings and engagements.',
    details: 'Shubh Muhurat: 9:00 AM - 1:00 PM',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
  },
  {
    id: 2,
    date: '2025-09-02',
    event: 'Engagement',
    description: 'Perfect for ring ceremonies and engagements.',
    details: 'Shubh Muhurat: 11:00 AM - 2:00 PM',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
  },
  {
    id: 3,
    date: '2025-10-10',
    event: 'Anniversary',
    description: 'Ideal for anniversaries and family gatherings.',
    details: 'Shubh Muhurat: 6:00 PM - 9:00 PM',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
  },
  {
    id: 4,
    date: '2025-11-21',
    event: 'Baby Shower',
    description: 'Blessings for new beginnings.',
    details: 'Shubh Muhurat: 10:00 AM - 12:00 PM',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400',
  },
];

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

const HotMuhuratsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [bookings, setBookings] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBook = (muhurat) => {
    setSelected(muhurat);
    setShowModal(true);
    setSelectedDate(null);
    setAvailableTimes([]);
    setSelectedTime('');
    setBookingSuccess(false);
  };
  const handleDetails = (muhurat) => {
    setSelected(muhurat);
    setShowModal(true);
    setSelectedDate(null);
    setAvailableTimes([]);
    setSelectedTime('');
    setBookingSuccess(false);
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
    const booked = (bookings[selected?.id] || []).filter(b => b.date === selectedDate).map(b => b.time);
    setAvailableTimes(allSlots.filter(t => !booked.includes(t)));
    setSelectedTime('');
  }, [selectedDate, bookings, selected]);

  const handleBooking = () => {
    if (!selected || !selectedDate || !selectedTime) return;
    setBookings(prev => {
      const prevMuhurats = prev[selected.id] || [];
      return {
        ...prev,
        [selected.id]: [...prevMuhurats, { date: selectedDate, time: selectedTime }]
      };
    });
    setBookingSuccess(true);
    setTimeout(() => {
      setShowModal(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#ffe9c1]">
      <section className="py-16 bg-[#620808] text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Hot Muhurats</h1>
        <p className="text-xl text-[#f4ce74] mb-8">Find the most auspicious dates for your special events</p>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockMuhurats.map((muhurat) => (
              <div key={muhurat.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
                <img src={muhurat.image} alt={muhurat.event} className="h-48 w-full object-cover" />
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <Badge className="bg-[#a53f3f] text-white mb-2">{muhurat.event}</Badge>
                    <h2 className="text-2xl font-bold text-[#3a0303] mb-2">{new Date(muhurat.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</h2>
                    <p className="text-[#a53f3f] mb-2">{muhurat.description}</p>
                    <p className="text-[#620808] text-sm mb-4">{muhurat.details}</p>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button className="bg-[#a53f3f] text-white hover:bg-[#3a0303] flex-1" onClick={() => handleBook(muhurat)}>Book Venue</Button>
                    <Button variant="outline" className="border-[#a53f3f] text-[#a53f3f] flex-1" onClick={() => handleDetails(muhurat)}>See Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {showModal && selected && (
        <Modal onClose={() => setShowModal(false)} title={selected.event + ' on ' + new Date(selected.date).toLocaleDateString('en-IN')}>
          <div className="p-4">
            <img src={selected.image} alt={selected.event} className="h-40 w-full object-cover rounded-xl mb-4" />
            <div className="mb-2 text-[#a53f3f] font-semibold">{selected.description}</div>
            <div className="mb-2 text-[#620808]">{selected.details}</div>
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-[#a53f3f]">Select Date</label>
              <div className="grid grid-cols-5 gap-2">
                {getNext30Days().map(d => {
                  const iso = d.toISOString().slice(0,10);
                  const isUnavailable = unavailableDates.includes(iso);
                  const isBooked = (bookings[selected.id]||[]).some(b => b.date === iso);
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

export default HotMuhuratsPage; 