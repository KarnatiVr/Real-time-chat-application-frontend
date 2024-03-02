import React from 'react'
import {  useDispatch } from "react-redux";
import { setCurrentChat } from '../features/chats/chatsSlice'
const Contact = (props) => {
  const dispatch = useDispatch();
  
  function HandleClick() {
    dispatch(setCurrentChat(props.contact))
    console.log("clicked")
  }


  console.log(props.contact.user.name)
  return (
    <div className="contact flex flex-row gap-3" onClick={HandleClick}>
      <img
        src={props.contact.image?props.contact.image:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
        alt="profile"
        width={40}
        height={40}
      ></img>
      <div className="contact--info flex flex-col">
        <h2 className=" text-lg font-bold">{props.contact.user.name}</h2>
        <p className="text-xs text-gray-700">{ props.contact.messages? props.contact.messages[props.contact.messages.length-1]?.message:""}</p>
      </div>
    </div>
  );
}

export default Contact