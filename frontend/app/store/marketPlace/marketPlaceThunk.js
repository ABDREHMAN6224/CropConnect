import { BACKEND_URL } from '/app/utils/constants';
import { isSucessfull } from '/app/utils/general_utils';
import { createAsyncThunk } from "@reduxjs/toolkit";

import { setMartetPlace,addToMarketPlace } from "./marketPlace";

export const getMarketplaces = createAsyncThunk(
    "MargetMarketplace/getMarketplace",
    async (_, { rejectWithValue, getState, dispatch }) => {
      const response = await fetch(`${BACKEND_URL}/marketplace`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });
      const data = await response.json();
      console.log(data);
        if (response.ok) {
            dispatch(setMartetPlace(data));
            return data;
        } else {
            return rejectWithValue(data);
        }
    }
  );
  
export const createMarketplace = createAsyncThunk(
    "MargetMarketplace/createMarketplace",
    async (payload, { rejectWithValue, getState, dispatch }) => {
    const response = await fetch(`${BACKEND_URL}/marketplace/as`, {
        method: "POST",
        headers: {
        Authorization: `Bearer ${getState().auth.token}`,
        },
        body: payload,
    });
    const data = await response.json();
    if(response.ok){
        dispatch(addToMarketPlace(data));
        return data;
    }
    else{
        return rejectWithValue(data.message);
    }
})
;

export const updateMarketplace = createAsyncThunk(
    "MargetMarketplace/updateMarketplace",
    async (payload, { rejectWithValue, getState, dispactch }) => {
    const response = await fetch(`${BACKEND_URL}/marketplace/${payload.id}`, {
        method: "PUT",
        headers: {
        Authorization: `Bearer ${getState().auth.token}`,
        },
        body: payload,
    });
    const data = await response.json();
    if (isSucessfull(response.status)) {
        dispactch(getMarketplace());
        return data;
    } else {
        return rejectWithValue(data);
    }
    }
);

export const deleteMarketplace = createAsyncThunk(
    "MargetMarketplace/deleteMarketplace",
    async (payload, { rejectWithValue, getState, dispactch }) => {
    const response = await fetch(`${BACKEND_URL}/marketplace/${payload.id}`, {
        method: "DELETE",
        headers: {
        Authorization: `Bearer ${getState().auth.token}`,
        },
    });
    const data = await response.json();
    if (isSucessfull(response.status)) {
        dispactch(getMarketplace());
        return data;
    } else {
        return rejectWithValue(data);
    }
    }
);

export const buyMarketplace = createAsyncThunk(
    "MargetMarketplace/buyMarketplace",
    async (payload, { rejectWithValue, getState, dispactch }) => {
    const response = await fetch(`${BACKEND_URL}/marketplace/buy/${payload.id}`, {
        method: "PUT",
        headers: {
        Authorization: `Bearer ${getState().auth.token}`,
        },
    });
    const data = await response.json();
    if (isSucessfull(response.status)) {
        dispactch(getMarketplace());
        return data;
    } else {
        return rejectWithValue(data);
    }
    }
)


