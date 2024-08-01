// alldataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const alldataSlice = createSlice({
  name: 'alldata', // Change the name to 'alldata'
  initialState: {
    allUserData: [],
    error: null,
  },
  reducers: {
    setAllUserData: (state, action) => {
      state.allUserData = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAllUserData, setError } = alldataSlice.actions;
export default alldataSlice.reducer;
