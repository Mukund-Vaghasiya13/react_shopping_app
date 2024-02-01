import { configureStore } from '@reduxjs/toolkit'
import AuthSlicesReducer from './Auth'
const store = configureStore(
   {
    reducer:{
        Auth:AuthSlicesReducer
    }
   }
)

export {
    store
}