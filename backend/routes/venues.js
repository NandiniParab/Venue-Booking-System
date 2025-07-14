const express = require("express")
const { body, validationResult } = require("express-validator")
const Venue = require("../models/Venue")
const { auth, adminAuth } = require("../middleware/auth")

const router = express.Router()

// @route   GET /api/venues
// @desc    Get all venues with filtering and pagination
// @access  Public
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      city,
      category,
      minCapacity,
      maxCapacity,
      minPrice,
      maxPrice,
      search,
      featured,
    } = req.query

    // Build filter object
    const filter = { isActive: true }

    if (city) filter["location.city"] = new RegExp(city, "i")
    if (category) filter.category = category
    if (minCapacity || maxCapacity) {
      filter["capacity.max"] = {}
      if (minCapacity) filter["capacity.max"].$gte = Number.parseInt(minCapacity)
      if (maxCapacity) filter["capacity.min"] = { $lte: Number.parseInt(maxCapacity) }
    }
    if (minPrice || maxPrice) {
      filter["pricing.hourly"] = {}
      if (minPrice) filter["pricing.hourly"].$gte = Number.parseInt(minPrice)
      if (maxPrice) filter["pricing.hourly"].$lte = Number.parseInt(maxPrice)
    }
    if (search) {
      filter.$text = { $search: search }
    }
    if (featured === "true") {
      filter.featured = true
    }

    // Execute query with pagination
    const venues = await Venue.find(filter)
      .populate("owner", "firstName lastName email")
      .sort({ featured: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Venue.countDocuments(filter)

    res.json({
      venues,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   GET /api/venues/:id
// @desc    Get venue by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id)
      .populate("owner", "firstName lastName email phone")
      .populate("reviews.user", "firstName lastName")

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" })
    }

    res.json(venue)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   POST /api/venues
// @desc    Create new venue
// @access  Private (Admin)
router.post(
  "/",
  [
    adminAuth,
    [
      body("name").notEmpty().withMessage("Venue name is required"),
      body("description").notEmpty().withMessage("Description is required"),
      body("category")
        .isIn(["wedding", "corporate", "party", "conference", "outdoor", "restaurant"])
        .withMessage("Invalid category"),
      body("location.address").notEmpty().withMessage("Address is required"),
      body("location.city").notEmpty().withMessage("City is required"),
      body("location.state").notEmpty().withMessage("State is required"),
      body("capacity.min").isNumeric().withMessage("Minimum capacity must be a number"),
      body("capacity.max").isNumeric().withMessage("Maximum capacity must be a number"),
      body("pricing.hourly").isNumeric().withMessage("Hourly price must be a number"),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const venue = new Venue({
        ...req.body,
        owner: req.user.id,
      })

      await venue.save()
      await venue.populate("owner", "firstName lastName email")

      res.status(201).json(venue)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// @route   PUT /api/venues/:id
// @desc    Update venue
// @access  Private (Admin)
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id)

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" })
    }

    Object.assign(venue, req.body)
    await venue.save()
    await venue.populate("owner", "firstName lastName email")

    res.json(venue)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   DELETE /api/venues/:id
// @desc    Delete venue
// @access  Private (Admin)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id)

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" })
    }

    await venue.deleteOne()
    res.json({ message: "Venue deleted successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   POST /api/venues/:id/reviews
// @desc    Add review to venue
// @access  Private
router.post(
  "/:id/reviews",
  [
    auth,
    [
      body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
      body("comment").optional().isLength({ max: 500 }).withMessage("Comment must be less than 500 characters"),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const venue = await Venue.findById(req.params.id)
      if (!venue) {
        return res.status(404).json({ message: "Venue not found" })
      }

      // Check if user already reviewed this venue
      const existingReview = venue.reviews.find((review) => review.user.toString() === req.user.id)

      if (existingReview) {
        return res.status(400).json({ message: "You have already reviewed this venue" })
      }

      const { rating, comment } = req.body

      venue.reviews.push({
        user: req.user.id,
        rating,
        comment,
      })

      // Update average rating
      const totalRating = venue.reviews.reduce((sum, review) => sum + review.rating, 0)
      venue.rating.average = totalRating / venue.reviews.length
      venue.rating.count = venue.reviews.length

      await venue.save()
      await venue.populate("reviews.user", "firstName lastName")

      res.status(201).json(venue)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

module.exports = router
