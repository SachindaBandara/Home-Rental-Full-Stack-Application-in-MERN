import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
       setLogOut: (state) => {
        state.user = null
        state.token = null
       }
    }
})

export const { setLogin, setLogOut } = userSlice.actions
export default userSlice.reducer