import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listGrants, revokeGrant } from "../../src/api/inbox"
import { Alert } from 'react-native';
import { syncGrantData } from '../../src/api/auth';

const initialState = {

    grantidlist: null,

    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
};




// confirmSignup

export const grantSlice = createSlice({
    name: 'grant',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        // signin cases
        builder.addCase(listGrants.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(listGrants.fulfilled, (state, action) => {

            //console.log("grantSlice.js signin line48", action)
            state.isLoading = false;
            state.isSuccess = true;
            state.grantidlist = action.payload.data;// here get the response from list email API req
            // console.log("grant id respose:", action.payload)
        });
        builder.addCase(listGrants.rejected, (state, action) => {
            //console.log("grantSlice, Line 36", action)
            console.log("grantSlice.js listGrants line 41", action)

            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            // state.userVerified = action.payload.detail.is_verified;
            Alert.alert("Error", action.payload.detail.msg)
        });
        builder.addCase(syncGrantData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(syncGrantData.fulfilled, (state, action) => {
            Alert.alert("Data synced", "Grant Id Data synced")
            //console.log("grantSlice.js signin line48", action)
            state.isLoading = false;
            state.isSuccess = true;
            state.grantidlist = action.payload.data.data;// here get the response from list email API req
            // console.log("grant id respose:", action.payload)
        });
        builder.addCase(syncGrantData.rejected, (state, action) => {
            //console.log("grantSlice, Line 36", action)
            console.log("grantSlice.js listGrants line 63", action.payload.data)

            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            // state.userVerified = action.payload.detail.is_verified;
            Alert.alert("Error", action.payload.detail.msg)
        });

        // signup cases
        builder.addCase(revokeGrant.pending, (state, action) => {
            console.log("delete email inbox slice, Line 60", action)
            state.isLoading = true;
            //logic to remove the email from persisted email list
        });
        builder.addCase(revokeGrant.fulfilled, (state, action) => {
            console.log("delete Email grantSlice.js line 64", action)
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            //Do nothing, if email delete because we already remove it from persisted list 

        });
        builder.addCase(revokeGrant.rejected, (state, action) => {
            // console.log("grantSlice, Line 71", action)

            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            //here logic to put the email back into list because it failed to delete the email

            Alert.alert("Error", action.payload.detail)

        });
    },
});
// export const {  } = grantSlice.actions
export default grantSlice.reducer;