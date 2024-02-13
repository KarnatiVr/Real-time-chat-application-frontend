import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
const Test = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  console.log("component rendered");
 const socketRef = useRef(null);
  useEffect(() => {
    const socket = io("http://localhost:4000");
    socketRef.current = socket;
    socket.on("connect", () => {
      console.log(socket.id);
    });
  }, []);

  function HandleChange(event) {
    setMessage(event.target.value);
  }

  function buttonClicked() {
    socketRef.current.emit("message", message);
    socketRef.current.on("server-message", (data) => {
      setResponse(data);
    });

    // fetch("http://localhost:4000") // Replace with your server's endpoint
    //   .then((response) => response.json()).then((data) => {
    //     console.log(data);
    //   })

    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //     // Handle errors
    //   });
  }
  return (
    <div className="test">
      <h1 className="text-xl font-bold px-5 py-5">Send Message</h1>
      <input
        type="text"
        placeholder="Search"
        className=" search--box mx-5 "
        value={message}
        onChange={HandleChange}
      />
      <button
        onClick={() => buttonClicked()}
        className="px-2 py-2 bg-blue-400 text-white rounded"
      >
        Send
      </button>
      <p className="text-xl font-bold px-5 py-5">{response}</p>
    </div>
  );
};

export default Test;
