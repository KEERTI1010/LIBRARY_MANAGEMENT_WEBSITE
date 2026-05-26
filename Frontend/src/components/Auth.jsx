import { useState } from 'react';
import axios from 'axios';

function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true); // Switch between Login and Signup view
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role for signup
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isLogin ? 'login' : 'register';
    const payload = isLogin ? { email, password } : { email, password, role };

    axios.post(`http://localhost:5000/api/auth/${endpoint}`, payload)
      .then((res) => {
        if (isLogin) {
          // Save the secure token and user data to the browser storage
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          
          alert("Login Successful!");
          onLoginSuccess(res.data.user); // Tell App.jsx we are logged in!
        } else {
          alert("Registration Successful! Please Login.");
          setIsLogin(true); // Switch them automatically to the Login screen
          setPassword('');
        }
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Something went wrong!");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-2">
          Library System
        </h2>
        <p className="text-center text-gray-500 mb-6 font-medium">
          {isLogin ? "Welcome back! Please login." : "Create your library account."}
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-semibold mb-4 text-center border border-red-100">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">Email Address</label>
            <input 
              type="email" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">Password</label>
            <input 
              type="password" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>

          {/* Show the Role selector ONLY during Signup */}
          {!isLogin && (
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">Join As</label>
              <select 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-gray-700"
                value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="student">Student (View Only)</option>
                <option value="admin">Admin (Full Access)</option>
              </select>
            </div>
          )}

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-all active:scale-95 mt-2">
            {isLogin ? "Sign In" : "Register Account"}
          </button>
        </form>

        <div className="text-center mt-6 border-t pt-4">
          <button 
            type="button" onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-all">
            {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;