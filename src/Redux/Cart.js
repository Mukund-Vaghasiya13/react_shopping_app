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
        deleteProduct:(state,action)=>{
            // myArray.splice(1, 1);
            const index = action.payload
            state.product.slice(index,1)
        }
    }
})

export const {addProduct,deleteProduct} = Cart.actions
export {
    Cart
}

export const CartReducers = Cart.reducer