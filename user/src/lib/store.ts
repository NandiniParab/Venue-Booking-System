import { create } from "zustand"
import { persist } from "zustand/middleware"
import api from "./api"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
}

interface Venue {
  _id: string
  name: string
  description: string
  category: string
  location: {
    address: string
    city: string
    state: string
    zipCode: string
  }
  capacity: {
    min: number
    max: number
  }
  pricing: {
    hourly: number
    daily?: number
    deposit: number
  }
  amenities: string[]
  images: Array<{
    url: string
    publicId: string
    caption?: string
  }>
  rating: {
    average: number
    count: number
  }
  featured: boolean
}

interface Booking {
  _id: string
  venue: Venue
  eventDate: string
  startTime: string
  endTime: string
  guestCount: number
  eventType: string
  status: string
  pricing: {
    subtotal: number
    tax: number
    total: number
  }
  createdAt: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  updateProfile: (userData: any) => Promise<void>
}

interface VenueState {
  venues: Venue[]
  currentVenue: Venue | null
  loading: boolean
  fetchVenues: (filters?: any) => Promise<void>
  fetchVenueById: (id: string) => Promise<void>
  searchVenues: (query: string) => Promise<void>
}

interface BookingState {
  bookings: Booking[]
  loading: boolean
  fetchBookings: () => Promise<void>
  createBooking: (bookingData: any) => Promise<void>
  cancelBooking: (id: string, reason?: string) => Promise<void>
}

interface FavoriteState {
  favorites: Venue[]
  loading: boolean
  fetchFavorites: () => Promise<void>
  addToFavorites: (venueId: string) => Promise<void>
  removeFromFavorites: (venueId: string) => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const response = await api.post("/auth/login", { email, password })
          const { token, user } = response.data

          set({ user, token, isAuthenticated: true })
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`
        } catch (error: any) {
          throw new Error(error.response?.data?.message || "Login failed")
        }
      },

      register: async (userData: any) => {
        try {
          const response = await api.post("/auth/register", userData)
          const { token, user } = response.data

          set({ user, token, isAuthenticated: true })
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`
        } catch (error: any) {
          throw new Error(error.response?.data?.message || "Registration failed")
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
        delete api.defaults.headers.common["Authorization"]
      },

      updateProfile: async (userData: any) => {
        try {
          const response = await api.put("/users/profile", userData)
          set({ user: response.data })
        } catch (error: any) {
          throw new Error(error.response?.data?.message || "Profile update failed")
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)

export const useVenueStore = create<VenueState>((set, get) => ({
  venues: [],
  currentVenue: null,
  loading: false,

  fetchVenues: async (filters = {}) => {
    set({ loading: true })
    try {
      const response = await api.get("/venues", { params: filters })
      set({ venues: response.data.venues, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },

  fetchVenueById: async (id: string) => {
    set({ loading: true })
    try {
      const response = await api.get(`/venues/${id}`)
      set({ currentVenue: response.data, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },

  searchVenues: async (query: string) => {
    set({ loading: true })
    try {
      const response = await api.get("/venues", { params: { search: query } })
      set({ venues: response.data.venues, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },
}))

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [],
  loading: false,

  fetchBookings: async () => {
    set({ loading: true })
    try {
      const response = await api.get("/bookings")
      set({ bookings: response.data.bookings, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },

  createBooking: async (bookingData: any) => {
    try {
      const response = await api.post("/bookings", bookingData)
      const newBooking = response.data
      set((state) => ({ bookings: [newBooking, ...state.bookings] }))
      return newBooking
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Booking failed")
    }
  },

  cancelBooking: async (id: string, reason?: string) => {
    try {
      const response = await api.put(`/bookings/${id}/cancel`, { reason })
      const updatedBooking = response.data
      set((state) => ({
        bookings: state.bookings.map((booking) => (booking._id === id ? updatedBooking : booking)),
      }))
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Cancellation failed")
    }
  },
}))

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],
  loading: false,

  fetchFavorites: async () => {
    set({ loading: true })
    try {
      const response = await api.get("/users/favorites")
      set({ favorites: response.data, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },

  addToFavorites: async (venueId: string) => {
    try {
      await api.post(`/users/favorites/${venueId}`)
      // Refresh favorites
      get().fetchFavorites()
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to add to favorites")
    }
  },

  removeFromFavorites: async (venueId: string) => {
    try {
      await api.delete(`/users/favorites/${venueId}`)
      set((state) => ({
        favorites: state.favorites.filter((venue) => venue._id !== venueId),
      }))
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to remove from favorites")
    }
  },
}))

// Initialize auth token if it exists
const authState = useAuthStore.getState()
if (authState.token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${authState.token}`
}
