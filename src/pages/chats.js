import React, { useEffect, useRef } from "react";
import ContactsCard from "../components/contactsCard";
import Chat from "../components/chat";
import { userLoggedIn } from "../features/login/userSlice";
import {  useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";
import { connect, setUserId, socket } from "../socket/socket";
const Chats = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let effectRef = useRef(false);
  let user= useSelector((state) => state.user.loggedInUser);
  async function fetchUser() {
    console.log("fetch User Called");
    try {
      const response = await axios.get("http://localhost:4000/getUser", {
        withCredentials: true,
      });
      console.log("response", response);
      const data =await response.data;
      socket.emit("joinRoom", data._id);
      dispatch(userLoggedIn({ ...data, loggedIn: true }));
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  }



  useEffect(() => {
    if (!effectRef.current) {
      fetchUser();
      socket.emit('message',"hello")
    }
    return () => {
      effectRef.current = true;
    };
  }, [user]);


  return (
    <div className="chats--page flex flex-row justify-center">
      <ProfileCard />
      <ContactsCard />
      <Chat />
    </div>
  );
};

export default Chats;
