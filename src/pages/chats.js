import React, { useEffect, useRef } from "react";
import ContactsCard from "../components/contactsCard";
import Chat from "../components/chat";
import { userLoggedIn } from "../features/login/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

import axios from "axios";
import ProfileCard from "../components/ProfileCard";

const Chats = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.loggedInUser);
  const socketRef = useRef(null);

  async function fetchUser() {
    console.log("fetch User Called");
    try {
      const response = await axios.get("http://localhost:4000/getUser", {
        withCredentials: true,
      });
      console.log("response", response);
      const data = response.data;
      dispatch(userLoggedIn({ ...data, loggedIn: true }));
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  }

  function isLogin() {
    if (user) {
      return true;
    }
  }

  useEffect(() => {
    fetchUser();
    if (isLogin()) {
      const socket = io("http://localhost:4000");
      socketRef.current = socket;
      socket.on("connect", () => {
        console.log(socket.id);
        socket.emit("online", user._id);
      });
      socket.on("server-message", (data) => {
        console.log(data);
      });
    }
  }, []);

  return (
    <div className="chats--page flex flex-row justify-center">
      <ProfileCard />
      <ContactsCard />
      <Chat />
    </div>
  );
};

export default Chats;
