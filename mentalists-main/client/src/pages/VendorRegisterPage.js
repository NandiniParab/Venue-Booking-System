import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const VendorRegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [business, setBusiness] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Mock register logic
    if (name && email && password && business) {
      localStorage.setItem('user', JSON.stringify({ email, name, business, role: 'vendor' }));
      navigate('/user/dashboard');
    } else {
      setError('Please fill all fields');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffe9c1]">
      <form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md" onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-6 text-[#a53f3f]">Vendor Registration</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-[#3a0303]">Name</label>
          <input type="text" className="w-full border border-[#f4ce74] rounded-lg px-3 py-2" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-[#3a0303]">Business Name</label>
          <input type="text" className="w-full border border-[#f4ce74] rounded-lg px-3 py-2" value={business} onChange={e => setBusiness(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-[#3a0303]">Email</label>
          <input type="email" className="w-full border border-[#f4ce74] rounded-lg px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium text-[#3a0303]">Password</label>
          <input type="password" className="w-full border border-[#f4ce74] rounded-lg px-3 py-2" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="w-full bg-[#a53f3f] text-white py-2 rounded-lg font-semibold hover:bg-[#3a0303]">Register</button>
        <div className="mt-4 text-center">
          <span className="text-[#3a0303]">Already have an account? </span>
          <Link to="/login" className="text-[#a53f3f] font-semibold hover:underline">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default VendorRegisterPage; 