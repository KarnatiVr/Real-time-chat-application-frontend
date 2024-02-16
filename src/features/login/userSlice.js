import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    loggedInUser: {},
}

export const userSlice= createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            console.log(action.payload)
            state.loggedInUser = action.payload
        },
        userLoggedOut: (state, action) => {
            state.users = {}
        }
    }
})

export const { userLoggedIn, userLoggedOut } = userSlice.actions

export default userSlice.reducer