import "./App.css"
import { BrowserRouter, Routes, Route, useLocation, Router } from "react-router-dom"

// Pages
import Homepage from "./pages/HomePage" // Updated from "./pages/Start"
import LoginPage from './pages/LoginPage';
import VendorRegisterPage from './pages/VendorRegisterPage';

import EazyInvitesPage from "./pages/EazyInvitesPage"
import AboutPage from "./pages/AboutPage"
import HotMuhuratsPage from './pages/HotMuhuratsPage';

import ScrollToTop from "./components/ScrollToTop"
import HotelsPage from "./pages/HotelsPage"
import SubscriptionPage from "./pages/SubscriptionPage"
import VendorsPage from "./pages/VendorsPage"
import VenuesPage from "./pages/VenuesPage"
import UserDashboard from "./pages/user/UserDashboard"
import HomePage from "./pages/HomePage"
import AdminDashboard from './pages/AdminDashboard';


// Components
import Footer from "./components/Footer"
import CombinedHeader from "./components/CombinedHeader"
import ContactPage from "./components/ContactPage"
import JoinUs from "./components/JoinUs"
import FileUploadTest from "./components/FileUploadTest"

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RoutesWithNavbar />
    </BrowserRouter>
  )
}

const RoutesWithNavbar = () => {
  const location = useLocation()
  const hideNavbar = location.pathname === "/landing"

  return (
    <>
      {!hideNavbar && <CombinedHeader />}
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/eazyinvites" element={<EazyInvitesPage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/fileupload" element={<FileUploadTest />} />
        <Route path="/vendors" element={<VendorsPage />} /> 
        <Route path="/user/dashboard" element={<UserDashboard />} />  
        <Route path="/venues" element={<VenuesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/vendor-register" element={<VendorRegisterPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/hot-muhurats" element={<HotMuhuratsPage />} />
        {/* Optional: Redirect unmatched routes to homepage */}
        <Route path="*" element={<Homepage />} />
      </Routes>
      
      {!hideNavbar && <Footer />}
    </>
  )
}

export default App
