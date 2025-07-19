import { ChevronDown, Search, Headphones, Sun } from "lucide-react"
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-2">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="EazyVenue Logo" className="h-10 w-10" />
          <span className="font-bold text-2xl text-[#10182f] leading-none">EazyVenue<sup className="text-xs font-normal text-[#10182f] align-super">®</sup></span>
        </div>
        {/* Main Nav */}
        <nav className="flex-1 flex justify-center gap-8">
          <Link to="/" className="font-medium text-gray-900 hover:text-[#1a73e8] px-2">HOME</Link>
          <Link to="/venues" className="font-medium text-gray-900 hover:text-[#1a73e8] px-2">VENUES</Link>
          <Link to="/vendors" className="font-medium text-gray-900 hover:text-[#1a73e8] px-2">VENDORS</Link>
          <Link to="/subscription" className="font-medium text-gray-900 hover:text-[#1a73e8] px-2">SUBSCRIPTION</Link>
          <Link to="/hot-muhurats" className="font-medium text-gray-900 hover:text-[#1a73e8] px-2">HOT MUHURATS</Link>
          <Link to="/eazyinvites" className="font-medium text-[#1a73e8] hover:underline px-2">EAZYINVITES <span className="bg-[#e3f0ff] text-[#1a73e8] text-xs px-2 py-1 rounded-full ml-1 align-middle">NEW</span></Link>
          <Link to="/hotels" className="font-medium text-gray-900 hover:text-[#1a73e8] px-2">HOTELS</Link>
          <Link to="/about" className="font-medium text-gray-900 hover:text-[#1a73e8] px-2">ABOUT</Link>
          <Link to="/user/dashboard" className="font-medium text-gray-900 hover:text-[#1a73e8] px-2">DASHBOARD</Link>
          </nav>
        {/* Right Side */}
        <div className="flex flex-col items-end gap-1">
          <Link to="/login" className="font-semibold text-[#10182f] text-sm border border-[#f5e9c8] bg-[#fdf6ee] px-4 py-1 rounded-xl">LOGIN</Link>
          <Link to="/vendor-register" className="text-[#1a73e8] text-xs font-semibold hover:underline">ARE YOU A VENDOR?</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
