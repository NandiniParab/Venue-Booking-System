"use client"

import type React from "react"
import { useState } from "react"
import axios from "axios"

interface FormData {
  name: string
  email: string
  phone: string
  age: string
  city: string
  state: string
  initiative: string
  motivation: string
  skills: string
  experience: string
  availability: string
  hoursPerWeek: string
}

interface FormStatus {
  submitting: boolean
  submitted: boolean
  error: string | null
  success: string | null
}

const JoinUsForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    age: "",
    city: "",
    state: "",
    initiative: "",
    motivation: "",
    skills: "",
    experience: "",
    availability: "",
    hoursPerWeek: "",
  })

  const [status, setStatus] = useState<FormStatus>({
    submitting: false,
    submitted: false,
    error: null,
    success: null,
  })

  const initiatives = [
    { value: "ccae", label: "Child Care and Education (CCAE)" },
    { value: "csaa", label: "Community Service and Awareness (CSAA)" },
    { value: "csii", label: "Community Skills and Income Initiative (CSII)" },
    { value: "general", label: "General Volunteer" },
  ]

  const availabilityOptions = [
    { value: "weekdays", label: "Weekdays only" },
    { value: "weekends", label: "Weekends only" },
    { value: "both", label: "Both weekdays and weekends" },
    { value: "flexible", label: "Flexible schedule" },
  ]

  const hoursOptions = [
    { value: "1-5", label: "1-5 hours per week" },
    { value: "6-10", label: "6-10 hours per week" },
    { value: "11-20", label: "11-20 hours per week" },
    { value: "20+", label: "20+ hours per week" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (status.error || status.success) {
      setStatus((prev) => ({ ...prev, error: null, success: null }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setStatus({ submitting: true, submitted: false, error: null, success: null })

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(
        `${apiUrl}/join`,
        {
          ...formData,
          age: Number.parseInt(formData.age),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        },
      )

      if (response.data.success) {
        setStatus({
          submitting: false,
          submitted: true,
          error: null,
          success: response.data.message || "Thank you for your volunteer application! We will contact you soon.",
        })

        setFormData({
          name: "",
          email: "",
          phone: "",
          age: "",
          city: "",
          state: "",
          initiative: "",
          motivation: "",
          skills: "",
          experience: "",
          availability: "",
          hoursPerWeek: "",
        })
      }
    } catch (error: any) {
      console.error("Volunteer application error:", error)

      let errorMessage = "Something went wrong. Please try again."

      if (error.code === "ECONNABORTED") {
        errorMessage = "Request timeout. Please check your connection."
      } else if (error.code === "ERR_NETWORK") {
        errorMessage = "Cannot connect to server. Make sure backend is running on port 5000."
      } else if (error.response) {
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`
      } else if (error.request) {
        errorMessage = "No response from server. Check if backend is running."
      }

      setStatus({
        submitting: false,
        submitted: false,
        error: errorMessage,
        success: null,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Join Our Mission</h1>
            <p className="text-lg text-gray-600 mb-6">
              Be part of the change you want to see in the world. Join SWIS Foundation as a volunteer and make a
              meaningful impact in your community.
            </p>

            {/* Organization Partnership Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">🏢 Organizations & Partnerships</h3>
              <p className="text-blue-800">
                If you represent an organization interested in partnering with us, please reach out directly to{" "}
                <a href="mailto:swisinstitute@gmail.com" className="font-semibold underline hover:text-blue-900">
                  swisinstitute@gmail.com
                </a>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    min="16"
                    max="100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Your age"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Your city"
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Your state"
                  />
                </div>
              </div>
            </div>

            {/* Initiative Selection */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Initiative</h2>

              <div>
                <label htmlFor="initiative" className="block text-sm font-medium text-gray-700 mb-2">
                  Which initiative would you like to be part of? <span className="text-red-500">*</span>
                </label>
                <select
                  id="initiative"
                  name="initiative"
                  value={formData.initiative}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select an initiative</option>
                  {initiatives.map((init) => (
                    <option key={init.value} value={init.value}>
                      {init.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Motivation & Skills */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tell Us About Yourself</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you want to volunteer with SWIS Foundation? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-vertical"
                    placeholder="Share your motivation and what drives you to volunteer..."
                  />
                </div>

                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                    What skills can you bring to our team? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-vertical"
                    placeholder="List your relevant skills, talents, or expertise..."
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Previous volunteer or relevant experience (Optional)
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-vertical"
                    placeholder="Describe any previous volunteer work or relevant experience..."
                  />
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Availability</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                    When are you available? <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select your availability</option>
                    {availabilityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="hoursPerWeek" className="block text-sm font-medium text-gray-700 mb-2">
                    How many hours can you commit per week? <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="hoursPerWeek"
                    name="hoursPerWeek"
                    value={formData.hoursPerWeek}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select hours per week</option>
                    {hoursOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {status.error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{status.error}</p>
              </div>
            )}

            {status.success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-600 text-sm">{status.success}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status.submitting}
              className={`w-full py-4 px-6 rounded-md font-medium text-white transition-colors ${
                status.submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              }`}
            >
              {status.submitting ? "Submitting Application..." : "Submit Volunteer Application"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default JoinUsForm
