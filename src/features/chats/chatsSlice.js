import { createSlice } from "@reduxjs/toolkit";

// currentChat: {},
// chat-name,users, messages

const initialState = {
  currentChat: {},
  chats: [],
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setCurrentChat:  (state, action) => {
     state.currentChat = action.payload;
    },
    getChats: (state, action) => {
      state.chats = action.payload;
    },
  },
});

export const { setCurrentChat, getChats } = chatsSlice.actions;

export default chatsSlice.reducer;
