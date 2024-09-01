import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCalenderEvents = createAsyncThunk('calender_events', async (params, thunkApi) => {
    //console.log('🚀 ~ file: auth.js:42 ~ signup ~ params:', params);


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${params.access_token}`)

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${params.hostname}/api/nylas/get_calendar_events`, requestOptions);
        jsonData = await response.json();
        console.log("calender_events", jsonData)
        // jsonData = {}
        if (response.status == 200) { //&& jsonData.access_token) {
            // jsonData = { ...jsonData, userData: { username: params.username, name: params.name } }

            return thunkApi.fulfillWithValue(jsonData)

        } else {
            //console.log("signupfunction else", jsonData)
            return thunkApi.rejectWithValue(jsonData)

        }
    } catch (error) {
        //console.log(error)
        return thunkApi.rejectWithValue(error.message);
    }
});



export const deleteEvent = (params) => {
    return new Promise(async (resolve, reject) => {
        //console.log('🚀 ~ file: retailProduct.js:6 ~ addProduct ~ params:', params);
        console.log(params)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${params.access_token}`)

        // const { email_content } = params;
        const raw = JSON.stringify({
            "grant_id": params.data.grant_id,
            "id": params.data.id,
            "calendar_id": params.data.calendar_id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        try {
            const response = await fetch(`${params.hostname}/api/nylas/delete_calendar_event`, requestOptions);
            const jsonData = await response.json();

            console.log(response.status, "\n reply generator", jsonData)
            if (response.status === 200 && jsonData.status == "success") {
                resolve(jsonData); // Resolve the promise with the JSON data
            } else if (response.status === 422) {
                // Handle status 422 error
                reject({ status: 422, message: 'Validation error' });
            } else {
                // Handle other errors
                reject({ status: response.status, message: 'Unknown error' });
            }
        } catch (error) {
            reject(error.message); // Reject the promise with the error message
        }
    });
};


export const syncEvents = (params) => {
    return new Promise(async (resolve, reject) => {
        //console.log('🚀 ~ file: retailProduct.js:6 ~ addProduct ~ params:', params);
        console.log(params)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${params.access_token}`)

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        try {
            const response = await fetch(`${params.hostname}/api/nylas/sync_calendar_events`, requestOptions);
            const jsonData = await response.json();

            console.log(response.status, "\n SYNC EVEnTS", jsonData)
            if (response.status === 200 && jsonData[0].status == "success") {
                resolve(jsonData[0]); // Resolve the promise with the JSON data
            } else if (response.status === 422) {
                // Handle status 422 error
                reject({ status: 422, message: 'Validation error' });
            } else {
                // Handle other errors
                reject({ status: response.status, message: 'Unknown error' });
            }
        } catch (error) {
            reject(error.message); // Reject the promise with the error message
        }
    });
};