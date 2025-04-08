import React, { useState } from 'react';

const CodechefProfile = () => {
  const [username, setUsername] = useState('durgeshagr_22');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const fetchCodechefData = async () => {
    if (!username.trim()) {
      setError("Please enter a CodeChef username.");
      return;
    }

    setError('');
    setUserData(null);

    try {
      const response = await fetch(`https://codechef-api.vercel.app/handle/${username}`);
      if (!response.ok) throw new Error('User not found');
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError("User Not Found");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4">
      {/* Search */}
      <div className="mb-6 flex gap-3 items-center">
        <input
          type="text"
          placeholder="Enter CodeChef Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 w-64 md:w-80 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={fetchCodechefData}
          className=" px-5 py-2 bg-blue-600 text-white font-semibold rounded-xl transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-600 mb-4 font-medium">{error}</p>}

      {/* Profile Card */}
      {userData && (
        <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden p-6 space-y-4 border border-gray-200">
          <div className="flex flex-col items-center">
            <img
              src={userData.profile}
              alt="User"
              className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
            />
            <h2 className="text-xl font-bold mt-3">{userData.name}</h2>
          </div>

          <div className="flex items-center justify-center gap-2">
            <img src={userData.countryFlag} alt="Flag" className="w-6 h-4 rounded-sm shadow-sm" />
            <span className="text-sm text-gray-700 font-medium">{userData.countryName}</span>
          </div>

          <div className="text-center text-gray-700 space-y-1">
            <p className="font-semibold text-lg">⭐ {userData.stars}</p>
            <p>Rating: <span className="font-semibold">{userData.currentRating}</span></p>
            <p>Highest Rating: <span className="font-semibold">{userData.highestRating}</span></p>
            <p>Global Rank: <span className="font-semibold">{userData.globalRank}</span></p>
            <p>Country Rank: <span className="font-semibold">{userData.countryRank}</span></p>
          </div>

          <div className="text-center mt-4">
            <a
              href={`https://www.codechef.com/users/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold hover:underline"
            >
              View Full Profile →
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodechefProfile;
