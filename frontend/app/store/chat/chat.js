import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const serverUrl = "http://localhost:3000";

export const getAllChats = createAsyncThunk(
  "chat/getChat",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${serverUrl}/chats/chats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
        },
      });
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const GetCreateChat = createAsyncThunk(
  "chat/createChat",
  async (data, thunkAPI) => {
    try {
      const response = await fetch(`${serverUrl}/chats/create-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getUserChats = createAsyncThunk(
  "chat/getUserChats",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${serverUrl}/chats/chats/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
        },
      });
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteChat = createAsyncThunk(
  "chat/deleteChat",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${serverUrl}/chats/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
        },
      });
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const leaveChat = createAsyncThunk(
  "chat/leaveChat",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${serverUrl}/chats/leave/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
        },
      });
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    chats: [],
    currentChat: null,
    error: null,
    loading: false,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    updateCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    updateCurrentMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllChats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllChats.fulfilled, (state, action) => {
      state.loading = false;
      state.chats = action.payload;
    });
    builder.addCase(getAllChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(GetCreateChat.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetCreateChat.fulfilled, (state, action) => {
      state.loading = false;
      state.currentChat = action.payload.chat;
      state.messages = action.payload.messages;
    });
    builder.addCase(GetCreateChat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(getUserChats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserChats.fulfilled, (state, action) => {
      state.loading = false;
      state.chats = action.payload;
    });
    builder.addCase(getUserChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(deleteChat.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteChat.fulfilled, (state, action) => {
      state.loading = false;
      state.chats = state.chats.filter(
        (chat) => chat._id !== action.payload._id
      );
    });
    builder.addCase(deleteChat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(leaveChat.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(leaveChat.fulfilled, (state, action) => {
      state.loading = false;
      state.chats = state.chats.filter(
        (chat) => chat._id !== action.payload._id
      );
    });
    builder.addCase(leaveChat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
  },
});

export default chatSlice.reducer;
