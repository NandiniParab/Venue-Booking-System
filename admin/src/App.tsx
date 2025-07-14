import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import Venues from "./pages/Venues"
import Bookings from "./pages/Bookings"
import Users from "./pages/Users"
import Analytics from "./pages/Analytics"
import Login from "./pages/Login"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="flex">
                  <Sidebar />
                  <div className="flex-1 ml-64">
                    <Header />
                    <main className="p-6">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/venues" element={<Venues />} />
                        <Route path="/bookings" element={<Bookings />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/analytics" element={<Analytics />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App
