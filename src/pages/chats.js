import React, { useEffect } from "react";
import ContactsCard from "../components/contactsCard";
import Chat from "../components/chat";
import { userLoggedIn } from "../features/login/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Chats = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function fetchUser() {
    console.log("fetch User Called")
    try {
      const response = await axios.get("http://localhost:4000/getUser", {
        withCredentials: true,
      });
      console.log("response",response)
      const data = response.data;
      dispatch(userLoggedIn({ ...data, loggedIn: true }));
    } catch (err) {
      console.log(err);
      navigate("/");

    }
  }

  useEffect( () => {
     fetchUser();
  }, []);

  return (
    <div className="chats--page flex flex-row justify-center">
      <ContactsCard />
      <Chat />
    </div>
  );
};

export default Chats;
