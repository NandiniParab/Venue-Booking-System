const express = require("express")
const Booking = require("../models/Booking")
const Venue = require("../models/Venue")
const User = require("../models/User")
const { adminAuth } = require("../middleware/auth")

const router = express.Router()

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard stats
// @access  Private (Admin)
router.get("/dashboard", adminAuth, async (req, res) => {
  try {
    const totalVenues = await Venue.countDocuments()
    const totalBookings = await Booking.countDocuments()
    const totalUsers = await User.countDocuments({ role: "user" })
    const pendingBookings = await Booking.countDocuments({ status: "pending" })

    // Revenue calculation (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentBookings = await Booking.find({
      createdAt: { $gte: thirtyDaysAgo },
      status: { $in: ["confirmed", "completed"] },
    })

    const monthlyRevenue = recentBookings.reduce((sum, booking) => sum + booking.pricing.total, 0)

    // Popular venues
    const popularVenues = await Venue.aggregate([
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "venue",
          as: "bookings",
        },
      },
      {
        $addFields: {
          bookingCount: { $size: "$bookings" },
        },
      },
      {
        $sort: { bookingCount: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          name: 1,
          bookingCount: 1,
          rating: 1,
        },
      },
    ])

    // Recent bookings
    const recentBookingsList = await Booking.find()
      .populate("venue", "name")
      .populate("user", "firstName lastName")
      .sort({ createdAt: -1 })
      .limit(10)

    res.json({
      stats: {
        totalVenues,
        totalBookings,
        totalUsers,
        pendingBookings,
        monthlyRevenue,
      },
      popularVenues,
      recentBookings: recentBookingsList,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   GET /api/admin/bookings
// @desc    Get all bookings for admin
// @access  Private (Admin)
router.get("/bookings", adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, venue } = req.query

    const filter = {}
    if (status) filter.status = status
    if (venue) filter.venue = venue

    const bookings = await Booking.find(filter)
      .populate("venue", "name location")
      .populate("user", "firstName lastName email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Booking.countDocuments(filter)

    res.json({
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   PUT /api/admin/bookings/:id/status
// @desc    Update booking status
// @access  Private (Admin)
router.put("/bookings/:id/status", adminAuth, async (req, res) => {
  try {
    const { status, adminNotes } = req.body

    const booking = await Booking.findById(req.params.id)
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    booking.status = status
    if (adminNotes) booking.adminNotes = adminNotes

    await booking.save()
    await booking.populate("venue", "name location")
    await booking.populate("user", "firstName lastName email")

    res.json(booking)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin)
router.get("/users", adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query

    const filter = { role: "user" }
    if (search) {
      filter.$or = [
        { firstName: new RegExp(search, "i") },
        { lastName: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ]
    }

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await User.countDocuments(filter)

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
