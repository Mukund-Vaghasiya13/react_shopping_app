//Creating Slices

import { createSlice } from '@reduxjs/toolkit'
import { ApiService } from '../ApiHelper/ApiService.js'

const initialState = {
    Token:null,
    identity:null
}

const AuthSlices = createSlice({
    name:"Auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            const {username,password} = action.payload
            const response = ApiService.PostData("/api/v1/Shopping/login",{
               "username":username,
                "password":password
            }).then((response)=>{
                console.log(response)
            })
        },
        sinup:(state,action)=>{

        },
        setToken:(state,action)=>{
            const {Token,identity} = action.paylod
            state.Token = Token
            state.identity = identity
        }
    }
})

export {
    AuthSlices
}

export const {login,sinup,setToken} = AuthSlices.actions

export default AuthSlices.reducer