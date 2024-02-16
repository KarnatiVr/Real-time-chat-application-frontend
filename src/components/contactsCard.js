import React from 'react'
import Contact from './Contact'
import { useSelector } from "react-redux";
const ContactsCard = () => {
  let user = useSelector((state) => state.user.loggedInUser);
  console.log(user)
    const contacts=[
        {
            name:"Venkat",
            image:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            message:"Hello Aliya"
        },
        {
            name:"Vijaya",
            image:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            message:"Whatsup!?"
        },
        {
            name:"Kiran",
            image:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            message:"Send me the pdf"
        },
        {
            name:"Pavan",
            image:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            message:"Please send me the video"
        }
    ]
  return (
    <div className="contacts--card">
      <h1 className="text-xl font-bold px-5 py-5">Messages</h1>
      <input
        type="text"
        placeholder="Search"
        className=" search--box mx-5 mb-7"
      />
      <div className="contacts flex flex-col px-5 py-2 gap-5">
        {contacts.map((contact) => (
          <Contact contact={contact} />
        ))}
      </div>
    </div>
  );
}

export default ContactsCard