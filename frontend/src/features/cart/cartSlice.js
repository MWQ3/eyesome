import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inCart: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addRemoveFromCart: (state, action) => {
            const product = action.payload
            const productIndex = state.inCart?.findIndex((item) => item?._id === product?._id)

            if(productIndex !== -1) {
                state.inCart.splice(productIndex, 1)
            } else {
                state.inCart.push(product)
            }
        }  
    }
})

export const {addRemoveFromCart} = cartSlice.actions
export default cartSlice.reducer