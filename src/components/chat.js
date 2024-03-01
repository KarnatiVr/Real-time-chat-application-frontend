import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import {  socket } from "../socket/socket";
// import { io } from "socket.io-client";
const Chat = () => {
  const chat = useSelector((state) => state.chats.currentChat);
  const currentUser = useSelector((state) => state.user.loggedInUser);
  const [message, setMessage] = useState("");

  function HandleChange(event) {
    setMessage(event.target.value);
  }

  function buttonClicked() {
    console.log("clicked");
    socket.emit("send-message", {
      message,
      sender: currentUser._id,
      reciever: chat.user._id,
    });
    socket.on("receive-message", (data) => {
      console.log(data);
    });
  }



  // const sample = [
  //   "hello",
  //   "how are you",
  //   "i am fine",
  //   "what are you doing",
  //   "i am working",
  //   "how are you",
  //   "i am fine",
  //   "what are you doing",
  //   "i am working",
  //   "how are you",
  //   "i am fine",
  //   "what are you doing",
  //   "i am working",
  //   "how are you",
  //   "i am fine",
  //   "what are you doing",
  //   "i am working",
  //   "how are you",
  //   "how are you",
  //   "i am fine",
  //   "what are you doing",
  //   "i am working",
  //   "how are you",
  //   "i am fine",
  //   "what are you doing",
  //   "i am working",
  //   "how are you",
  // ];

  return (
    <div>
      {chat.user && (
        <div className="chat--card">
          <div className="flex h-100 w-full px-5 py-3 border-b">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              width={40}
              height={40}
              alt="profile"
            ></img>
            <h2 className="text-lg font-bold ml-3 mt-1">{chat.user.name}</h2>
          </div>
          <div className=" chat--box flex flex-col-reverse w-full px-5 ">
            {/* {sample.map((message) => (
              <div className="message--box bg-gray-30 ">{message}</div>
            ))} */}
          </div>
          <div className=" send--message--box flex flex-row w-full py-3 gap-3">
            <input
              type="text"
              value={message}
              placeholder="message"
              onChange={(e) => HandleChange(e)}
              className=" message--box bg-gray-30 border border-gray-300"
            ></input>
            <button
              className="send--button bg-blue-500 text-white py-2 px-1 rounded"
              onClick={() => buttonClicked()}
            >
              Send
            </button>
          </div>
        </div>
      )}
      {!chat.user && (
        <div className="chat--card">
          <h1 className="empty--chat text-xl font-bold px-5 py-5">
            Start a conversation
          </h1>
        </div>
      )}
    </div>
  );
};

export default Chat;
