import React, { useState } from "react";

const CodeforcesProfile = () => {
  const [username, setUsername] = useState("durgeshagr_22");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const fetchCodeforcesData = async () => {
    if (!username.trim()) {
      setError("Please enter a Codeforces username.");
      return;
    }

    setError("");
    setUserData(null);

    try {
      const response = await fetch(
        `https://codeforces.com/api/user.info?handles=${username}`
      );
      if (!response.ok) {
        throw new Error("User not found or API error");
      }

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError("User Not Found");
    }
  };

  const user = userData?.result?.[0];
  const lastOnline = user?.lastOnlineTimeSeconds
    ? new Date(user.lastOnlineTimeSeconds * 1000).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Search */}
      <div className="flex items-center mb-6 space-x-3">
        <input
          type="text"
          placeholder="Enter Codeforces Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchCodeforcesData}
          className="px-4 py-2 bg-blue-600  font-semibold rounded-lg hover:bg-blue-700 transition-all"
        >
          Search
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 font-medium">{error}</p>}

      {/* Profile Card */}
      {user && (
        <div className=" shadow-xl rounded-xl w-full max-w-md p-6 text-gray-800 transform transition duration-500 hover:scale-[1.02]">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={user.titlePhoto || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-blue-500 shadow-md"
            />
            <div>
              <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
              <p className="text-sm text-gray-500">@{user.handle}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p><span className="font-semibold">Current Rating:</span> {user.rating} ({user.rank})</p>
            <p><span className="font-semibold">Max Rating:</span> {user.maxRating} ({user.maxRank})</p>
            <p><span className="font-semibold">Contribution:</span> {user.contribution}</p>
            <p><span className="font-semibold">Friends:</span> {user.friendOfCount}</p>
            <p><span className="font-semibold">Organization:</span> {user.organization || "N/A"}</p>
            <p><span className="font-semibold">Last Online:</span> {lastOnline}</p>
          </div>

          <div className="mt-4 text-center">
            <a
              href={`https://codeforces.com/profile/${user.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-blue-600 hover:underline font-medium"
            >
              View Full Profile →
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeforcesProfile;
