"use client"

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Shield } from 'lucide-react';
// Use placeholder SVG for round red logo if PNG is not round
const EazyVenueLogo = require('../img/EazyVenue.png');

const navLinks = [
  { to: '/venues', label: 'VENUES' },
  { to: '/vendors', label: 'VENDORS' },
  { to: '/subscription', label: 'SUBSCRIPTION' },
  { to: '/hot-muhurats', label: 'HOT MUHURATS' },
  { to: '/eazyinvites', label: 'EAZYINVITES (NEW)', highlight: true },
  { to: '/hotels', label: 'HOTELS' },
  { to: '/about', label: 'ABOUT' },
  { to: '/user/dashboard', label: 'DASHBOARD' },
];

const eventCategories = [
  'Wedding', 'Reception', 'Ring Ceremony', 'Anniversary', 'Birthday Party', 'Baby Shower', 'Pool Party', 'Corporate Events', 'Corporate Meetings', 'Get Together'
];

const CombinedHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const updateUser = () => {
      const stored = localStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));
      else setUser(null);
    };
    updateUser();
    window.addEventListener('storage', updateUser);
    window.addEventListener('userChanged', updateUser);
    return () => {
      window.removeEventListener('storage', updateUser);
      window.removeEventListener('userChanged', updateUser);
    };
  }, []);

  return (
    <>
      {/* Header/Navbar */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white shadow-md`} style={{borderBottom: '1px solid #eee'}}>
        <div className="flex items-center justify-between max-w-[1400px] mx-auto px-6 py-2">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 min-w-[220px]">
            {/* If your PNG is not round, use this SVG instead: */}
            {/* <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#E53935"/><text x="50%" y="54%" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial" dy=".3em">EZY</text></svg> */}
            <img src={EazyVenueLogo} alt="EazyVenue Logo" className="h-12 w-12 object-contain rounded-full bg-white border border-[#eee] p-1" />
            <div className="flex flex-col leading-tight ml-2">
              <span className="font-bold text-xl text-[#E53935] tracking-wide">Eazy Venue<sup className="text-xs font-normal align-super">®</sup></span>
              <span className="text-xs tracking-widest -mt-1 text-[#888]">VENUES UNLIMITED</span>
            </div>
          </div>
          {/* Nav */}
          <nav className="flex-1 flex justify-center gap-8">
            {navLinks.map(link =>
              link.highlight ? (
                <Link key={link.to} to={link.to} className="font-semibold uppercase tracking-wide px-2 text-[#E53935] bg-[#f4ce74] rounded-full px-4 py-1 hover:underline">{link.label}</Link>
              ) : (
                <Link key={link.to} to={link.to} className="font-semibold uppercase tracking-wide px-2 text-[#222] hover:text-[#E53935]">{link.label}</Link>
              )
            )}
          </nav>
          {/* Right Side */}
          <div className="flex items-center gap-4 min-w-[180px] justify-end">
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <span className="flex items-center gap-1 text-[#a53f3f] font-semibold"><Shield className="h-6 w-6" /> Admin</span>
                ) : (
                  <span className="flex items-center gap-1 text-[#a53f3f] font-semibold"><User className="h-6 w-6" /> User</span>
                )}
                <button onClick={() => { localStorage.removeItem('user'); window.dispatchEvent(new Event('userChanged')); window.location.reload(); }} className="ml-4 text-xs border border-[#E53935] text-[#E53935] bg-white px-4 py-2 rounded-xl hover:bg-[#E53935] hover:text-white font-semibold transition-all duration-200">Logout</button>
              </>
            ) : (
              <Link to="/login" className="font-semibold text-xs border border-[#E53935] text-[#E53935] bg-white px-4 py-1 rounded-xl hover:bg-[#E53935] hover:text-white transition-all duration-200">LOGIN</Link>
            )}
          </div>
        </div>
        {/* Event Bar */}
        <div className="w-full bg-white border-t border-b border-[#eee]">
          <div className="flex items-center gap-6 overflow-x-auto px-6 py-2 max-w-[1400px] mx-auto">
            <span className="text-[#E53935] font-medium mr-2 whitespace-nowrap">What's your occasion?</span>
            <button className="rounded-full bg-white shadow p-1 text-[#E53935] border border-[#eee] mr-2">&#60;</button>
            {eventCategories.map((cat) => (
              <div key={cat} className="flex flex-col items-center min-w-[80px] mx-2">
                <span className="text-xs text-[#222] whitespace-nowrap">{cat}</span>
              </div>
            ))}
            <button className="rounded-full bg-white shadow p-1 text-[#E53935] border border-[#eee] ml-2">&#62;</button>
          </div>
        </div>
      </header>
      {/* Hero Image Section */}
      <div className="w-full h-[400px] pt-[120px] bg-black">
        <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200" alt="Venue Hero" className="w-full h-full object-cover" />
      </div>
    </>
  );
}

export default CombinedHeader;
