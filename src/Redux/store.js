import { configureStore } from '@reduxjs/toolkit'
import AuthSlicesReducer from './Auth'
import { CartReducers } from './CartModle'
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