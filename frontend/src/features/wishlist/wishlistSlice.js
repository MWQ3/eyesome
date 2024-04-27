import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inWishlist: [],
}

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addRemoveFromWishlist: (state, action) => {
            const product = action.payload
            const productIndex = state.inWishlist?.findIndex((item) => item?._id === product?._id)

            if(productIndex !== -1) {
                state.inWishlist.splice(productIndex, 1)
            } else {
                state.inWishlist.push(product)
            }

        },
    },
})

export const {addRemoveFromWishlist} = wishlistSlice.actions
export default wishlistSlice.reducer

