import React, { useState, useEffect, useRef } from 'react';
import { Home, Building, Calendar, Users, User, BarChart2, Bell, MessageCircle, Settings, LogOut, Plus, Edit, Trash2, CheckCircle, XCircle, Image as ImageIcon, Lock, Unlock } from 'lucide-react';

const sidebarLinks = [
  { icon: Home, label: 'Dashboard' },
  { icon: Building, label: 'Venues' },
  { icon: Calendar, label: 'Bookings' },
  { icon: Users, label: 'Users' },
  { icon: User, label: 'Vendors' },
  { icon: BarChart2, label: 'Analytics' },
  { icon: Bell, label: 'Notifications' },
  { icon: MessageCircle, label: 'Support' },
  { icon: Settings, label: 'Settings' },
  { icon: LogOut, label: 'Logout' },
];

const amenitiesList = [
  'WiFi', 'Parking', 'Catering', 'Sound System', 'Projector', 'Pool', 'Garden', 'Kitchen', 'Coffee Service', 'Stage', 'Lighting', 'Security'
];

const mockStats = [
  { label: 'Total Venues', value: 42 },
  { label: 'Total Bookings', value: 128 },
  { label: 'Total Users', value: 350 },
  { label: 'Total Vendors', value: 18 },
  { label: 'Revenue', value: '₹12.5L' },
];

const mockVenues = [
  { id: 1, name: 'Grand Ballroom', location: 'Mumbai', price: '₹50,000', status: 'Active' },
  { id: 2, name: 'Beachside Resort', location: 'Goa', price: '₹40,000', status: 'Blocked' },
  { id: 3, name: 'Modern Conference Center', location: 'Delhi', price: '₹35,000', status: 'Active' },
];

const mockBookings = [
  { id: 101, venue: 'Grand Ballroom', user: 'John Doe', date: '2024-07-20', status: 'Pending' },
  { id: 102, venue: 'Beachside Resort', user: 'Priya Sharma', date: '2024-07-22', status: 'Approved' },
  { id: 103, venue: 'Modern Conference Center', user: 'Arjun Patel', date: '2024-07-25', status: 'Canceled' },
];

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active' },
  { id: 2, name: 'Priya Sharma', email: 'priya@example.com', role: 'Vendor', status: 'Active' },
  { id: 3, name: 'Arjun Patel', email: 'arjun@example.com', role: 'User', status: 'Inactive' },
];

const mockVendors = [
  { id: 1, name: 'Priya Sharma', business: 'Spice Garden Catering', status: 'Active' },
  { id: 2, name: 'Sneha Reddy', business: 'Elegant Decorators', status: 'Inactive' },
];

const mockNotifications = [
  { id: 1, message: 'New booking received for Grand Ballroom', time: '2m ago' },
  { id: 2, message: 'User John Doe signed up', time: '10m ago' },
  { id: 3, message: 'Venue Beachside Resort updated', time: '1h ago' },
];

const mockActivities = [
  { id: 1, action: 'Booking Approved', detail: 'Booking #102', time: '5m ago' },
  { id: 2, action: 'Venue Added', detail: 'Modern Conference Center', time: '30m ago' },
  { id: 3, action: 'User Activated', detail: 'Arjun Patel', time: '1h ago' },
];

const AdminDashboard = () => {
  const [active, setActive] = useState('Dashboard');
  const [showVenueModal, setShowVenueModal] = useState(false);
  const [venueImage, setVenueImage] = useState(null);
  const [venueForm, setVenueForm] = useState({ name: '', address: '', capacity: '', pricing: '', amenities: [], status: 'Active', image: null });
  const [venues, setVenues] = useState(mockVenues);
  const [editVenueId, setEditVenueId] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { from: 'user', text: 'Hi Admin, I need help with a booking.' },
    { from: 'admin', text: 'Hello! How can I assist you?' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Highlight sidebar based on hash or pathname
    const hash = window.location.hash.replace('#', '');
    if (hash && sidebarLinks.some(l => l.label.toLowerCase() === hash.toLowerCase())) {
      setActive(hash.charAt(0).toUpperCase() + hash.slice(1));
    }
    // Listen for hash changes
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && sidebarLinks.some(l => l.label.toLowerCase() === hash.toLowerCase())) {
        setActive(hash.charAt(0).toUpperCase() + hash.slice(1));
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Sidebar click handler
  const handleSidebarClick = (label) => {
    if (label === 'Logout') {
      localStorage.removeItem('user');
      window.location.href = '/login';
      return;
    }
    setActive(label);
  };

  // Venue Modal Handlers
  const openAddVenue = () => {
    setVenueForm({ name: '', address: '', capacity: '', pricing: '', amenities: [], status: 'Active', image: null });
    setVenueImage(null);
    setEditVenueId(null);
    setShowVenueModal(true);
  };
  const openEditVenue = (venue) => {
    setVenueForm({ ...venue, image: null });
    setVenueImage(null);
    setEditVenueId(venue.id);
    setShowVenueModal(true);
  };
  const handleVenueFormChange = (e) => {
    const { name, value } = e.target;
    setVenueForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleAmenityToggle = (amenity) => {
    setVenueForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };
  const handleVenueImage = (file) => {
    setVenueImage(file);
    setVenueForm((prev) => ({ ...prev, image: file }));
  };
  const handleVenueSubmit = (e) => {
    e.preventDefault();
    if (!venueForm.name || !venueForm.address || !venueForm.capacity || !venueForm.pricing) return;
    if (editVenueId) {
      setVenues(venues.map(v => v.id === editVenueId ? { ...venueForm, id: editVenueId, image: venueImage ? URL.createObjectURL(venueImage) : v.image } : v));
    } else {
      setVenues([
        ...venues,
        {
          ...venueForm,
          id: Date.now(),
          image: venueImage ? URL.createObjectURL(venueImage) : '',
        },
      ]);
    }
    setShowVenueModal(false);
  };
  const handleVenueDelete = (id) => {
    setVenues(venues.filter(v => v.id !== id));
  };
  const handleVenueBlock = (id) => {
    setVenues(venues.map(v => v.id === id ? { ...v, status: v.status === 'Blocked' ? 'Active' : 'Blocked' } : v));
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((msgs) => [...msgs, { from: 'admin', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages((msgs) => [...msgs, { from: 'user', text: 'Thank you for your help!' }]);
    }, 1000);
  };
  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="min-h-screen flex bg-[#ffe9c1]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#3a0303] text-[#ffe9c1] py-8 px-4 sticky top-0 h-screen shadow-lg">
        <div className="mb-10 flex items-center gap-3">
          <div className="bg-white rounded-full p-2"><User className="h-8 w-8 text-[#a53f3f]" /></div>
          <div>
            <div className="font-bold text-lg">Admin</div>
            <div className="text-xs text-[#f4ce74]">Superuser</div>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          {sidebarLinks.map(link => (
            <button
              key={link.label}
              onClick={() => handleSidebarClick(link.label)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all font-medium ${active === link.label ? 'bg-[#a53f3f] text-white' : 'hover:bg-[#a53f3f] hover:text-white'}`}
            >
              {React.createElement(link.icon, { className: 'h-5 w-5' })}
              <span>{link.label}</span>
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 px-2 md:px-8 py-8">
        {/* Dashboard Overview */}
        {active === 'Dashboard' && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-[#a53f3f]">Admin Dashboard</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
              {mockStats.map(stat => (
                <div key={stat.label} className="bg-[#f4ce74] rounded-xl p-6 shadow text-center">
                  <div className="text-2xl font-bold text-[#3a0303]">{stat.value}</div>
                  <div className="text-sm text-[#a53f3f] mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow">
                <h2 className="font-bold text-lg mb-4 text-[#a53f3f]">Recent Activities</h2>
                <ul className="space-y-2">
                  {mockActivities.map(act => (
                    <li key={act.id} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="font-medium">{act.action}</span>
                      <span className="text-[#a53f3f]">{act.detail}</span>
                      <span className="text-xs text-[#888] ml-auto">{act.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 shadow">
                <h2 className="font-bold text-lg mb-4 text-[#a53f3f]">Notifications</h2>
                <ul className="space-y-2">
                  {mockNotifications.map(n => (
                    <li key={n.id} className="flex items-center gap-3 text-sm">
                      <Bell className="h-4 w-4 text-[#a53f3f]" />
                      <span>{n.message}</span>
                      <span className="text-xs text-[#888] ml-auto">{n.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
        {/* Venues Management */}
        {active === 'Venues' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-[#a53f3f]">Venues</h2>
              <button onClick={openAddVenue} className="flex items-center gap-2 bg-[#a53f3f] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#3a0303]">
                <Plus className="h-4 w-4" /> Add Venue
              </button>
            </div>
            {/* Venue Modal */}
            {showVenueModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-lg relative">
                  <button onClick={() => setShowVenueModal(false)} className="absolute top-2 right-2 text-[#a53f3f]">✕</button>
                  <h3 className="text-xl font-bold mb-4 text-[#a53f3f]">{editVenueId ? 'Edit Venue' : 'Add Venue'}</h3>
                  <form className="space-y-4" onSubmit={handleVenueSubmit}>
                    <div>
                      <label className="block mb-1 font-medium text-[#3a0303]">Venue Name</label>
                      <input name="name" className="w-full border border-[#f4ce74] rounded-lg px-3 py-2" placeholder="Venue Name" value={venueForm.name} onChange={handleVenueFormChange} />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-[#3a0303]">Address</label>
                      <input name="address" className="w-full border border-[#f4ce74] rounded-lg px-3 py-2" placeholder="Address" value={venueForm.address} onChange={handleVenueFormChange} />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-[#3a0303]">Capacity</label>
                      <input name="capacity" className="w-full border border-[#f4ce74] rounded-lg px-3 py-2" placeholder="Capacity" value={venueForm.capacity} onChange={handleVenueFormChange} />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-[#3a0303]">Pricing</label>
                      <input name="pricing" className="w-full border border-[#f4ce74] rounded-lg px-3 py-2" placeholder="Pricing" value={venueForm.pricing} onChange={handleVenueFormChange} />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-[#3a0303]">Amenities</label>
                      <div className="flex flex-wrap gap-2">
                        {amenitiesList.map(am => (
                          <button type="button" key={am} onClick={() => handleAmenityToggle(am)} className={`px-3 py-1 rounded-full border ${venueForm.amenities.includes(am) ? 'bg-[#a53f3f] text-white border-[#a53f3f]' : 'bg-white text-[#a53f3f] border-[#a53f3f]'}`}>{am}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-[#3a0303]">Upload Images</label>
                      <div className="border-2 border-dashed border-[#a53f3f] rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer bg-[#f4ce74]"
                        onDragOver={e => e.preventDefault()}
                        onDrop={e => { e.preventDefault(); handleVenueImage(e.dataTransfer.files[0]); }}
                        onClick={() => document.getElementById('venue-image-input').click()}
                      >
                        <ImageIcon className="h-8 w-8 text-[#a53f3f] mb-2" />
                        <span className="text-[#a53f3f]">Drag & drop or click to upload</span>
                        <input id="venue-image-input" type="file" accept="image/*" className="hidden" onChange={e => handleVenueImage(e.target.files[0])} />
                        {venueImage && <div className="mt-2 text-[#3a0303]">Selected: {venueImage.name}</div>}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" className="bg-[#a53f3f] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#3a0303]">{editVenueId ? 'Save Changes' : 'Save Venue'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#a53f3f]">
                  <th className="py-2">Name</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {venues.map(v => (
                  <tr key={v.id} className="border-b">
                    <td className="py-2 font-medium flex items-center gap-2">
                      {v.image && <img src={v.image} alt="venue" className="h-8 w-8 rounded object-cover" />}
                      {v.name}
                    </td>
                    <td>{v.location}</td>
                    <td>{v.pricing || v.price}</td>
                    <td>{v.status}</td>
                    <td className="flex gap-2">
                      <button className="p-1 rounded hover:bg-[#f4ce74]" onClick={() => openEditVenue(v)}><Edit className="h-4 w-4 text-[#a53f3f]" /></button>
                      <button className="p-1 rounded hover:bg-[#f4ce74]" onClick={() => handleVenueDelete(v.id)}><Trash2 className="h-4 w-4 text-red-500" /></button>
                      <button className="p-1 rounded hover:bg-[#f4ce74]" onClick={() => handleVenueBlock(v.id)}>{v.status === 'Blocked' ? <Unlock className="h-4 w-4 text-green-500" /> : <Lock className="h-4 w-4 text-yellow-500" />}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Interactive Calendar Placeholder */}
            <div className="mt-8">
              <h3 className="font-bold text-lg text-[#a53f3f] mb-2">Availability Calendar (Demo)</h3>
              <div className="bg-[#f4ce74] rounded-xl p-6 shadow text-center">
                <div className="h-48 flex items-center justify-center text-[#a53f3f]">[Interactive Calendar Placeholder]</div>
              </div>
            </div>
          </div>
        )}
        {/* Bookings Management */}
        {active === 'Bookings' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-bold text-lg text-[#a53f3f] mb-4">Bookings</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#a53f3f]">
                  <th className="py-2">Booking ID</th>
                  <th>Venue</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockBookings.map(b => (
                  <tr key={b.id} className="border-b">
                    <td className="py-2 font-medium">{b.id}</td>
                    <td>{b.venue}</td>
                    <td>{b.user}</td>
                    <td>{b.date}</td>
                    <td>{b.status}</td>
                    <td className="flex gap-2">
                      <button className="p-1 rounded hover:bg-[#f4ce74]"><CheckCircle className="h-4 w-4 text-green-500" /></button>
                      <button className="p-1 rounded hover:bg-[#f4ce74]"><XCircle className="h-4 w-4 text-red-500" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Users Management */}
        {active === 'Users' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-bold text-lg text-[#a53f3f] mb-4">Users</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#a53f3f]">
                  <th className="py-2">Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map(u => (
                  <tr key={u.id} className="border-b">
                    <td className="py-2 font-medium">{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>{u.status}</td>
                    <td className="flex gap-2">
                      <button className="p-1 rounded hover:bg-[#f4ce74]">{u.status === 'Active' ? <XCircle className="h-4 w-4 text-red-500" /> : <CheckCircle className="h-4 w-4 text-green-500" />}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Vendors Management */}
        {active === 'Vendors' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-bold text-lg text-[#a53f3f] mb-4">Vendors</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#a53f3f]">
                  <th className="py-2">Name</th>
                  <th>Business</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockVendors.map(v => (
                  <tr key={v.id} className="border-b">
                    <td className="py-2 font-medium">{v.name}</td>
                    <td>{v.business}</td>
                    <td>{v.status}</td>
                    <td className="flex gap-2">
                      <button className="p-1 rounded hover:bg-[#f4ce74]">{v.status === 'Active' ? <XCircle className="h-4 w-4 text-red-500" /> : <CheckCircle className="h-4 w-4 text-green-500" />}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Analytics */}
        {active === 'Analytics' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-bold text-lg text-[#a53f3f] mb-4">Analytics (Demo)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#f4ce74] rounded-xl p-6 shadow text-center">
                <div className="font-bold text-lg mb-2 text-[#3a0303]">Revenue Trend</div>
                <div className="h-32 flex items-center justify-center text-[#a53f3f]">[Line Chart Placeholder]</div>
              </div>
              <div className="bg-[#f4ce74] rounded-xl p-6 shadow text-center">
                <div className="font-bold text-lg mb-2 text-[#3a0303]">Booking Trend</div>
                <div className="h-32 flex items-center justify-center text-[#a53f3f]">[Bar Chart Placeholder]</div>
              </div>
              <div className="bg-[#f4ce74] rounded-xl p-6 shadow text-center">
                <div className="font-bold text-lg mb-2 text-[#3a0303]">Venue Performance</div>
                <div className="h-32 flex items-center justify-center text-[#a53f3f]">[Pie Chart Placeholder]</div>
              </div>
              <div className="bg-[#f4ce74] rounded-xl p-6 shadow text-center">
                <div className="font-bold text-lg mb-2 text-[#3a0303]">Booking Heatmap</div>
                <div className="h-32 flex items-center justify-center text-[#a53f3f]">[Heatmap Placeholder]</div>
              </div>
            </div>
            <div className="mt-6 text-right">
              <button className="bg-[#a53f3f] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#3a0303]">Export CSV</button>
            </div>
          </div>
        )}
        {/* Notifications */}
        {active === 'Notifications' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-bold text-lg text-[#a53f3f] mb-4">Notifications</h2>
            <ul className="space-y-2">
              {mockNotifications.map(n => (
                <li key={n.id} className="flex items-center gap-3 text-sm">
                  <Bell className="h-4 w-4 text-[#a53f3f]" />
                  <span>{n.message}</span>
                  <span className="text-xs text-[#888] ml-auto">{n.time}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Support Chat */}
        {active === 'Support' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-bold text-lg text-[#a53f3f] mb-4">Support Chat (Demo)</h2>
            <div className="h-64 bg-[#f4ce74] rounded-xl flex flex-col justify-end p-4 overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`mb-2 flex ${msg.from === 'admin' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`px-4 py-2 rounded-lg shadow ${msg.from === 'admin' ? 'bg-[#a53f3f] text-white' : 'bg-white text-[#a53f3f]'}`}>{msg.text}</div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={sendChat} className="flex gap-2 mt-2">
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-[#f4ce74]" placeholder="Type a message..." />
              <button type="submit" className="bg-[#a53f3f] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#3a0303]">Send</button>
            </form>
          </div>
        )}
        {/* Settings */}
        {active === 'Settings' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-bold text-lg text-[#a53f3f] mb-4">Settings</h2>
            <div className="text-[#a53f3f]">[Settings UI Placeholder]</div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard; 