"use client"

import type React from "react"
import { useState } from "react"

const SimpleFileTest: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<string>("")

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    console.log("🔍 File selected:", selectedFile)

    if (selectedFile) {
      console.log("📄 File details:")
      console.log("  - Name:", selectedFile.name)
      console.log("  - Size:", selectedFile.size)
      console.log("  - Type:", selectedFile.type)
      console.log("  - Constructor:", selectedFile.constructor.name)
      console.log("  - Is File?", selectedFile instanceof File)
      setFile(selectedFile)
    }
  }

  const testUpload = async () => {
    if (!file) {
      setResult("❌ No file selected")
      return
    }

    console.log("🚀 Starting test upload...")

    // Create FormData
    const formData = new FormData()
    formData.append("resume", file, file.name)
    formData.append("testField", "test value")

    console.log("📦 FormData created:")
    console.log("  - resume: FILE -", file.name, `(${file.size} bytes)`)
    console.log("  - testField: test value")

    // Alternative way to check FormData contents
    console.log("🔍 FormData verification:")
    console.log("  - Has resume?", formData.has("resume"))
    console.log("  - Has testField?", formData.has("testField"))

    const resumeFile = formData.get("resume")
    console.log("  - Resume from FormData:", resumeFile)
    console.log("  - Is resume a File?", resumeFile instanceof File)

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/test-upload`, {
        method: "POST",
        body: formData,
      })

      console.log("📥 Response status:", response.status)
      const data = await response.json()
      console.log("📥 Response data:", data)
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      console.error("❌ Error:", error)
      setResult(`Error: ${error}`)
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>🧪 Simple File Upload Test</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          style={{ marginBottom: "10px", display: "block" }}
        />

        {file && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#f0f8ff",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <strong>Selected File:</strong>
            <br />
            Name: {file.name}
            <br />
            Size: {file.size} bytes
            <br />
            Type: {file.type}
          </div>
        )}
      </div>

      <button
        onClick={testUpload}
        disabled={!file}
        style={{
          padding: "10px 20px",
          backgroundColor: file ? "#007bff" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: file ? "pointer" : "not-allowed",
        }}
      >
        🧪 Test Upload
      </button>

      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f8f9fa",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            whiteSpace: "pre-wrap",
            fontSize: "12px",
          }}
        >
          <strong>Result:</strong>
          <br />
          {result}
        </div>
      )}
    </div>
  )
}

export default SimpleFileTest
