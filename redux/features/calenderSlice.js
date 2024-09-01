import { createSlice, createAction } from '@reduxjs/toolkit';
import { getCalenderEvents } from '../../src/api/calender_api';
import { Alert } from 'react-native';

const initialState = {

    allCalenderEvents: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
};

// confirmSignup

export const inboxSlice = createSlice({
    name: 'calender',
    initialState,
    extraReducers: builder => {
        // signin cases
        builder.addCase(getCalenderEvents.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getCalenderEvents.fulfilled, (state, action) => {

            //console.log("inboxSlice.js signin line48", action)
            state.isLoading = false;
            state.isSuccess = true;
            state.allCalenderEvents = action.payload.data;// here get the response from list email API req

        });
        builder.addCase(getCalenderEvents.rejected, (state, action) => {
            //console.log("inboxSlice, Line 36", action)
            console.log("inboxSlice.js getCalenderEvents line 41", action)

            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            // state.userVerified = action.payload.detail.is_verified;
            Alert.alert("Error", action.payload.detail.msg)
        });
    }
});
// export const {  } = inboxSlice.actions
export default inboxSlice.reducer;