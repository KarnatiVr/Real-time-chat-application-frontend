import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/login/userSlice'
import contactsReducer from '../features/contacts/contactsSlice'
import chatsReducer from '../features/chats/chatsSlice'

export const store= configureStore({
    reducer: {
        user: userReducer,
        contacts: contactsReducer,
        chats: chatsReducer
    }
})