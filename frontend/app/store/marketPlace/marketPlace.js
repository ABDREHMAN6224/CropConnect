import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const marketPlaceSlice = createSlice({
    name: "marketPlace",
    initialState,
    reducers: {
        setMartetPlace: (state, action) => {
            return action.payload;
            
        },
        addToMarketPlace: (state, action) => {
            state.unshift(action.payload);
        },
        
    }
});

export const { setMartetPlace,addToMarketPlace } = marketPlaceSlice.actions;

export default marketPlaceSlice.reducer;