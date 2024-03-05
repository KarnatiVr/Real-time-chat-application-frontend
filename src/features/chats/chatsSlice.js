import { createSlice } from "@reduxjs/toolkit";

// currentChat: {},
// chat-name,users, messages

export const initialState = {
  currentChat: {},
  chats: [],
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    getChats: (state, action) => {
      state.chats = action.payload;
    },
    insertMessageIntoChat: (state, action) => {
      if (action.payload.chat_id === state.currentChat._id) {
        state.currentChat.messages.push({...action.payload.msg, isRead:true});
      }
    },
  },
});

export const { setCurrentChat, getChats, insertMessageIntoChat } =
  chatsSlice.actions;

export default chatsSlice.reducer;
