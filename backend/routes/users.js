const express = require("express")
const { body, validationResult } = require("express-validator")
const User = require("../models/User")
const Venue = require("../models/Venue")
const { auth } = require("../middleware/auth")

const router = express.Router()

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("favorites", "name location images pricing rating")

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put(
  "/profile",
  [
    auth,
    [
      body("firstName").optional().notEmpty().withMessage("First name cannot be empty"),
      body("lastName").optional().notEmpty().withMessage("Last name cannot be empty"),
      body("email").optional().isEmail().withMessage("Please include a valid email"),
      body("phone").optional().isMobilePhone().withMessage("Please include a valid phone number"),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { firstName, lastName, email, phone } = req.body

      // Check if email is already taken by another user
      if (email) {
        const existingUser = await User.findOne({
          email,
          _id: { $ne: req.user.id },
        })

        if (existingUser) {
          return res.status(400).json({ message: "Email is already taken" })
        }
      }

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { firstName, lastName, email, phone },
        { new: true, runValidators: true },
      ).select("-password")

      res.json(user)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// @route   PUT /api/users/password
// @desc    Change user password
// @access  Private
router.put(
  "/password",
  [
    auth,
    [
      body("currentPassword").notEmpty().withMessage("Current password is required"),
      body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters"),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { currentPassword, newPassword } = req.body

      const user = await User.findById(req.user.id)

      // Check current password
      const isMatch = await user.comparePassword(currentPassword)
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" })
      }

      user.password = newPassword
      await user.save()

      res.json({ message: "Password updated successfully" })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// @route   POST /api/users/favorites/:venueId
// @desc    Add venue to favorites
// @access  Private
router.post("/favorites/:venueId", auth, async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.venueId)
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" })
    }

    const user = await User.findById(req.user.id)

    if (user.favorites.includes(req.params.venueId)) {
      return res.status(400).json({ message: "Venue already in favorites" })
    }

    user.favorites.push(req.params.venueId)
    await user.save()

    res.json({ message: "Venue added to favorites" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   DELETE /api/users/favorites/:venueId
// @desc    Remove venue from favorites
// @access  Private
router.delete("/favorites/:venueId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    user.favorites = user.favorites.filter((venueId) => venueId.toString() !== req.params.venueId)

    await user.save()

    res.json({ message: "Venue removed from favorites" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   GET /api/users/favorites
// @desc    Get user favorites
// @access  Private
router.get("/favorites", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites", "name location images pricing rating category")

    res.json(user.favorites)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
