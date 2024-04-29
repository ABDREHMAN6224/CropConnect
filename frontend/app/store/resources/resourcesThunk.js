import { BACKEND_URL } from "/app/utils/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isSucessfull } from "/app/utils/general_utils";

export const createResource = createAsyncThunk(
  "resources/create",
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await fetch(`${BACKEND_URL}/resources/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (isSucessfull(response.status)) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
