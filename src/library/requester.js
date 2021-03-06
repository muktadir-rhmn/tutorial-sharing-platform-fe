import userManager from "../view/user/UserManager";

const rootURL = "http://localhost:8080";

const RESPONSE_CODE = {
    OK: 200,
    VALIDATION_ERROR: 400,
}
const requester = {
    GET: function(path, queryParams={}) {
        let queryString = "";
        for(let key in queryParams) {
            if(queryString !== "") queryString += "&";
            queryString += `${key}=${queryParams[key]}`;
        }
        const url = `${rootURL}${path}?${queryString}`;
        
        let promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if(xhr.readyState === XMLHttpRequest.DONE) {
                    const json = JSON.parse(xhr.responseText);
                    if(xhr.status === RESPONSE_CODE.OK) {
                        resolve(json);
                    } else if(xhr.status === RESPONSE_CODE.VALIDATION_ERROR) {
                        reject(json);
                    } else {
                        console.error(json);
                        reject(json);
                    }
                }
            }
            xhr.open("GET", url, true);
            xhr.setRequestHeader("token", userManager.getToken());
            xhr.send();
        }) 
        return promise;
    }, 
    POST: function(path, requestBody={}) {
        return requester._POST_PUT("POST", path, requestBody);
    },

    PUT: (path, requestBody) => {
        return requester._POST_PUT("PUT", path, requestBody);
    },

    _POST_PUT: (methodName, path, requestBody={}) => {
        const url = `${rootURL}${path}`;
        console.log(url);

        let promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if(xhr.readyState === XMLHttpRequest.DONE) {
                    const json = JSON.parse(xhr.responseText);
                    if(xhr.status === RESPONSE_CODE.OK) {
                        console.log("Success response:", json);
                        resolve(json);
                    } else if(xhr.status === RESPONSE_CODE.VALIDATION_ERROR) {
                        console.log("Failed response:", json);
                        reject(json);
                    } else {
                        reject(json);
                    }
                }
            }
            xhr.open(methodName, url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("token", userManager.getToken());
            xhr.send(JSON.stringify(requestBody));
        });
        return promise;
    },
}

export default requester;