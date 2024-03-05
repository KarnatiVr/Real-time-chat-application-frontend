import { createSlice } from "@reduxjs/toolkit";
// import { useStore } from "react-redux";
// import { initialState } from "../chats/chatsSlice";
const initialState = {
  contacts: [],
  contactsMatchSearch: [],
};
export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setContactsMatchSearch: (state, action) => {
      state.contactsMatchSearch = action.payload;
    },
    clearData: (state) => {
      state.contactsMatchSearch = initialState.contactsMatchSearch;
    },
    insertMessage: (state, action) => {
      const contact = state.contacts.find(
        (contact) => contact._id === action.payload.chat_id
      );
      console.log("insert Message => " ,contact)
      if (contact !== undefined) {
        if (contact.isSelected === true) {
          contact.messages.push({ ...action.payload.msg, isRead: true });
        } else {
          contact.messages.push({ ...action.payload.msg, isRead: false });
        }
      }
    },
    selectedContact: (state, action) => {
      const currentContact = state.contacts.find(
        (contact) => contact.isSelected === true
      );
      if (currentContact) {
        currentContact.isSelected = false;
      }
      const contact = state.contacts.find(
        (contact) => contact._id === action.payload
      );
      contact.isSelected = true;
    },
    setMessageReadStatus: (state, action) => {
      const contact = state.contacts.find(
        (contact) => contact._id === action.payload
      );
      contact.messages.forEach((message) => {
        message.isRead = true;
      });
    },
  },
});

export const {
  setContacts,
  setContactsMatchSearch,
  clearData,
  insertMessage,
  selectedContact,
  setMessageReadStatus,
} = contactsSlice.actions;

export default contactsSlice.reducer;
