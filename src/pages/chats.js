import React, { useEffect, useRef } from "react";
import ContactsCard from "../components/contactsCard";
import Chat from "../components/chat";
import { userLoggedIn } from "../features/login/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";
import { socket } from "../socket/socket";
import { insertMessage } from "../features/contacts/contactsSlice";
import { insertMessageIntoChat } from "../features/chats/chatsSlice";
import { setContacts } from "../features/contacts/contactsSlice";
const Chats = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let effectRef = useRef(false);
  let doesContactExist;
  let user = useSelector((state) => state.user.loggedInUser);
  const chat = useSelector((state) => state.chats.currentChat);
  const contacts= useSelector((state) => state.contacts.contacts)
  /* The code snippet `socket.on("connect", () => {
    socket.emit("joinRoom", user._id);
    console.log("connected and joined room");
  });` is setting up a listener for the "connect" event on the socket connection. When the socket
connection is established, it emits a "joinRoom" event with the user's ID and logs a message
"connected and joined room" to the console. This is typically used in real-time applications to
perform actions when a socket connection is established, such as joining a specific room or channel. */
  // socket.on("connect", () => {
  //   console.log("connected and joined room");
  // });

    async function fetchContacts() {
      try {
        const response = await axios.post(
          "http://localhost:4000/fetchContacts",
          {
            id: user._id,
          },
          { withCredentials: true }
        );
        const contacts = response.data;
        console.log(contacts);
        dispatch(setContacts(contacts));
      } catch (error) {
        console.log(error);
      }
      console.log(user._id);
    }

  async function fetchUser() {
    console.log("fetch User Called");
    try {
      const response = await axios.get("http://localhost:4000/getUser", {
        withCredentials: true,
      });
      console.log("response", response);
      const data = await response.data;
      if (data?._id !== null) {
        socket.emit("joinRoom", data._id);
      }
      dispatch(userLoggedIn({ ...data, loggedIn: true }));
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  }
  socket.on("receive-message", (data) => {
    const { chat_id } = data;

    console.log("this is inside chat component")
    doesContactExist = contacts.filter((contact) => contact._id === chat_id).length > 0
    console.log(doesContactExist)
    if(!doesContactExist){
      fetchContacts();
    }
    else{
    if (chat_id === chat._id) {
      // console.log("both are same")
      socket.emit("message-read", chat_id, user._id);
    }
    }

  });


  useEffect(() => {
    const fetchData = async () => {
      if (!effectRef.current) {
        await fetchUser();
        socket.on("receive-message", (data) => {
          console.log(data);
          console.log("called");
          const { chat_id, sender, receiver, message, _id } = data;
            const msg = {
              _id: _id,
              sender: sender,
              receiver: receiver,
              message: message,
            };
            dispatch(insertMessage({ chat_id, msg }));
            dispatch(insertMessageIntoChat({ chat_id, msg }));
        });
        effectRef.current = true;
      }
    };

    fetchData();

    return () => {
      // Clean up the event  when the component unmounts
      socket.off("receive-message");
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
