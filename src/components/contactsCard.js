import React, { useEffect } from "react";
import Contact from "./Contact";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  clearData,
  setContacts,
  setContactsMatchSearch,
} from "../features/contacts/contactsSlice";
const ContactsCard = () => {
  let user = useSelector((state) => state.user.loggedInUser);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  let userID = user._id;
  console.log(user);

  async function fetchContacts() {
    try {
      const response = await axios.post("http://localhost:4000/fetchContacts", {
        id: userID,
      });
      const contacts = response.data;
      console.log(contacts);
      dispatch(setContacts(contacts));
    } catch (error) {
      console.log(error);
    }
    console.log(userID);
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContactsMatchSearch() {
    console.log(userID);
    console.log(message);
    try {
      const response = await axios.post(
        "http://localhost:4000/fetchContactsMatchSearchParam",
        { searchParam: message }
      );
      console.log(response.data);
      const contacts = response.data;
      dispatch(setContactsMatchSearch(contacts));
    } catch (error) {
      console.log(error);
    }
  }

  async function HandleChange(event) {
    setMessage(event.target.value);
    if (event.target.value !== " ") {
      await fetchContactsMatchSearch();
      setIsOpen(true);
    } else {
      console.log("CLEARING DATA");
      dispatch(clearData());
    }
  }

  async function HandleClickContact(_id) {
    const contact = contactsMatchSearch.find((contact) => contact._id === _id);
    const chat_name = user.name + "-" + contact.name;
    const users = [user._id, contact._id];
    try {
      const response = await axios
        .post("http://localhost:4000/createChat", {
          chat_name: chat_name,
          users: users,
        })
        .then((response) => {
          setIsOpen(false);
          setMessage("");
          fetchContacts();
        });
    } catch (error) {
      console.log(error);
    }
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
          {contactsMatchSearch.map((option) => (
            <p
              className=" search--contact text-xl px-2 py-2"
              onClick={() => HandleClickContact(option._id)}
            >
              {option.name}
            </p>
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
