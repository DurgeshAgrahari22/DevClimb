import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { Base_Url } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${Base_Url}/login`, {
        emailId,
        password,
      }, { withCredentials: true });

      dispatch(addUser(res.data));
      navigate('/');
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(`${Base_Url}/signup`, {
        firstName,
        lastName,
        emailId,
        password,
      }, { withCredentials: true });

      dispatch(addUser(res.data.data));
      navigate('/profile');
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/70 backdrop-blur-sm border border-gray-300">
        <h2 className="text-3xl font-bold text-center  mb-6">
          {isLoggedIn ? "Welcome Back" : "Create Account"}
        </h2>

        <form className="space-y-4">
          {!isLoggedIn && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-1">First Name</label>
                <input
                  placeholder='Duggu'
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                <input
                  placeholder='Agr'
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email ID</label>
            <input
              placeholder='Duggu1234@gmail.ac.in'
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              placeholder='Password@987'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}

          <button
            type="button"
            onClick={isLoggedIn ? handleLogin : handleSignup}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            {isLoggedIn ? "Login" : "Sign Up"}
          </button>

          <p
            onClick={() => setIsLoggedIn((prev) => !prev)}
            className="text-center text-indigo-600 hover:underline mt-4 cursor-pointer text-sm"
          >
            {isLoggedIn
              ? "Don't have an account? Sign up here"
              : "Already have an account? Login here"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
