import React from "react";

const Chat = () => {
  return (
    <div className="chat--card">
      <div className="flex h-100 w-full px-5 py-3 border-b">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          width={40}
          height={40}
        ></img>
        <h2 className="text-lg font-bold ml-3 mt-1">Venkat</h2>
      </div>
      <div className=" chat--box flex flex-col w-full px-5 py-3"></div>
      <div className=" send--message--box flex flex-row w-full py-3 gap-3">
        <input type="text" className=" message--box bg-gray-30 border border-gray-300"></input>
        <button className="send--button bg-blue-500 text-white py-2 px-1 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
