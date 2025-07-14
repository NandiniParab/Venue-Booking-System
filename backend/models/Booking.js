const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    guestCount: {
      type: Number,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    specialRequests: {
      type: String,
      default: "",
    },
    pricing: {
      subtotal: {
        type: Number,
        required: true,
      },
      tax: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        required: true,
      },
      deposit: {
        type: Number,
        default: 0,
      },
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    contactInfo: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    cancellationReason: {
      type: String,
      default: "",
    },
    adminNotes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
)

// Index for efficient queries
bookingSchema.index({ user: 1, eventDate: -1 })
bookingSchema.index({ venue: 1, eventDate: 1 })
bookingSchema.index({ status: 1, createdAt: -1 })

module.exports = mongoose.model("Booking", bookingSchema)
