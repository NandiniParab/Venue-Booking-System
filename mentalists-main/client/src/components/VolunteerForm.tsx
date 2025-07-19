"use client"

import type React from "react"
import { useState } from "react"

interface VolunteerFormData {
  domain: string
  firstName: string
  lastName: string
  contact: string
  dateOfBirth: string
  email: string
  whyJoinUs: string
  questionsForUs: string
}

interface FormStatus {
  submitting: boolean
  submitted: boolean
  error: string | null
  success: string | null
}

const VolunteerForm: React.FC = () => {
  const [formData, setFormData] = useState<VolunteerFormData>({
    domain: "",
    firstName: "",
    lastName: "",
    contact: "",
    dateOfBirth: "",
    email: "",
    whyJoinUs: "",
    questionsForUs: "",
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [status, setStatus] = useState<FormStatus>({
    submitting: false,
    submitted: false,
    error: null,
    success: null,
  })

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    console.log("🔍 FILE CHANGE EVENT:")
    console.log("  - Selected file:", file)

    if (file) {
      console.log("✅ FILE SELECTED:")
      console.log("  - Name:", file.name)
      console.log("  - Size:", file.size, "bytes")
      console.log("  - Type:", file.type)
      console.log("  - Last modified:", new Date(file.lastModified))

      // Validate file type
      if (file.type !== "application/pdf") {
        console.log("❌ INVALID FILE TYPE:", file.type)
        setStatus((prev) => ({ ...prev, error: "Please select a PDF file only." }))
        setSelectedFile(null)
        return
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        console.log("❌ FILE TOO LARGE:", file.size)
        setStatus((prev) => ({ ...prev, error: "File size must be less than 5MB." }))
        setSelectedFile(null)
        return
      }

      console.log("✅ VALID PDF FILE ACCEPTED")
      setSelectedFile(file)
      setStatus((prev) => ({ ...prev, error: null }))
    } else {
      console.log("❌ NO FILE SELECTED")
      console.log(e)
      setSelectedFile(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("🚀 FORM SUBMISSION STARTED")
    console.log("📝 Form data:", formData)
    console.log("📄 Selected file:", selectedFile)

    setStatus({ submitting: true, submitted: false, error: null, success: null })

    try {
      // 🔧 FIXED: Create FormData object properly
      console.log("📦 CREATING FORMDATA OBJECT...")
      const submitData = new FormData()

      // Add all form fields
      console.log("📝 ADDING FORM FIELDS:")
      Object.entries(formData).forEach(([key, value]) => {
        if (value && typeof value === "string" && value.trim() !== "") {
          submitData.append(key, value.trim())
          console.log(`  ✅ ${key}: ${value}`)
        }
      })

      // Add file if selected
      if (selectedFile && selectedFile instanceof File) {
        console.log("📎 ADDING FILE TO FORMDATA:")
        console.log("  - File object:", selectedFile)
        console.log("  - File name:", selectedFile.name)
        console.log("  - File size:", selectedFile.size)
        console.log("  - File type:", selectedFile.type)

        submitData.append("resume", selectedFile, selectedFile.name)
        console.log("  ✅ FILE ADDED TO FORMDATA WITH KEY 'resume'")

        // Verify the file was added
        const checkFile = submitData.get("resume")
        console.log("  - Verification - file in FormData:", checkFile)
        console.log("  - Verification - is File?", checkFile instanceof File)
      } else {
        console.log("⚠️ NO FILE TO ADD OR INVALID FILE")
      }

      // 🔧 FIXED: Log FormData contents properly
      console.log("🔍 FINAL FORMDATA CONTENTS:")
      console.log("  - Has domain?", submitData.has("domain"))
      console.log("  - Has firstName?", submitData.has("firstName"))
      console.log("  - Has lastName?", submitData.has("lastName"))
      console.log("  - Has contact?", submitData.has("contact"))
      console.log("  - Has dateOfBirth?", submitData.has("dateOfBirth"))
      console.log("  - Has email?", submitData.has("email"))
      console.log("  - Has whyJoinUs?", submitData.has("whyJoinUs"))
      console.log("  - Has resume?", submitData.has("resume"))

      // Get and verify each field
      console.log("📋 FORMDATA VALUES:")
      console.log("  - domain:", submitData.get("domain"))
      console.log("  - firstName:", submitData.get("firstName"))
      console.log("  - lastName:", submitData.get("lastName"))
      console.log("  - contact:", submitData.get("contact"))
      console.log("  - dateOfBirth:", submitData.get("dateOfBirth"))
      console.log("  - email:", submitData.get("email"))
      console.log("  - whyJoinUs:", submitData.get("whyJoinUs"))

      const resumeFile = submitData.get("resume")
      if (resumeFile instanceof File) {
        console.log("  - resume: FILE -", resumeFile.name, `(${resumeFile.size} bytes)`)
      } else {
        console.log("  - resume: NOT A FILE OR MISSING")
      }

      console.log("📤 SENDING REQUEST TO SERVER...")
      const apiUrl = process.env.REACT_APP_API_URL;
      console.log(`  - URL: ${apiUrl}/volunteer-simple`)
      console.log("  - Method: POST")
      console.log("  - Body type:", submitData.constructor.name)
      console.log("  - Content-Type: (will be auto-set by browser for multipart/form-data)")

      // 🔧 FIXED: Send FormData without setting Content-Type header
      const response = await fetch(`${apiUrl}/volunteer-simple`, {
        method: "POST",
        body: submitData,
        // CRITICAL: Do NOT set Content-Type header - let browser set it automatically
      })

      console.log("📥 RESPONSE RECEIVED:")
      console.log("  - Status:", response.status)
      console.log("  - Status text:", response.statusText)
      console.log("  - Headers:", response.headers)

      const responseData = await response.json()
      console.log("📥 RESPONSE DATA:", responseData)

      if (responseData.success) {
        setStatus({
          submitting: false,
          submitted: true,
          error: null,
          success: responseData.message || "Thank you for your application! We will contact you soon.",
        })

        // Reset form
        setFormData({
          domain: "",
          firstName: "",
          lastName: "",
          contact: "",
          dateOfBirth: "",
          email: "",
          whyJoinUs: "",
          questionsForUs: "",
        })
        setSelectedFile(null)

        // Reset file input
        const fileInput = document.getElementById("resume") as HTMLInputElement
        if (fileInput) {
          fileInput.value = ""
        }
      } else {
        throw new Error(responseData.message || "Application submission failed")
      }
    } catch (error: any) {
      console.error("❌ APPLICATION SUBMISSION ERROR:", error)

      let errorMessage = "Something went wrong. Please try again."

      if (error.message.includes("fetch")) {
        errorMessage = "Cannot connect to server. Make sure backend is running on port 5000."
      } else if (error.message) {
        errorMessage = error.message
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
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", padding: "48px 16px" }}>
      <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "32px",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ marginBottom: "32px" }}>
            <h1 style={{ fontSize: "30px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>
              Join SWIS Foundation
            </h1>
            <p style={{ color: "#6b7280" }}>Become a volunteer and make a difference in your community</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Domain Selection */}
            <div>
              <label
                htmlFor="domain"
                style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}
              >
                Volunteer Domain <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <select
                id="domain"
                name="domain"
                value={formData.domain}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "16px",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
              >
                <option value="">Select a domain</option>
                <option value="ccae">CCAE - Child Care and Education</option>
                <option value="csii">CSII - Community Skills and Income Initiative</option>
                <option value="csaa">CSAA - Community Service and Awareness</option>
                <option value="general">General Volunteer</option>
              </select>
            </div>

            {/* Name Fields */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label
                  htmlFor="firstName"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  First Name <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  placeholder="First Name"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "16px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Last Name <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  placeholder="Last Name"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "16px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                />
              </div>
            </div>

            {/* Contact and Date of Birth */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label
                  htmlFor="contact"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Contact Number <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  placeholder="Contact Number"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "16px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="dateOfBirth"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Date of Birth <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "16px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}
              >
                Email Address <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Email Address"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "16px",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label
                htmlFor="resume"
                style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}
              >
                Resume (PDF only) <span style={{ color: "#6b7280" }}>(Optional)</span>
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "16px",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
              />
              {selectedFile && (
                <div
                  style={{
                    marginTop: "8px",
                    padding: "12px",
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    borderRadius: "6px",
                  }}
                >
                  <p style={{ fontSize: "14px", color: "#15803d", margin: 0 }}>
                    ✅ Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                  </p>
                  <p style={{ fontSize: "12px", color: "#16a34a", margin: "4px 0 0 0" }}>Type: {selectedFile.type}</p>
                </div>
              )}
              <p style={{ marginTop: "4px", fontSize: "12px", color: "#6b7280" }}>
                Upload your resume in PDF format (max 5MB)
              </p>
            </div>

            {/* Why Join Us */}
            <div>
              <label
                htmlFor="whyJoinUs"
                style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}
              >
                Why do you want to join us? <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea
                id="whyJoinUs"
                name="whyJoinUs"
                value={formData.whyJoinUs}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Tell us why you want to volunteer with SWIS Foundation..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "16px",
                  outline: "none",
                  transition: "border-color 0.2s",
                  resize: "vertical",
                }}
              />
            </div>

            {/* Questions for Us */}
            <div>
              <label
                htmlFor="questionsForUs"
                style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}
              >
                Any questions for us? <span style={{ color: "#6b7280" }}>(Optional)</span>
              </label>
              <textarea
                id="questionsForUs"
                name="questionsForUs"
                value={formData.questionsForUs}
                onChange={handleInputChange}
                rows={3}
                placeholder="Any questions or additional information you'd like to share..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "16px",
                  outline: "none",
                  transition: "border-color 0.2s",
                  resize: "vertical",
                }}
              />
            </div>

            {/* Status Messages */}
            {status.error && (
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "6px",
                }}
              >
                <p style={{ color: "#dc2626", fontSize: "14px", margin: 0 }}>{status.error}</p>
              </div>
            )}

            {status.success && (
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "6px",
                }}
              >
                <p style={{ color: "#15803d", fontSize: "14px", margin: 0 }}>{status.success}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.submitting}
              style={{
                width: "100%",
                padding: "12px 24px",
                borderRadius: "6px",
                fontWeight: "500",
                color: "white",
                border: "none",
                cursor: status.submitting ? "not-allowed" : "pointer",
                backgroundColor: status.submitting ? "#9ca3af" : "#2563eb",
                transition: "background-color 0.2s",
              }}
            >
              {status.submitting ? "Submitting Application..." : "Submit Application"}
            </button>
          </form>

          {/* Debug Info */}
          {selectedFile && (
            <div
              style={{
                marginTop: "32px",
                padding: "16px",
                backgroundColor: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: "6px",
              }}
            >
              <h3 style={{ fontWeight: "bold", color: "#1e40af", marginBottom: "8px" }}>🔍 Debug Info:</h3>
              <p style={{ fontSize: "14px", color: "#1d4ed8", margin: "4px 0" }}>File selected: {selectedFile.name}</p>
              <p style={{ fontSize: "14px", color: "#1d4ed8", margin: "4px 0" }}>
                File size: {selectedFile.size} bytes
              </p>
              <p style={{ fontSize: "14px", color: "#1d4ed8", margin: "4px 0" }}>File type: {selectedFile.type}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VolunteerForm
