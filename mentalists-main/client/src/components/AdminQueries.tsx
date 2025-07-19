"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

interface Query {
  _id: string
  name: string
  phone: string
  email: string
  message: string
  status: "new" | "in-progress" | "resolved"
  priority: "low" | "medium" | "high"
  submittedAt: string
  respondedAt?: string
  notes: string
}

const AdminQueries: React.FC = () => {
  const [queries, setQueries] = useState<Query[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null)
  const [filter, setFilter] = useState<"all" | "new" | "in-progress" | "resolved">("all")

  useEffect(() => {
    fetchQueries()
  }, [])

  const apiUrl = process.env.REACT_APP_API_URL;
  const fetchQueries = async () => {
    try {
      const response = await axios.get(`${apiUrl}/queries`)
      setQueries(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching queries:", error)
      setLoading(false)
    }
  }

  const updateQueryStatus = async (id: string, status: string, notes?: string) => {
    try {
      await axios.put(`${apiUrl}/queries/${id}`, { status, notes })
      fetchQueries() // Refresh the list
      setSelectedQuery(null)
    } catch (error) {
      console.error("Error updating query:", error)
    }
  }

  const filteredQueries = queries.filter((query) => (filter === "all" ? true : query.status === filter))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
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
          <p className="mt-4 text-gray-600">Loading queries...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Queries Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage all contact form submissions</p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex space-x-4">
          {["all", "new", "in-progress", "resolved"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                filter === status ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
              <span className="ml-2 bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">
                {status === "all" ? queries.length : queries.filter((q) => q.status === status).length}
              </span>
            </button>
          ))}
        </div>

        {/* Queries List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredQueries.map((query) => (
              <li key={query._id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-medium text-blue-600 truncate">{query.name}</p>
                        <div className="flex space-x-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(query.status)}`}
                          >
                            {query.status}
                          </span>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(query.priority)}`}
                          >
                            {query.priority}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">📧 {query.email}</p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            📞 {query.phone}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          📅 {new Date(query.submittedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 line-clamp-2">{query.message}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <button
                      onClick={() => setSelectedQuery(query)}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      View Details
                    </button>
                    <a
                      href={`mailto:${query.email}?subject=Re: Your query to SWIS Foundation&body=Dear ${query.name},%0A%0AThank you for contacting SWIS Foundation.%0A%0A`}
                      className="text-green-600 hover:text-green-900 text-sm font-medium"
                    >
                      Reply
                    </a>
                    <a
                      href={`tel:${query.phone}`}
                      className="text-purple-600 hover:text-purple-900 text-sm font-medium"
                    >
                      Call
                    </a>
                    {query.status !== "resolved" && (
                      <button
                        onClick={() => updateQueryStatus(query._id, "resolved")}
                        className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                      >
                        Mark Resolved
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {filteredQueries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No queries found for the selected filter.</p>
          </div>
        )}
      </div>

      {/* Query Detail Modal */}
      {selectedQuery && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Query Details</h3>
                <button onClick={() => setSelectedQuery(null)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedQuery.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedQuery.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedQuery.phone}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{selectedQuery.message}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span
                      className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedQuery.status)}`}
                    >
                      {selectedQuery.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <span
                      className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedQuery.priority)}`}
                    >
                      {selectedQuery.priority}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Submitted At</label>
                  <p className="mt-1 text-sm text-gray-900">{new Date(selectedQuery.submittedAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <a
                  href={`mailto:${selectedQuery.email}?subject=Re: Your query to SWIS Foundation&body=Dear ${selectedQuery.name},%0A%0AThank you for contacting SWIS Foundation.%0A%0A`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Reply via Email
                </a>
                <a
                  href={`tel:${selectedQuery.phone}`}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Call
                </a>
                {selectedQuery.status !== "resolved" && (
                  <button
                    onClick={() => updateQueryStatus(selectedQuery._id, "resolved")}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Mark as Resolved
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

export default AdminQueries
