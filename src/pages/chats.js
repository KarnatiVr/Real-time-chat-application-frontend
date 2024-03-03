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
const Chats = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let effectRef = useRef(false);
  let user = useSelector((state) => state.user.loggedInUser);

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

  //   socket.on("receive-message", (data) => {
  //     console.log(data);
  //     console.log("called");
  //     const { chat_id, sender, receiver, message, _id } = data;
  //     const msg = {
  //       _id: _id,
  //       sender: sender,
  //       receiver: receiver,
  //       message: message,
  //     };
  //     // dispatch(insertMessage({chat_id,msg}));
  //   });
  // useEffect(() => {
  //   if (!effectRef.current) {
  //     fetchUser();
  //   }
  //   return () => {
  //     effectRef.current = true;
  //   };
  // }, [user]);

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
            isRead:false
          };
          dispatch(insertMessage({chat_id,msg}));
        });
        effectRef.current = true;
      }
    };

    fetchData();

    return () => {
      // Clean up the event handler when the component unmounts
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
