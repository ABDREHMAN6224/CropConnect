import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
    name: "story",
    initialState:[],
    reducers: {
        setStories: (state, action) => {
        state = action.payload;
        },
    },
    });

const { setStories } = storySlice.actions;