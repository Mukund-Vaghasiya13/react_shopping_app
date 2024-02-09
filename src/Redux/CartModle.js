import { createSlice } from "@reduxjs/toolkit";


const Cart = createSlice({
    name:"Cart",
    initialState:{
        product:[]
    },
    reducers:{      
        addProduct:(state,action)=>{
            const {name,price} = action.payload
            state.product.push({name:name,price:price})
        },
        deleteProduct: (state, action) => {
            const index = action.payload;
            state.product = state.product.filter((item, idx) => idx !== index);
        }
        
    }
})

export const {addProduct,deleteProduct} = Cart.actions
export {
    Cart
}

export const CartReducers = Cart.reducer