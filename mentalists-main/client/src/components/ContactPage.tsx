"use client";

import type React from "react";
import { useState } from "react";
import axios from "axios";

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface FormStatus {
  submitting: boolean;
  submitted: boolean;
  error: string | null;
  success: string | null;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>({
    submitting: false,
    submitted: false,
    error: null,
    success: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (status.error || status.success) {
      setStatus((prev) => ({ ...prev, error: null, success: null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus({
      submitting: true,
      submitted: false,
      error: null,
      success: null,
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      if (response.data.success) {
        setStatus({
          submitting: false,
          submitted: true,
          error: null,
          success:
            response.data.message ||
            "Message sent successfully! We will get back to you soon.",
        });

        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
      }
    } catch (error: any) {
      console.error("Contact form error:", error);

      let errorMessage = "Something went wrong. Please try again.";

      if (error.code === "ECONNABORTED") {
        errorMessage = "Request timeout. Please check your connection.";
      } else if (error.code === "ERR_NETWORK") {
        errorMessage =
          "Cannot connect to server. Make sure backend is running on port 5000.";
      } else if (error.request) {
        errorMessage = "No response from server. Check if backend is running.";
      }

      setStatus({
        submitting: false,
        submitted: false,
        error: errorMessage,
        success: null,
      });
    }
  };

  // Success page with consistent spacing
  if (status.submitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Message Sent Successfully!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              We will get back to you soon.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Registered Office
              </h2>
              <div className="space-y-2 text-gray-600">
                <p className="font-medium">SWIS Foundation:</p>
                <p>1-24-607/1, First Floor, Road No. 5,</p>
                <p>Maruthi Nagar Colony, Lothkunta,</p>
                <p>Hyderabad 500015, Telangana - India</p>
                <div className="mt-4 space-y-1">
                  <p>
                    <strong>Email:</strong> swisinstitute@gmail.com
                  </p>
                  <p>
                    <strong>Mobile:</strong> +91 848 200 4559
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                FOR ALL GENERAL QUERIES
              </h3>
              <p className="text-blue-600">swisinstitute@gmail.com</p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Get in Touch
              </h2>
              <p className="text-gray-600">
                For any grievance, suggestions and queries kindly write to us.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Phone"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                  placeholder="Message"
                />
              </div>

              {status.error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm">{status.error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status.submitting}
                className={`w-full py-3 px-6 rounded-md font-medium text-white transition-colors ${
                  status.submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                }`}
              >
                {status.submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;