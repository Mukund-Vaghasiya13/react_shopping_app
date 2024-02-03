//Creating Slices
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Token:null,
    identity:null
}

const AuthSlices = createSlice({
    name:"Auth",
    initialState,
    reducers:{
        setToken:(state,action)=>{
            const {Token,identity} = action.payload
            state.Token = Token
            state.identity = identity
        }
    }
})

export {
    AuthSlices
}

export const {setToken} = AuthSlices.actions

export default AuthSlices.reducer