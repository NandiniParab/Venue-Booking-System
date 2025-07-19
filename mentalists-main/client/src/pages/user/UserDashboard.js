import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Star, Clock, CreditCard, Heart, Bell, User, Settings, LogOut, BarChart2, Home, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/card';
import { Button } from '../../components/button';
import { Badge } from '../../components/badge';

const sidebarLinks = [
  { icon: Home, label: 'Dashboard', to: '/user/dashboard' },
  { icon: Calendar, label: 'Bookings', to: '/user/dashboard/bookings' },
  { icon: Heart, label: 'Favorites', to: '/user/dashboard/favorites' },
  { icon: BarChart2, label: 'Analytics', to: '/user/dashboard/analytics' },
  { icon: Settings, label: 'Settings', to: '/user/dashboard/settings' },
  { icon: LogOut, label: 'Logout', to: '/logout' },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const upcomingBookings = [
    {
      id: 1,
      venueName: "Grand Ballroom Elite",
      date: "2024-02-15",
      time: "6:00 PM - 11:00 PM",
      location: "Downtown Plaza, New York",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=300",
      status: "confirmed",
      amount: "₹45,000",
      guests: 200
    },
    {
      id: 2,
      venueName: "Garden Party Venue",
      date: "2024-03-20",
      time: "4:00 PM - 9:00 PM",
      location: "Suburban Area, Los Angeles",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300",
      status: "pending",
      amount: "₹28,000",
      guests: 150
    }
  ];

  const favoriteVenues = [
    {
      id: 1,
      name: "Royal Wedding Hall",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=300",
      rating: 4.9,
      location: "Mumbai, Maharashtra",
      price: "₹50,000"
    },
    {
      id: 2,
      name: "Modern Conference Center",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=300",
      rating: 4.8,
      location: "Delhi, NCR",
      price: "₹35,000"
    },
    {
      id: 3,
      name: "Beachside Resort",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300",
      rating: 4.7,
      location: "Goa",
      price: "₹40,000"
    }
  ];

  const recentActivity = [
    { action: "Booked", venue: "Grand Ballroom Elite", date: "2 days ago", type: "booking" },
    { action: "Added to favorites", venue: "Royal Wedding Hall", date: "1 week ago", type: "favorite" },
    { action: "Reviewed", venue: "Garden Party Venue", date: "2 weeks ago", type: "review" },
    { action: "Inquiry sent", venue: "Modern Conference Center", date: "3 weeks ago", type: "inquiry" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Support Chat State
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: 'support', text: 'Hello! How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);
  const sendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((msgs) => [...msgs, { from: 'user', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages((msgs) => [...msgs, { from: 'support', text: 'We have received your query. Our team will get back to you soon!' }]);
    }, 1000);
  };
  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, showChat]);

  // Role check: only allow user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || user.role !== 'user') {
      navigate('/login');
    }
  }, [navigate]);

  // Sidebar navigation state
  const [active, setActive] = useState('Dashboard');

  // Profile settings state
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [profile, setProfile] = useState({
    name: storedUser.name || 'John Doe',
    email: storedUser.email || '',
    password: '',
    avatar: storedUser.avatar || null,
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    setProfile((prev) => ({ ...prev, avatar: file ? URL.createObjectURL(file) : null }));
  };
  const handleProfileSave = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ ...storedUser, ...profile, avatar: profile.avatar }));
    window.dispatchEvent(new Event('userChanged'));
    alert('Profile updated!');
  };

  return (
    <div className="min-h-screen flex bg-[#ffe9c1]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#3a0303] text-[#ffe9c1] py-8 px-4 sticky top-0 h-screen shadow-lg">
        <div className="mb-10 flex items-center gap-3">
          <div className="bg-white rounded-full p-2"><User className="h-8 w-8 text-[#a53f3f]" /></div>
          <div>
            <div className="font-bold text-lg">John Doe</div>
            <div className="text-xs text-[#f4ce74]">User</div>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          {sidebarLinks.map(link => (
            <button
              key={link.label}
              onClick={() => {
                if (link.label === 'Logout') {
                  localStorage.removeItem('user');
                  navigate('/login');
                } else {
                  setActive(link.label);
                }
              }}
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
        {/* Main Content Sections */}
        {active === 'Dashboard' && (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
              <p className="text-[#a53f3f]">Manage your bookings and discover new venues</p>
            </div>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="glass"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">Total Bookings</p><p className="text-2xl font-bold">12</p></div><Calendar className="h-8 w-8 text-primary" /></div></CardContent></Card>
              <Card className="glass"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">Favorite Venues</p><p className="text-2xl font-bold">8</p></div><Heart className="h-8 w-8 text-destructive" /></div></CardContent></Card>
              <Card className="glass"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">Total Spent</p><p className="text-2xl font-bold">₹2.4L</p></div><CreditCard className="h-8 w-8 text-primary" /></div></CardContent></Card>
              <Card className="glass"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">Reviews Given</p><p className="text-2xl font-bold">5</p></div><Star className="h-8 w-8 text-yellow-500" /></div></CardContent></Card>
            </div>
            {/* Upcoming Bookings */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="glass"><CardHeader><CardTitle className="flex items-center space-x-2"><Calendar className="h-5 w-5" /><span>Upcoming Bookings</span></CardTitle></CardHeader><CardContent className="space-y-4">{upcomingBookings.map((booking) => (<div key={booking.id} className="border rounded-lg p-4" style={{background:'#f4ce74'}}><div className="flex items-start space-x-4"><img src={booking.image} alt={booking.venueName} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" /><div className="flex-1 space-y-2"><div className="flex items-start justify-between"><div><h3 className="font-semibold">{booking.venueName}</h3><div className="flex items-center space-x-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /><span>{booking.location}</span></div></div><Badge className={getStatusColor(booking.status)}>{booking.status}</Badge></div><div className="flex items-center space-x-4 text-sm"><div className="flex items-center space-x-1"><Calendar className="h-4 w-4" /><span>{booking.date}</span></div><div className="flex items-center space-x-1"><Clock className="h-4 w-4" /><span>{booking.time}</span></div></div><div className="flex items-center justify-between"><span className="font-medium text-primary">{booking.amount}</span><div className="flex space-x-2"><Button variant="outline" size="sm">View Details</Button><Button size="sm" className="bg-primary">Manage</Button></div></div></div></div></div>))}</CardContent></Card>
              </div>
              {/* Quick Actions & Recent Activity */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="glass"><CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader><CardContent className="space-y-3"><Button className="w-full justify-start bg-primary hover:bg-primary/90"><Calendar className="h-4 w-4 mr-2" />Book New Venue</Button><Button variant="outline" className="w-full justify-start"><Heart className="h-4 w-4 mr-2" />View Favorites</Button><Button variant="outline" className="w-full justify-start"><Star className="h-4 w-4 mr-2" />Write Review</Button><Button variant="outline" className="w-full justify-start"><Settings className="h-4 w-4 mr-2" />Account Settings</Button></CardContent></Card>
                {/* Recent Activity */}
                <Card className="glass"><CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader><CardContent className="space-y-3">{recentActivity.map((activity, index) => (<div key={index} className="flex items-center space-x-3 text-sm"><div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" /><div className="flex-1"><span className="font-medium">{activity.action}</span><span className="text-muted-foreground"> {activity.venue}</span><div className="text-xs text-muted-foreground">{activity.date}</div></div></div>))}</CardContent></Card>
              </div>
            </div>
            {/* Favorite Venues */}
            <div className="mt-8"><Card className="glass"><CardHeader><CardTitle className="flex items-center space-x-2"><Heart className="h-5 w-5" /><span>Your Favorite Venues</span></CardTitle></CardHeader><CardContent><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{favoriteVenues.map((venue) => (<div key={venue.id} className="border rounded-lg p-4 bg-background/50"><img src={venue.image} alt={venue.name} className="w-full h-32 rounded-lg object-cover mb-3" /><h3 className="font-semibold mb-1">{venue.name}</h3><div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2"><MapPin className="h-4 w-4" /><span>{venue.location}</span></div><div className="flex items-center justify-between"><div className="flex items-center space-x-1"><Star className="h-4 w-4 text-yellow-400 fill-current" /><span className="text-sm">{venue.rating}</span></div><span className="font-medium text-primary">{venue.price}</span></div></div>))}</div></CardContent></Card></div>
          </>
        )}
        {active === 'Bookings' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-bold text-lg text-[#a53f3f] mb-4">Your Bookings</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#a53f3f]">
                  <th className="py-2">Venue</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {upcomingBookings.map(b => (
                  <tr key={b.id} className="border-b">
                    <td className="py-2 font-medium flex items-center gap-2">
                      <img src={b.image} alt="venue" className="h-8 w-8 rounded object-cover" />
                      {b.venueName}
                    </td>
                    <td>{b.date}</td>
                    <td>{b.time}</td>
                    <td><Badge className={getStatusColor(b.status)}>{b.status}</Badge></td>
                    <td>{b.amount}</td>
                    <td>
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm" className="ml-2 text-red-600 border-red-400">Cancel</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {active === 'Favorites' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-bold text-lg text-[#a53f3f] mb-4">Your Favorites</h2>
            <div className="text-[#a53f3f]">[Favorites Management Placeholder]</div>
          </div>
        )}
        {active === 'Analytics' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-bold text-lg text-[#a53f3f] mb-4">Your Analytics</h2>
            <div className="text-[#a53f3f]">[User Analytics Charts Placeholder]</div>
          </div>
        )}
        {active === 'Settings' && (
          <div className="bg-white rounded-xl p-6 shadow max-w-lg">
            <h2 className="font-bold text-lg text-[#a53f3f] mb-4">Profile Settings</h2>
            <form className="space-y-6" onSubmit={handleProfileSave}>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-[#f4ce74] flex items-center justify-center overflow-hidden">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-10 w-10 text-[#a53f3f]" />
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-medium text-[#3a0303]">Upload Avatar</label>
                  <input type="file" accept="image/*" onChange={handleAvatarChange} />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium text-[#3a0303]">Name</label>
                <input name="name" className="w-full border border-[#f4ce74] rounded-lg px-3 py-2" value={profile.name} onChange={handleProfileChange} />
              </div>
              <div>
                <label className="block mb-1 font-medium text-[#3a0303]">Email</label>
                <input name="email" type="email" className="w-full border border-[#f4ce74] rounded-lg px-3 py-2" value={profile.email} onChange={handleProfileChange} />
              </div>
              <div>
                <label className="block mb-1 font-medium text-[#3a0303]">Password</label>
                <input name="password" type="password" className="w-full border border-[#f4ce74] rounded-lg px-3 py-2" value={profile.password} onChange={handleProfileChange} placeholder="Change password" />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-[#a53f3f] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#3a0303]">Save Changes</button>
              </div>
            </form>
          </div>
        )}
      </main>
      {/* Floating Support Chat Button */}
      <button onClick={() => setShowChat(true)} className="fixed bottom-8 right-8 z-50 bg-[#a53f3f] text-white rounded-full shadow-lg p-4 hover:bg-[#3a0303] flex items-center gap-2">
        <MessageCircle className="h-6 w-6" /> Chat with us
      </button>
      {/* Support Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-end md:justify-end bg-black/30">
          <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-lg w-full max-w-md mx-auto mb-0 md:mb-8 md:mr-8 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[#a53f3f] text-white">
              <span className="font-bold">Support Chat</span>
              <button onClick={() => setShowChat(false)} className="text-white text-xl">×</button>
            </div>
            <div className="flex-1 p-4 bg-[#f4ce74] overflow-y-auto" style={{ minHeight: 300, maxHeight: 400 }}>
              {chatMessages.map((msg, i) => (
                <div key={i} className={`mb-2 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-4 py-2 rounded-lg shadow ${msg.from === 'user' ? 'bg-[#a53f3f] text-white' : 'bg-white text-[#a53f3f]'}`}>{msg.text}</div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={sendChat} className="flex gap-2 p-4 bg-white border-t border-[#f4ce74]">
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-[#f4ce74]" placeholder="Type a message..." />
              <button type="submit" className="bg-[#a53f3f] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#3a0303]">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;