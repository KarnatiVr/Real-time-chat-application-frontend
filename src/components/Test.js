import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
const Test = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [displayedOptions, setDisplayedOptions] = useState([]);
  const messagesEndRef = useRef(null);


  console.log("component rendered");
  const messages =[
    "Liam",
    "Emma",
    "Noah",
    "Olivia",
    "William",
    "Ava",
    "James",
    "Isabella",
    "Oliver",
    "Sophia",
    "Benjamin",
    "Harper",
  ];
const options = [
  "Option 1",
  "Option 2",
  "Option 3",
  "test 4",
  "test 5",
  "test 6",
  "test 7",
  "Option 8",
  "Option 9",
  "Option 10",
];
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Scroll to bottom on initial render and whenever messages change
    useEffect(() => {
      scrollToBottom();
    }, []);
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
    if(event.target.value!==""){
      setIsOpen(true);
      const filteredOptions = options.filter((option) =>
        option.includes(event.target.value)
      );
      setDisplayedOptions(filteredOptions);
    }
    else{
      setDisplayedOptions([]);
    }

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
      {isOpen && (
        <div className="dropdown">
          {displayedOptions.map((option) => (
            <p className="text-xl px-2 py-2">{option}</p>
          ))}
        </div>
      )}
      <p>{socketRef.current?.id}</p>
      <p className="text-xl font-bold px-5 py-5">{response}</p>
      <div className="test--card">
        {messages.map((name) => {
          return <p className="text-xl px-2 py-2">{name}</p>;
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Test;
