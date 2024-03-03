import { createSlice } from "@reduxjs/toolkit";
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
      contact.messages.push(action.payload.msg);
    },
    selectedContact: (state, action) => {
      const contact = state.contacts.find(
        (contact) => contact._id === action.payload._id
      );
      contact.isSelected = true;
    },
    setMessageReadStatus: (state, action) => {
      const contact = state.contacts.find(
        (contact) => contact._id === action.payload
      );
      contact.messages.map((message)=>{
        message.isRead= true
      })
    },
  },
});

export const {
  setContacts,
  setContactsMatchSearch,
  clearData,
  insertMessage,
  selectedContact,
  setMessageReadStatus
} = contactsSlice.actions;

export default contactsSlice.reducer;
