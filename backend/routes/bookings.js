const express = require("express")
const { body, validationResult } = require("express-validator")
const Booking = require("../models/Booking")
const Venue = require("../models/Venue")
const { auth, adminAuth } = require("../middleware/auth")

const router = express.Router()

// @route   GET /api/bookings
// @desc    Get user bookings
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query

    const filter = { user: req.user.id }
    if (status) filter.status = status

    const bookings = await Booking.find(filter)
      .populate("venue", "name location images pricing")
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

// @route   GET /api/bookings/:id
// @desc    Get booking by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("venue", "name location images pricing contact")
      .populate("user", "firstName lastName email phone")

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    // Check if user owns this booking or is admin
    if (booking.user._id.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" })
    }

    res.json(booking)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      body("venue").notEmpty().withMessage("Venue ID is required"),
      body("eventDate").isISO8601().withMessage("Valid event date is required"),
      body("startTime").notEmpty().withMessage("Start time is required"),
      body("endTime").notEmpty().withMessage("End time is required"),
      body("guestCount").isInt({ min: 1 }).withMessage("Guest count must be at least 1"),
      body("eventType").notEmpty().withMessage("Event type is required"),
      body("contactInfo.firstName").notEmpty().withMessage("First name is required"),
      body("contactInfo.lastName").notEmpty().withMessage("Last name is required"),
      body("contactInfo.email").isEmail().withMessage("Valid email is required"),
      body("contactInfo.phone").notEmpty().withMessage("Phone number is required"),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const {
        venue: venueId,
        eventDate,
        startTime,
        endTime,
        guestCount,
        eventType,
        specialRequests,
        contactInfo,
      } = req.body

      // Check if venue exists
      const venue = await Venue.findById(venueId)
      if (!venue) {
        return res.status(404).json({ message: "Venue not found" })
      }

      // Check venue capacity
      if (guestCount < venue.capacity.min || guestCount > venue.capacity.max) {
        return res.status(400).json({
          message: `Guest count must be between ${venue.capacity.min} and ${venue.capacity.max}`,
        })
      }

      // Check for conflicting bookings
      const conflictingBooking = await Booking.findOne({
        venue: venueId,
        eventDate: new Date(eventDate),
        status: { $in: ["pending", "confirmed"] },
        $or: [
          {
            $and: [{ startTime: { $lte: startTime } }, { endTime: { $gt: startTime } }],
          },
          {
            $and: [{ startTime: { $lt: endTime } }, { endTime: { $gte: endTime } }],
          },
          {
            $and: [{ startTime: { $gte: startTime } }, { endTime: { $lte: endTime } }],
          },
        ],
      })

      if (conflictingBooking) {
        return res.status(400).json({ message: "Venue is not available at the selected time" })
      }

      // Calculate pricing
      const startHour = Number.parseInt(startTime.split(":")[0])
      const endHour = Number.parseInt(endTime.split(":")[0])
      const duration = endHour - startHour
      const subtotal = venue.pricing.hourly * duration
      const tax = subtotal * 0.1 // 10% tax
      const total = subtotal + tax

      const booking = new Booking({
        user: req.user.id,
        venue: venueId,
        eventDate: new Date(eventDate),
        startTime,
        endTime,
        guestCount,
        eventType,
        specialRequests,
        contactInfo,
        pricing: {
          subtotal,
          tax,
          total,
          deposit: venue.pricing.deposit || 0,
        },
      })

      await booking.save()
      await booking.populate("venue", "name location images pricing")

      res.status(201).json(booking)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel booking
// @access  Private
router.put("/:id/cancel", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    // Check if user owns this booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" })
    }

    // Check if booking can be cancelled
    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking is already cancelled" })
    }

    if (booking.status === "completed") {
      return res.status(400).json({ message: "Cannot cancel completed booking" })
    }

    booking.status = "cancelled"
    booking.cancellationReason = req.body.reason || "Cancelled by user"

    await booking.save()
    await booking.populate("venue", "name location images pricing")

    res.json(booking)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
