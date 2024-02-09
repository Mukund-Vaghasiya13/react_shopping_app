import { configureStore } from '@reduxjs/toolkit'
import AuthSlicesReducer from './Auth'
import { CartReducers } from './Cart'
const store = configureStore(
   {
    reducer:{
        Auth:AuthSlicesReducer,
        Cart:CartReducers
    }
   }
)

export {
    store
}