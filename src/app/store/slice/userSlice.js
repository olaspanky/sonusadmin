
// import { createSlice } from '@reduxjs/toolkit';

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     currentUser: null,
//     isLoading: true,
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.currentUser = action.payload;
//       state.isLoading = false;
//     },
//     clearUser: (state) => {
//       state.currentUser = null;
//       state.isLoading = false;
//     },
//   },
// });

// export const { setUser, clearUser } = userSlice.actions;

// export const selectUser = (state) => state.user;

// export default userSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isLoading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isLoading = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
