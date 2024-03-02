import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const marketPlaceSlice = createSlice({
    name: "marketPlace",
    initialState,
    reducers: {
        setMartetPlace: (state, action) => {
            return action.payload;
        }
    }
});

export const { setMartetPlace } = marketPlaceSlice.actions;

export default marketPlaceSlice.reducer;