import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Alert } from 'react-native';

const initialState = {
  value: null, // To bypass the Hostname screen, add your server IP address(with port no. on local network) here. ex "http://192.164.176.96:8000"
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null
};

// checkHostname
export const check_hostname = createAsyncThunk('check_hostname', async (params, thunkApi) => {
  //console.log('🚀 ~ file: check_Slice.js:12 ~ check_hostname ~ params:', params);


  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(`${params.value}/check_api`, requestOptions);
    jsonData = await response.json();
    if (jsonData.status == "Connected to API Successfully") {
      return thunkApi.fulfillWithValue(params.value)
    } else {
      return thunkApi.rejectWithValue({ error: "Enter Valid host URL" });
    }
  } catch (error) {
    return thunkApi.rejectWithValue({ error: "Enter valid host URL" });
  }
});



export const hostnameSlice = createSlice({
  name: 'hostname',
  initialState,
  reducers: {
    deleteHost: (state, action) => {
      state.value = null;
    }
  },

  extraReducers: builder => {
    // login cases
    builder.addCase(check_hostname.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(check_hostname.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.error = null;
      state.value = action.payload;

    });
    builder.addCase(check_hostname.rejected, (state, action) => {
      //console.log(action)
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload.error;
      Alert.alert("Error", "Enter valid URL")
    });
  },


})

// Action creators are generated for each case reducer function
export const { deleteHost } = hostnameSlice.actions
export default hostnameSlice.reducer