import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import {useSelector} from 'react-redux'
import axios from 'axios';
import { Base_Url } from '../utils/constants';
const socket = createSocketConnection();
const Chat = () => {
  const {targetUserId} = useParams();
  const connections = useSelector((store) => store.connection?.connections || []);
  const targetUser = connections.find((field) => field?._id === targetUserId);
  // console.log("Target User are here!!",targetUser)
  const user = useSelector(store=>store.user);
  const userId= user?._id;
  const [messages,setMessages] = useState([{firstName:"firstName",lastName:"lastName",text:"Hello World"}])
  const [newMessages,setNewMessages] = useState("")
  const messagesEndRef = useRef(null);
    const allMessage = async()=>{
      // console.log(Base_Url+"/chat/"+targetUserId);
      const chat = await axios.get(Base_Url+"/chat/"+targetUserId,{withCredentials:true});
      console.log(chat?.data?.messages);
      const chatMessages = chat?.data?.messages.map((msg)=>{
        return{
          firstName:msg?.senderId?.firstName,
          lastName:msg?.senderId?.lastName,
          text:msg?.text
        }
      })
      setMessages(chatMessages);
    }
    useEffect(()=>{
      allMessage();
    },[])
    
    useEffect(() => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(()=>{
      if(!userId)return ;
      // As soon as page is loaded socket connection is made and joinChat event is emmited 
      
      socket.on("connect", () => {
    // Emit joinChat after socket is ready
        socket.emit("joinChat", {
          userName: user.firstName,
          userId,
          targetUserId,
        });
        console.log("✅ Socket connected and joinChat emitted");
      });
      socket.on("messageReceived", ({ firstName, lastName, text }) => {
        setMessages((prev) => [...prev, { firstName, lastName, text }]);
      });
      console.log("Message received",messages);
      // socket will disconnect when components get unmounts
      return () => {
        socket.off("connect"); // remove listener
        socket.off("messageReceived");
        socket.disconnect(); // disconnect when component unmounts
      };
    },[userId,targetUserId])

    const sendMessageClick = () => {
      if (!newMessages.trim()) return; // ignore empty messages
      console.log(newMessages);

      socket.emit("sendMessage", {
        firstName: user.firstName,
        lastName: user.lastName,
        userId,
        targetUserId,
        text: newMessages,
      });
      setMessages((prev) => [...prev, { firstName:user.firstName, lastName:user.lastName, text:newMessages }]);
      setNewMessages("");
    };


    return (
    <div className="w-2/5 mx-auto border border-gray-600 my-5 h-[70vh] flex flex-col">
      <div className="p-5 border border-gray-600 rounded flex gap-x-20">
        <img 
        className="border h-15 w-15 rounded-full"
        src={targetUser && targetUser.photoUrl ? targetUser.photoUrl:"https://media1.thrillophilia.com/filestore/uwpz857lua13qmvub6um2v93dlrm_IMG%20Worlds%20%20of%20Adventure.jpg"}
        ></img>
        <div>Chat</div>
      </div>
      <div className="flex-1 overflow-scroll p-5 bg-black/10">
      {messages && messages.map((message,index)=>{
      return <div key={index}>
      <div className={`chat ${user?.firstName===message?.firstName ?"chat-end":"chat-start"}`}>
      <div className="chat-header">
      {`${message?.firstName} ${message?.lastName}`}
        <time className="text-xs opacity-50">2 hours ago</time>
      </div>
      <div className="chat-bubble">{message.text}</div>
      <div className="chat-footer opacity-50">Seen</div>
    </div>
      </div>
      })}
      <div ref={messagesEndRef}></div>
      </div>
      <div className="p-5 border-t border-gray-600 items-center flex gap-2 ">
        <input className="flex-1 border border-gray-500  rounded-2xl p-2"
        value={newMessages}
        onChange={(e)=>setNewMessages(e.target.value)}
        />
        <button onClick={sendMessageClick} className="btn btn-primary">Send</button>
      </div>
    </div>
  )
}

export default Chat