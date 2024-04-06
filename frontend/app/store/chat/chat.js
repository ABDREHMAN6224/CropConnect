import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const serverUrl = "http://localhost:5000";

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
      const data = await response.json();
      if(response.ok){
        return data;
      }
      else{
        return thunkAPI.rejectWithValue({ error: response.statusText });
      }
    } catch (error) {
      console.log("error",error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
  );
  
  export const GetCreateChat = createAsyncThunk(
    "chat/createChat",
  async (data, thunkAPI) => {
    try {
      const response = await fetch(`${serverUrl}/chats/create_chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
        },
        body: JSON.stringify(data),
      });
      const dat = await response.json();
      if(response.ok){
        thunkAPI.dispatch(setChatMessages(dat.messages));
        return dat;
      }
      else{
        return thunkAPI.rejectWithValue({ error: response.statusText });
      }
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

export const getCommunityChats = createAsyncThunk(
  "chat/getCommunityChats",
  async (_,thunkAPI) => {
    try {
      const response = await fetch(`${serverUrl}/chats/group_chats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
        },
      });
      const data = await response.json();
      if(response.ok){
        return data;
      }
      else{
        return thunkAPI.rejectWithValue({ error: response.statusText });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
)

export const createCommunityChat = createAsyncThunk(
  "chat/group_chats",async (data,thunkAPI) => {
    try {
      const response =await fetch(`${serverUrl}/chats/group_chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if(response.ok){
        thunkAPI.dispatch(addToCommunityChats(result));
        return result;
      }
      else{
        console.log(response.status);
        return thunkAPI.rejectWithValue({ error: response.statusText });
      }
    }
    catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
)

export const addMemberToGroupChat = createAsyncThunk(
  "chat/add",
  async (data,thunkAPI) => {
    try {
      const response = fetch(`${serverUrl}/chats/add/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    }
    catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
)

export const removeMemberFromGroupChat = createAsyncThunk(
  "chat/remove",
  async (data,thunkAPI) => {
    try {
      const response = fetch(`${serverUrl}/chats/remove/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    }
    catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
)



const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    chats: [],
    currentChat: null,
    error: null,
    loading: false,
    communityChats: [],
    messagesLoading: false,
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
    addToCommunityChats: (state, action) => {
      state.communityChats.unshift(action.payload);
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    setChatMessages: (state, action) => {
      state.messages = action.payload;
    },
    setRecentMessage: (state, action) => {
      state.chats = state.chats.map((chat) =>
        chat._id === action.payload.chatId
          ? { ...chat, recentMessage: action.payload.message }
          : chat
      );
      state.communityChats = state.communityChats.map((chat) =>
        chat._id === action.payload.chatId
          ? { ...chat, recentMessage: action.payload.message }
          : chat
      );
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllChats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllChats.fulfilled, (state, action) => {
      state.loading = false;
      state.chats = action.payload.filter((chat) => !chat.isGroup);
      state.communityChats = action.payload.filter((chat) => chat.isGroup); 
    });
    builder.addCase(getAllChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(GetCreateChat.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetCreateChat.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      if(!state.chats.find((chat) => chat._id === action.payload.chat._id)){
        state.chats.push(action.payload.chat);
      }
    });
    builder.addCase(GetCreateChat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
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
      state.error = action.payload;
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
      state.error = action.payload;
    });
    builder.addCase(getCommunityChats.fulfilled, (state, action) => {
      state.loading = false;
      state.communityChats = action.payload;
    });
    builder.addCase(getCommunityChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createCommunityChat.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      // state?.communityChats.push(action.payload);
    });
    builder.addCase(createCommunityChat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    
  },
});

export default chatSlice.reducer;
export const {
  addMessage,
  updateCurrentChat,
  updateCurrentMessages,
  addToCommunityChats,
  setCurrentChat,
  setChatMessages,
  setRecentMessage,
} = chatSlice.actions;
