import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-storage")
    if (token) {
      try {
        const parsedToken = JSON.parse(token)
        if (parsedToken.state?.token) {
          config.headers.Authorization = `Bearer ${parsedToken.state.token}`
        }
      } catch (error) {
        console.error("Error parsing token:", error)
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("auth-storage")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default api
