"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaBirthdayCake, FaBaby, FaSwimmer, FaUsers, FaHandshake, FaBuilding, FaUserTie, FaGlassCheers, FaHeart, FaRing, FaCalendarAlt } from "react-icons/fa"
import type { IconType } from "react-icons"
import React from "react"

interface EventCategory {
  label: string;
  icon: IconType;
}

const eventCategories: EventCategory[] = [
  { label: "Wedding", icon: FaHeart },
  { label: "Reception", icon: FaGlassCheers },
  { label: "Ring Ceremony", icon: FaRing },
  { label: "Anniversary", icon: FaCalendarAlt },
  { label: "Birthday Party", icon: FaBirthdayCake },
  { label: "Baby Shower", icon: FaBaby },
  { label: "Pool Party", icon: FaSwimmer },
  { label: "Corporate Events", icon: FaBuilding },
  { label: "Corporate Meetings", icon: FaUserTie },
  { label: "Get Together", icon: FaUsers },
]

const ScrollHeader = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 w-full z-50 bg-[#620808] shadow-md transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`} style={{borderBottom: '1px solid #3a0303'}}>
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-2">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Eazy Venue Logo" className="h-10 w-10" />
          <div className="flex flex-col">
            <span className="font-bold text-lg text-[#ffe9c1] leading-none">EazyVenue<sup className="text-xs font-normal text-[#ffe9c1] align-super">®</sup></span>
            <span className="text-xs text-[#f4ce74] -mt-1">VENUES UNLIMITED</span>
          </div>
        </div>
        {/* Main Nav */}
        <nav className="flex-1 flex justify-center gap-8">
          <Link to="/" className="font-medium text-[#ffe9c1] hover:text-[#a53f3f] px-2">HOME</Link>
          <Link to="/venues" className="font-medium text-[#ffe9c1] hover:text-[#a53f3f] px-2">VENUES</Link>
          <Link to="/vendors" className="font-medium text-[#ffe9c1] hover:text-[#a53f3f] px-2">VENDORS</Link>
          <Link to="/subscription" className="font-medium text-[#ffe9c1] hover:text-[#a53f3f] px-2">SUBSCRIPTION</Link>
          <Link to="/hot-muhurats" className="font-medium text-[#ffe9c1] hover:text-[#a53f3f] px-2">HOT MUHURATS</Link>
          <Link to="/eazyinvites" className="font-medium text-[#a53f3f] hover:underline px-2">EAZYINVITES <span className="bg-[#f4ce74] text-[#a53f3f] text-xs px-2 py-1 rounded-full ml-1 align-middle">NEW</span></Link>
          <Link to="/hotels" className="font-medium text-[#ffe9c1] hover:text-[#a53f3f] px-2">HOTELS</Link>
          <Link to="/about" className="font-medium text-[#ffe9c1] hover:text-[#a53f3f] px-2">ABOUT</Link>
          <Link to="/user/dashboard" className="font-medium text-[#ffe9c1] hover:text-[#a53f3f] px-2">DASHBOARD</Link>
        </nav>
        {/* Right Side */}
        <div className="flex flex-col items-end gap-1">
          <Link to="/login" className="font-semibold text-[#620808] text-sm border border-[#a53f3f] bg-[#ffe9c1] px-4 py-1 rounded-xl hover:bg-[#a53f3f] hover:text-white">LOGIN</Link>
          <Link to="/vendor-register" className="text-[#f4ce74] text-xs font-semibold hover:underline">ARE YOU A VENDOR?</Link>
        </div>
      </div>
      {/* Event Categories Bar */}
      <div className="w-full bg-[#f4ce74] shadow-sm border-t border-b border-[#a53f3f]">
        <div className="flex items-center gap-6 overflow-x-auto px-6 py-2 max-w-7xl mx-auto">
          <span className="text-[#3a0303] font-medium mr-2 whitespace-nowrap">What's your occasion?</span>
          <button className="rounded-full bg-white shadow p-1 text-[#a53f3f] border border-[#a53f3f] mr-2">&#60;</button>
          {eventCategories.map((cat) => {
            return (
              <div key={cat.label} className="flex flex-col items-center min-w-[80px] mx-2">
                <span className="text-xs text-[#3a0303] whitespace-nowrap">{cat.label}</span>
              </div>
            )
          })}
          <button className="rounded-full bg-white shadow p-1 text-[#a53f3f] border border-[#a53f3f] ml-2">&#62;</button>
        </div>
      </div>
    </header>
  )
}

export default ScrollHeader
