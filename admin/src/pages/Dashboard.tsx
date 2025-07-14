"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Building2, Calendar, Users, DollarSign, TrendingUp, Clock } from "lucide-react"

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalVenues: 0,
    totalBookings: 0,
    totalUsers: 0,
    monthlyRevenue: 0,
    pendingBookings: 0,
  })

  const [recentBookings, setRecentBookings] = useState([])

  useEffect(() => {
    // Fetch dashboard data
    setStats({
      totalVenues: 45,
      totalBookings: 234,
      totalUsers: 1567,
      monthlyRevenue: 45670,
      pendingBookings: 12,
    })

    setRecentBookings([
      {
        id: 1,
        venue: "Grand Ballroom",
        user: "Sarah Johnson",
        date: "2024-01-15",
        status: "confirmed",
        amount: 1200,
      },
      {
        id: 2,
        venue: "Garden Pavilion",
        user: "Michael Chen",
        date: "2024-01-16",
        status: "pending",
        amount: 800,
      },
    ])
  }, [])

  const statCards = [
    {
      title: "Total Venues",
      value: stats.totalVenues,
      icon: <Building2 className="w-8 h-8" />,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: <Calendar className="w-8 h-8" />,
      color: "bg-green-500",
      change: "+8%",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users className="w-8 h-8" />,
      color: "bg-purple-500",
      change: "+15%",
    },
    {
      title: "Monthly Revenue",
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      icon: <DollarSign className="w-8 h-8" />,
      color: "bg-yellow-500",
      change: "+23%",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">{stat.change}</span>
                </div>
              </div>
              <div className={`${stat.color} text-white p-3 rounded-lg`}>{stat.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {recentBookings.map((booking: any) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{booking.venue}</p>
                  <p className="text-sm text-gray-600">{booking.user}</p>
                  <p className="text-sm text-gray-500">{booking.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${booking.amount}</p>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      booking.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
              Add New Venue
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-3 rounded-lg font-medium transition-colors">
              View All Bookings
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-3 rounded-lg font-medium transition-colors">
              Generate Report
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
