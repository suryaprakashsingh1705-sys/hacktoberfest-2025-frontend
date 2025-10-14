import { createSlice } from '@reduxjs/toolkit';

//initialState for wishlist
const initialState = {
  items: [],
};

//wishlist slice (stub implementation)
const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      state.items.push(action.payload);
    },
    RemoveFromWishList: (state, action) => {
      state.items = state.items.filter((item) => item.id != action.payload.id);
    },
  },
});

export const { addToWishList, RemoveFromWishList } = wishListSlice.actions;

export default wishListSlice.reducer;
