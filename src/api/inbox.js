import { createAsyncThunk } from "@reduxjs/toolkit";

//list all grants ID assigned to current login account
export const listGrants = createAsyncThunk('listGrants', async (params, thunkApi) => {

    //console.log('🚀😂 ~ file: auth.js:6 ~ signin ~ params:', params);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${params.access_token}`)
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${params.hostname}/api/nylas/grants`, requestOptions);
        jsonData = await response.json();
        console.log("listGrants naylas.js", response)

        if (response.status == 200) {
            console.log("get grants inbox.js", jsonData)
            //return thunkApi.fulfillWithValue({ access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWQiOjN9.tZ8HUgpX9kH3jRCXVhporsM5wPfz4dfw9tyhK5LtLf8" });
            return thunkApi.fulfillWithValue(jsonData);
        } else if (response.status == 403) {
            //console.log("loginfunction else", jsonData)
            return thunkApi.fulfillWithValue(jsonData)
        } else {
            return thunkApi.rejectWithValue(jsonData)
        }
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }

});

//Revoke grants ID assigned to current login account
export const revokeGrant = createAsyncThunk('revokeGrant', async (params, thunkApi) => {

    //console.log('🚀😂 ~ file: auth.js:6 ~ signin ~ params:', params);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${params.access_token}`)
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${params.hostname}/api/nylas/delete_grants/${params.grantid}`, requestOptions);
        jsonData = await response.json();
        console.log("delete grant naylas.js", response)

        if (response.status == 200) {
            //console.log("loginfunction", jsonData)
            //return thunkApi.fulfillWithValue({ access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWQiOjN9.tZ8HUgpX9kH3jRCXVhporsM5wPfz4dfw9tyhK5LtLf8" });
            return thunkApi.fulfillWithValue(jsonData);
        } else if (response.status == 403) {
            //console.log("loginfunction else", jsonData)
            return thunkApi.fulfillWithValue(jsonData)
        } else {
            return thunkApi.rejectWithValue(jsonData)
        }
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }

});

export const listEmails = createAsyncThunk('listEmails', async (params, thunkApi) => {


    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${params.access_token}`)
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        grant_id: params.grant_ids,
        limit: 10
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    console.log(requestOptions)
    try {
        const response = await fetch(`${params.hostname}/api/nylas/messages`, requestOptions);
        jsonData = await response.json();
        // console.log("listEmails naylas.js", jsonData)

        if (jsonData.status == "success") {
            return thunkApi.fulfillWithValue(jsonData);
        } else {
            return thunkApi.rejectWithValue(jsonData)
        }

        // if (response.status == 200) {
        //     //console.log("loginfunction", jsonData)
        //     //return thunkApi.fulfillWithValue({ access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWQiOjN9.tZ8HUgpX9kH3jRCXVhporsM5wPfz4dfw9tyhK5LtLf8" });
        //     return thunkApi.fulfillWithValue(jsonData);
        // } else if (response.status == 403) {
        //     //console.log("loginfunction else", jsonData)
        //     return thunkApi.fulfillWithValue(jsonData)
        // } else {
        //     return thunkApi.rejectWithValue(jsonData)
        // }
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }

});

export const deleteEmail = createAsyncThunk('deleteEmail', async (params, thunkApi) => {


    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${params.access_token}`)
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        grant_id: params.grant_id,
        thread_id: params.thread_id
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${params.hostname}/api/nylas/delete_messages`, requestOptions);
        jsonData = await response.json();
        console.log("delete email naylas.js", response)

        if (response.status == 200) {
            //console.log("loginfunction", jsonData)
            //return thunkApi.fulfillWithValue({ access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWQiOjN9.tZ8HUgpX9kH3jRCXVhporsM5wPfz4dfw9tyhK5LtLf8" });
            return thunkApi.fulfillWithValue(jsonData);
        } else if (response.status == 403) {
            //console.log("loginfunction else", jsonData)
            return thunkApi.fulfillWithValue(jsonData)
        } else {
            return thunkApi.rejectWithValue(jsonData)
        }
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }

});

export const readEmail = (params) => {


    return new Promise(async (resolve, reject) => {
        console.log('🚀 ~ file: inbox,js ~ readEmail~ params:', params);


        var raw = JSON.stringify({
            grant_id: params.grant_id,
            id: params.id
        });


        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${params.access_token}`)
        myHeaders.append("Content-Type", "application/json");



        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${params.hostname}/api/nylas/read_messages`, requestOptions);
            const jsonData = await response.json();

            // console.log("email content get by thread id ", jsonData)
            if (response.status === 200) {
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

export const sendEmail = (params) => {
    return new Promise(async (resolve, reject) => {
        console.log('🚀 ~ file: inbox,js ~ sendEmail~ params:', params);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${params.access_token}`)
        myHeaders.append("Content-Type", "application/json");

        const { grant_id, subject, to, cc, bcc, reply_to, body } = params.email
        const raw = JSON.stringify({
            "grant_id": grant_id,
            "subject": subject,
            "to": to,
            "cc": [],
            "bcc": [],
            "reply_to": [],
            "body": body
        });


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${params.hostname}/api/nylas/send_messages`, requestOptions);
            const jsonData = await response.json();

            console.log("send email get by thread id ", jsonData)
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

export const replyEmail = (params) => {
    return new Promise(async (resolve, reject) => {
        console.log('🚀 ~ file: inbox,js ~ replyEmail~ params:', params);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${params.access_token}`)
        myHeaders.append("Content-Type", "application/json");

        const { grant_id, subject, to, cc, bcc, reply_to, body, id } = params.email
        console.log("to:",to)
        const raw = JSON.stringify({
            "id":id,
            "grant_id": grant_id,
            "subject": subject,
            "to": to,
            "cc": [],
            "bcc": [],
            "reply_to": [],
            "body": body
        });


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${params.hostname}/api/nylas/reply_messages`, requestOptions);
            const jsonData = await response.json();

            console.log("reply email get by thread id ", jsonData)
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

}

export const summarizeEmail = (params) => {
    return new Promise(async (resolve, reject) => {
        console.log('🚀 ~ file: inbox,js ~ summarize email~ params:', params);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${params.access_token}`)
        myHeaders.append("Content-Type", "application/json");

        const { grant_id, thread_id } = params.data
        console.log("summary:", params)
        const raw = JSON.stringify({
            grant_id:grant_id,
            thread_id:thread_id
        });


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${params.hostname}/api/nylas/email_thread_summary`, requestOptions);
            const jsonData = await response.json();

            console.log("summary email get by thread id ", jsonData)
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

}