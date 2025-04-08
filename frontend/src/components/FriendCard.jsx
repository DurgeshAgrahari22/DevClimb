import React from "react";
import { Link } from "react-router-dom";
const FriendRow = ({ connection }) => {
  const {_id,firstName, lastName, about, photoUrl } = connection;
  return (
    <div className="w-full flex items-center justify-between border-b p-4 bg-white">
      {/* Left: Profile Image & Info */}
      <div className="flex items-center space-x-4">
        <img
          className="w-20 h-20 rounded-full object-cover border border-gray-300"
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
        />
        <div>
          <h2 className="text-xl font-semibold">{firstName} {lastName}</h2>
          <p className="text-md text-gray-600">{about}</p>
        </div>
      </div>

      {/* Right: Message Button */}
      <Link to={"/chatWithFriend/"+_id}>
      <button 
      className="px-5 py-2 bg-blue-500 text-white text-md rounded-md shadow-sm transition hover:bg-blue-600"
      >
        Chat
      </button>
      </Link>
    </div>
  );
};

export default FriendRow;
