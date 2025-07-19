"use client"

import type React from "react"
import { useState } from "react"

const FileUploadTest: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [result, setResult] = useState<any>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    console.log("🧪 Test - File selected:", file)
    setSelectedFile(file || null)
  }

  const testUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first")
      return
    }

    console.log("🧪 Testing file upload...")
    console.log("📄 File details:", {
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
    })

    const formData = new FormData()
    formData.append("resume", selectedFile, selectedFile.name)
    formData.append("name", "Test User")

    console.log("📤 FormData created, sending to test endpoint...")

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/test-upload`, {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      console.log("📥 Test response:", data)
      setResult(data)
    } catch (error: any) {
      console.error("❌ Test upload error:", error)
      setResult({ error: error.message })
    }
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", padding: "32px" }}>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px" }}>🧪 File Upload Test</h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>
              Select PDF File:
            </label>
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
              }}
            />
          </div>

          {selectedFile && (
            <div
              style={{ padding: "12px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "4px" }}
            >
              <p style={{ fontSize: "14px", color: "#15803d" }}>
                ✅ Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
              </p>
              <p style={{ fontSize: "12px", color: "#16a34a" }}>Type: {selectedFile.type}</p>
            </div>
          )}

          <button
            onClick={testUpload}
            disabled={!selectedFile}
            style={{
              backgroundColor: selectedFile ? "#2563eb" : "#9ca3af",
              color: "white",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
              cursor: selectedFile ? "pointer" : "not-allowed",
            }}
          >
            🧪 Test Upload
          </button>

          {result && (
            <div
              style={{
                marginTop: "16px",
                padding: "16px",
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "4px",
              }}
            >
              <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>Test Result:</h3>
              <pre style={{ fontSize: "12px", overflow: "auto", whiteSpace: "pre-wrap" }}>
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FileUploadTest
