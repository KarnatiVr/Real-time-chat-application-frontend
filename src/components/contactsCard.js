import React, { useEffect } from "react";
import Contact from "./Contact";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setContacts, setContactsMatchSearch } from "../features/contacts/contactsSlice";
import axios from "axios";
const ContactsCard = () => {
  let user = useSelector((state) => state.user.loggedInUser);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  let userID = user._id;
  console.log(user);
  async function fetchContacts() {
    try {
      console.log(userID);
      const response = await axios.post("http://localhost:4000/fetchContacts", {
        id: userID,
      });
      console.log("fetching Chats", response.data);
      dispatch(setContacts(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []); // Empty dependency array to run only once when the component mounts

  async function fetchContactsMatchSearch() {
    try {
      console.log(userID);
      console.log(message);
      const response = await axios.post(
        "http://localhost:4000/fetchContactsMatchSearchParam",
        {searchParam:message}
      );
      console.log("fetching Chats", response.data);
      dispatch(setContactsMatchSearch(response.data));
    } catch (error) {
      console.log(error);
    }
  }
  console.log(message);
  async function HandleChange(event) {
    setMessage(event.target.value);
    if (event.target.value !== " ") {
      await fetchContactsMatchSearch();
      setIsOpen(true);
    } else {
      dispatch(setContactsMatchSearch([]));
    }
  }
  function HandleClickContact(_id){
    const contact=contactsMatchSearch.find((contact) => contact._id === _id);
    
  }

  const contacts = useSelector((state) => state.contacts.contacts);
  const contactsMatchSearch = useSelector(
    (state) => state.contacts.contactsMatchSearch
  );
  return (
    <div className="contacts--card">
      <h1 className="text-xl font-bold px-5 py-5">Messages</h1>
      <input
        type="text"
        placeholder="Search"
        className=" search--box mx-5 mb-7"
        value={message}
        onChange={HandleChange}
      />
      {isOpen && (
        <div className="dropdown">
          {contactsMatchSearch.map((_id,option) => (
            <p className=" search--contact text-xl px-2 py-2" onClick={HandleClickContact(_id)}>{option.name}</p>
          ))}
        </div>
      )}
      <div className="contacts flex flex-col px-5 py-2 gap-5">
        {contacts.map((contact) => (
          <Contact contact={contact} />
        ))}
      </div>
    </div>
  );
};

export default ContactsCard;
