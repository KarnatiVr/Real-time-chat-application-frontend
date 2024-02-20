import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/login/userSlice'
import contactsReducer from '../features/contacts/contactsSlice'

export const store= configureStore({
    reducer: {
        user: userReducer,
        contacts: contactsReducer
    }
})