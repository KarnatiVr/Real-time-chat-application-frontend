import React from 'react'

const Contact = (props) => {
  console.log(props.contact.user.name)
  return (
    <div className="contact flex flex-row gap-3">
      <img
        src={props.contact.image?props.contact.image:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
        alt="profile"
        width={40}
        height={40}
      ></img>
      <div className="contact--info flex flex-col">
        <h2 className=" text-lg font-bold">{props.contact.user.name}</h2>
        <p className="text-xs text-gray-700">{ props.contact.messages? props.contact.messages[0]?.message:""}</p>
      </div>
    </div>
  );
}

export default Contact