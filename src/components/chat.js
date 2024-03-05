import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { socket } from "../socket/socket";
import { insertMessage } from "../features/contacts/contactsSlice";
import {
  insertMessageIntoChat,
  setCurrentChat,
} from "../features/chats/chatsSlice";
// import { io } from "socket.io-client";
const Chat = () => {
  const chat = useSelector((state) => state.chats.currentChat);
  const currentUser = useSelector((state) => state.user.loggedInUser);
  const contacts = useSelector((state) => state.contacts.contacts);
  const [message, setMessage] = useState("");
  const messageRef = useRef(null);
  const dispatch = useDispatch();
  function HandleChange(event) {
    setMessage(event.target.value);
  }

  function buttonClicked() {
    console.log("clicked");
    socket.emit("send-message", {
      message: message,
      sender: currentUser._id,
      receiver: chat.user._id,
      chat_id: chat._id,
    });
    const msg = {
      sender: currentUser._id,
      receiver: chat.user._id,
      message: message,
    };
    const chat_id = chat._id;
    console.log(chat_id, msg);
    dispatch(insertMessage({ chat_id, msg }));
    dispatch(insertMessageIntoChat({ chat_id, msg }));
    // fetchCurrentChat()
    setMessage("");
  }


  useEffect(() => {
    // Scroll to the bottom of the message box
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [chat.messages]);

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
          <div
            ref={messageRef}
            className=" chat--box flex flex-col w-full px-5 "
          >
            {chat.messages.map((message) => (
              <div
                className={`${
                  currentUser._id === message.sender
                    ? "message--right"
                    : "message--left"
                }`}
              >
                <div className="single--message">{message.message}</div>
              </div>
            ))}
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
