import React from 'react'
import {  useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from '../features/chats/chatsSlice'
import { socket } from '../socket/socket';
import { selectedContact, setMessageReadStatus } from '../features/contacts/contactsSlice';
const Contact = (props) => {
  const dispatch = useDispatch();
  const user=useSelector((state)=> state.user.loggedInUser)
  const count = props.contact.messages.filter((message)=> (message.receiver === user._id && message.isRead===false))?.length
  function HandleClick() {
    dispatch(setCurrentChat(props.contact))
    console.log("clicked")
    socket.emit("message-read",props.contact._id, user._id)
    dispatch(selectedContact(props.contact._id))
    dispatch(setMessageReadStatus(props.contact._id))
  }
  

  console.log(props.contact.user.name)
  return (
    <div
      className={`contact flex flex-row gap-3 ${
        count>0 ? "bg-gray-200" : ""
      }`}
      onClick={HandleClick}
    >
      <img
        src={
          props.contact.image
            ? props.contact.image
            : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        }
        alt="profile"
        width={40}
        height={40}
      ></img>
      <div className="contact--info flex flex-col">
        <h2 className=" text-lg font-bold">{props.contact.user.name}</h2>
        <div className=" flex flex-row justify-between text-xs text-gray-700">
          {props.contact.messages.length > 0
            ? props.contact.messages[props.contact.messages.length - 1].message
                .length <= 20
              ? props.contact.messages[props.contact.messages.length - 1]
                  .message
              : `${props.contact.messages[
                  props.contact.messages.length - 1
                ]?.message.substring(0,15)}...`
            : ""}
          <p>
            {count > 0 && (
              <div className="flex items-center justify-center h-4 w-4 bg-red-500 text-white rounded-full">
                {count}
              </div>
            )}
          </p>
        </div>

        {/* <p className="text-xs text-gray-700">{ props.contact.messages? props.contact.messages[props.contact.messages.length-1]?.message:""}</p> */}
      </div>
    </div>
  );
}

export default Contact