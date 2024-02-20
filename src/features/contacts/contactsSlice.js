import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    contacts: [],
    contactsMatchSearch: []
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts: (state, action) => {
            state.contacts = action.payload
        },
        setContactsMatchSearch: (state, action) => {
            state.contactsMatchSearch = action.payload
        }
    }
})

export const { setContacts, setContactsMatchSearch } = contactsSlice.actions;

export default contactsSlice.reducer;