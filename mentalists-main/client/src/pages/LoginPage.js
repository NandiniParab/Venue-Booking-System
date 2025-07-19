import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginType, setLoginType] = useState('user');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      if (loginType === 'admin') {
        localStorage.setItem('user', JSON.stringify({ email, role: 'admin' }));
        window.dispatchEvent(new Event('userChanged'));
        navigate('/admin');
      } else {
        localStorage.setItem('user', JSON.stringify({ email, role: 'user' }));
        window.dispatchEvent(new Event('userChanged'));
        navigate('/user/dashboard');
      }
    } else {
      setError('Please enter email and password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffe9c1]">
      <form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6 text-[#a53f3f]">Login to Eazy Venue</h2>
        <div className="flex justify-center gap-4 mb-6">
          <button type="button" onClick={() => setLoginType('user')} className={`px-4 py-2 rounded-lg font-semibold border ${loginType==='user' ? 'bg-[#a53f3f] text-white border-[#a53f3f]' : 'bg-white text-[#a53f3f] border-[#a53f3f]'}`}>Login as User</button>
          <button type="button" onClick={() => setLoginType('admin')} className={`px-4 py-2 rounded-lg font-semibold border ${loginType==='admin' ? 'bg-[#a53f3f] text-white border-[#a53f3f]' : 'bg-white text-[#a53f3f] border-[#a53f3f]'}`}>Login as Admin</button>
        </div>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-[#3a0303]">Email</label>
          <input type="email" className="w-full border border-[#f4ce74] rounded-lg px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium text-[#3a0303]">Password</label>
          <input type="password" className="w-full border border-[#f4ce74] rounded-lg px-3 py-2" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="w-full bg-[#a53f3f] text-white py-2 rounded-lg font-semibold hover:bg-[#3a0303]">Login</button>
      </form>
    </div>
  );
};

export default LoginPage; 