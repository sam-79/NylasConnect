

export const replyGenerator = (params) => {
    return new Promise(async (resolve, reject) => {
        console.log('🚀 ~ file: emailGeneration.js:6 ~ repkyGenerator ~ params:', params);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${params.access_token}`)

        const { user_prompt, grant_id, thread_id } = params;
        const raw = JSON.stringify({
            "user_prompt": user_prompt,
            "grant_id": grant_id,
            "thread_id": thread_id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        try {
            const response = await fetch(`${params.hostname}/api/nylas/generate_autorelpy_messages`, requestOptions);
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


export const emailGenerator = (params) => {
    return new Promise(async (resolve, reject) => {
        //console.log('🚀 ~ file: retailProduct.js:6 ~ addProduct ~ params:', params);
        console.log(params)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${params.access_token}`)

        // const { email_content } = params;
        const raw = JSON.stringify({
            "email_content": params.email_content
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        try {
            const response = await fetch(`${params.hostname}/api/ai/generate_email`, requestOptions);
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
