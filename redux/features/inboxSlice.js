import { createSlice, createAction } from '@reduxjs/toolkit';
import { listEmails, deleteEmail } from "../../src/api/inbox"
import { Alert } from 'react-native';
import { INBOX_LABEL } from '../../src/constants';

const initialState = {

    allEmailList: null,
    activeInboxLabel: INBOX_LABEL.PRIMARY,
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
};

export const changeInboxLabel = createAction('inbox/changeInboxLabel', function prepare(data) {
    return {
        payload: data
    }
})


// confirmSignup

export const inboxSlice = createSlice({
    name: 'inbox',
    initialState,
    reducers: {
        changeInboxLabel: (state, action) => {
            state.activeInboxLabel = action.payload.label
        },
    },
    extraReducers: builder => {
        // signin cases
        builder.addCase(listEmails.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(listEmails.fulfilled, (state, action) => {

            //console.log("inboxSlice.js signin line48", action)
            state.isLoading = false;
            state.isSuccess = true;
            state.allEmailList = action.payload.data;// here get the response from list email API req

        });
        builder.addCase(listEmails.rejected, (state, action) => {
            //console.log("inboxSlice, Line 36", action)
            console.log("inboxSlice.js listemails line 41", action)

            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            // state.userVerified = action.payload.detail.is_verified;
            Alert.alert("Error", "Failed to load emails")
        });

        // signup cases
        builder.addCase(deleteEmail.pending, (state, action) => {
            console.log("delete email inbox slice, Line 60", action)
            state.isLoading = true;
            //logic to remove the email from persisted email list
        });
        builder.addCase(deleteEmail.fulfilled, (state, action) => {
            console.log("delete Email inboxSlice.js line 64", action)
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            //Do nothing, if email delete because we already remove it from persisted list 

        });
        builder.addCase(deleteEmail.rejected, (state, action) => {
            // console.log("inboxSlice, Line 71", action)

            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            //here logic to put the email back into list because it failed to delete the email

            Alert.alert("Error", action.payload.detail)

        });
    },
});
// export const {  } = inboxSlice.actions
export default inboxSlice.reducer;