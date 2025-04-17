import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Base_Url } from '../utils/constants';
const socket = createSocketConnection();

const Chat = () => {
  const navigate = useNavigate();
  const { targetUserId } = useParams();
  const connections = useSelector((store) => store.connection?.connections || []);
  const user = useSelector(store => store.user);
  const userId = user?._id;

  const targetUser = connections.find((field) => field?._id === targetUserId);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const messagesEndRef = useRef(null);

  const sendMessageClick = () => {
    const time = new Date().toLocaleTimeString();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      text: newMessages,
      time
    });
    setMessages(prev => [...prev, {
      firstName: user?.firstName,
      lastName: user?.lastName,
      text: newMessages,
      time
    }]);
    setNewMessages('');
  };

  const allMessage = async () => {
    if (!targetUserId) return;
    const chat = await axios.get(Base_Url + "/chat/" + targetUserId, { withCredentials: true });
    const chatMessages = chat?.data?.messages.map((msg) => ({
      firstName: msg?.senderId?.firstName,
      lastName: msg?.senderId?.lastName,
      text: msg?.text,
      time: new Date(msg.createdAt).toLocaleTimeString()
    }));
    setMessages(chatMessages);
  };

  useEffect(() => {
    allMessage();
  }, [targetUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!userId || !targetUserId) return;
    socket.emit("joinChat", { userName: user?.firstName, userId, targetUserId });

    socket.on("messageReceived", ({ firstName, lastName, text, time }) => {
      setMessages(prev => [...prev, { firstName, lastName, text, time }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="flex h-screen w-full flex-col md:flex-row overflow-hidden">
      {/* Left Sidebar - Friend List */}
      <div className="w-full md:w-1/3 border-r border-gray-300 bg-white overflow-y-auto">
        <h2 className="text-xl font-semibold p-4 border-b">Friends</h2>
        {connections.map(friend => (
          <div
            key={friend._id}
            className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 ${
              friend._id === targetUserId ? 'bg-gray-200' : ''
            }`}
            onClick={() => navigate(`/chatWithFriends/${friend._id}`)}
          >
          {console.log(friend._id)}
            <img
              src={friend?.photoUrl || "https://via.placeholder.com/150"}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <div className="font-medium">{friend.firstName} {friend.lastName}</div>
              <div className="text-sm text-green-600">{online?"Online":"Offline"}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Chat Section */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b flex items-center gap-4">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={targetUser?.photoUrl || "https://via.placeholder.com/150"}
            alt="Profile"
          />
          <div>
            <div className="text-lg font-semibold">{targetUser?.firstName} {targetUser?.lastName}</div>
            <div className={`text-sm ${isOnline ? "text-green-600" : "text-red-600"}`}>
              {isOnline ? "Online" : "Offline"}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`chat ${user?.firstName === message.firstName ? "chat-end" : "chat-start"}`}>
              <div className="chat-header font-medium text-sm mb-1">
                {`${message.firstName} ${message.lastName}`}
                <time className="text-xs opacity-50 ml-2">{message.time || "now"}</time>
              </div>
              <div className="chat-bubble max-w-xs md:max-w-md">{message.text}</div>
              <div className="chat-footer opacity-50 text-xs">Seen</div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t flex items-center gap-3 bg-white">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-400 rounded-full px-4 py-2 focus:outline-none"
            value={newMessages}
            onChange={(e) => setNewMessages(e.target.value)}
          />
          <button
            onClick={sendMessageClick}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
