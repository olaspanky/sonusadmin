import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import dataReducer from './slice/userdataslice'; // Add your new dataSlice
import alldataReducer from './slice/dataSlice'; // Import your new dataSlice


const store = configureStore({
  reducer: {
    user: userReducer,
    data: dataReducer, // Add your new dataSlice to the store
    alldata: alldataReducer, // Change the name to 'alldata'




    // ... other reducers
  },
});

export default store;
