import React from 'react'

const Contact = (props) => {
  console.log(props.contact.name)
  return (
    <div className="contact flex flex-row gap-3">
      <img
        src={props.contact.image}
        alt="profile"
        width={40}
        height={40}
      ></img>
      <div className="contact--info flex flex-col">
        <h2 className=" text-lg font-bold">{props.contact.name}</h2>
        <p className="text-xs text-gray-700">{props.contact.message}</p>
      </div>
    </div>
  );
}

export default Contact