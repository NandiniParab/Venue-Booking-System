"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface Volunteer {
  _id: string
  firstName: string
  lastName: string
  email: string
  contact: string
  domain: string
  age: number
  whyJoinUs: string
  questionsForUs: string
  resumeFileName: string
  resumeFileUrl: string
  applicationId: string
  status: "new" | "under-review" | "accepted" | "rejected" | "on-hold"
  priority: "low" | "medium" | "high"
  appliedAt: string
  reviewedAt?: string
  notes: string
}

const AdminVolunteers: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null)
  const [filter, setFilter] = useState<"all" | "new" | "under-review" | "accepted" | "rejected" | "on-hold">("all")

  useEffect(() => {
    fetchVolunteers()
  }, [])

  const apiUrl = process.env.REACT_APP_API_URL;
  const fetchVolunteers = async () => {
    try {
      const response = await fetch(`${apiUrl}/volunteers`)
      const data = await response.json()
      setVolunteers(data.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching volunteers:", error)
      setLoading(false)
    }
  }

  const updateVolunteerStatus = async (id: string, status: string, notes?: string) => {
    try {
      await fetch(`${apiUrl}/volunteers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, notes }),
      })
      fetchVolunteers() // Refresh the list
      setSelectedVolunteer(null)
    } catch (error) {
      console.error("Error updating volunteer:", error)
    }
  }

  const getInitiativeName = (code: string) => {
    const initiatives = {
      ccae: "CCAE - Child Care and Education",
      csii: "CSII - Community Skills and Income Initiative",
      csaa: "CSAA - Community Service and Awareness",
      general: "General Volunteer",
    }
    return initiatives[code as keyof typeof initiatives] || code
  }

  const filteredVolunteers = volunteers.filter((volunteer) => (filter === "all" ? true : volunteer.status === filter))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "under-review":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "on-hold":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading volunteer applications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Volunteer Applications Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage all volunteer applications</p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex flex-wrap gap-2">
          {["all", "new", "under-review", "accepted", "rejected", "on-hold"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                filter === status ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
              <span className="ml-2 bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">
                {status === "all" ? volunteers.length : volunteers.filter((v) => v.status === status).length}
              </span>
            </button>
          ))}
        </div>

        {/* Volunteers List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredVolunteers.map((volunteer) => (
              <li key={volunteer._id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-medium text-blue-600 truncate">
                          {volunteer.firstName} {volunteer.lastName}
                        </p>
                        <div className="flex space-x-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(volunteer.status)}`}
                          >
                            {volunteer.status}
                          </span>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(volunteer.priority)}`}
                          >
                            {volunteer.priority}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">📧 {volunteer.email}</p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            📞 {volunteer.contact}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          📅 {new Date(volunteer.appliedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          <strong>Domain:</strong> {getInitiativeName(volunteer.domain)}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Age:</strong> {volunteer.age} years
                        </p>
                        {volunteer.resumeFileName && (
                          <p className="text-sm text-gray-600">
                            <strong>Resume:</strong>{" "}
                            <a
                              href={volunteer.resumeFileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline"
                            >
                              📄 {volunteer.resumeFileName}
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedVolunteer(volunteer)}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      View Details
                    </button>
                    <a
                      href={`mailto:${volunteer.email}?subject=Re: Your volunteer application to SWIS Foundation&body=Dear ${volunteer.firstName},%0A%0AThank you for your application to SWIS Foundation.%0A%0A`}
                      className="text-green-600 hover:text-green-900 text-sm font-medium"
                    >
                      Reply
                    </a>
                    <a
                      href={`tel:${volunteer.contact}`}
                      className="text-purple-600 hover:text-purple-900 text-sm font-medium"
                    >
                      Call
                    </a>
                    {volunteer.resumeFileUrl && (
                      <a
                        href={volunteer.resumeFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                      >
                        View Resume
                      </a>
                    )}
                    {volunteer.status === "new" && (
                      <button
                        onClick={() => updateVolunteerStatus(volunteer._id, "under-review")}
                        className="text-yellow-600 hover:text-yellow-900 text-sm font-medium"
                      >
                        Start Review
                      </button>
                    )}
                    {volunteer.status !== "accepted" && volunteer.status !== "rejected" && (
                      <>
                        <button
                          onClick={() => updateVolunteerStatus(volunteer._id, "accepted")}
                          className="text-green-600 hover:text-green-900 text-sm font-medium"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateVolunteerStatus(volunteer._id, "rejected")}
                          className="text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {filteredVolunteers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No volunteer applications found for the selected filter.</p>
          </div>
        )}
      </div>

      {/* Volunteer Detail Modal */}
      {selectedVolunteer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white max-h-[80vh] overflow-y-auto">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Volunteer Application Details</h3>
                <button onClick={() => setSelectedVolunteer(null)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedVolunteer.firstName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedVolunteer.lastName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedVolunteer.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedVolunteer.contact}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedVolunteer.age} years</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Domain</label>
                    <p className="mt-1 text-sm text-gray-900">{getInitiativeName(selectedVolunteer.domain)}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Why do you want to join us?</label>
                  <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{selectedVolunteer.whyJoinUs}</p>
                </div>

                {selectedVolunteer.questionsForUs && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Questions for us</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                      {selectedVolunteer.questionsForUs}
                    </p>
                  </div>
                )}

                {selectedVolunteer.resumeFileName && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Resume</label>
                    <div className="mt-1 flex items-center space-x-3">
                      <p className="text-sm text-gray-900">{selectedVolunteer.resumeFileName}</p>
                      <a
                        href={selectedVolunteer.resumeFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 text-sm"
                      >
                        📄 View PDF
                      </a>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span
                      className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedVolunteer.status)}`}
                    >
                      {selectedVolunteer.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <span
                      className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedVolunteer.priority)}`}
                    >
                      {selectedVolunteer.priority}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Application ID</label>
                  <p className="mt-1 text-sm text-gray-900 font-mono">{selectedVolunteer.applicationId}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Applied At</label>
                  <p className="mt-1 text-sm text-gray-900">{new Date(selectedVolunteer.appliedAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:${selectedVolunteer.email}?subject=Re: Your volunteer application to SWIS Foundation&body=Dear ${selectedVolunteer.firstName},%0A%0AThank you for your application to SWIS Foundation.%0A%0A`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Reply via Email
                </a>
                <a
                  href={`tel:${selectedVolunteer.contact}`}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Call
                </a>
                {selectedVolunteer.resumeFileUrl && (
                  <a
                    href={selectedVolunteer.resumeFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    View Resume
                  </a>
                )}
                {selectedVolunteer.status !== "accepted" && (
                  <button
                    onClick={() => updateVolunteerStatus(selectedVolunteer._id, "accepted")}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Accept Application
                  </button>
                )}
                {selectedVolunteer.status !== "rejected" && (
                  <button
                    onClick={() => updateVolunteerStatus(selectedVolunteer._id, "rejected")}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Reject Application
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminVolunteers
