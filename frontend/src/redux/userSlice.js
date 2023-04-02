import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    regStart: (state) => {
      state.isFetching = true;
    },
    regSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
    },
    regFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    signOut: (state) => {
      state.user = null;
    },
    profUpdateStart: (state) => {
      state.isFetching = true;
    },
    profUpdateSuccess: (state, action) => {
      state.isFetching = false;
      state.user = {
        ...state.user,
        ...action.payload
      }
    },
    profUpdateFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getUserStart: (state) => {
      state.isFetching = true;
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
    },
    getUserFailure: (state) =>{
      state.isFetching = false;
      state.error = true;
    },
    postUpdateStart: (state) => {
      state.isFetching = true;
    },
    postUpdateSuccess: (state, action) => {
      state.isFetching = false;
      state.user = {
        ...state.user,
        ...action.payload
      }
    },
    postUpdateFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    }
  },
});


export const {
  regStart,
  regSuccess,
  regFailure,
  signOut,
  profUpdateStart,
  profUpdateSuccess,
  profUpdateFailure,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  postUpdateStart,
  postUpdateSuccess,
  postUpdateFailure
} = userSlice.actions;

export default userSlice.reducer;