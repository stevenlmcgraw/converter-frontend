import { ACCESS_TOKEN, API_BASE_URL } from "../constants/index";

const request = async (options) => {
    const headers = new Headers({
        'Content-Type' : 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authoriation', 'Bearer ', 
        + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => response.json().then(json => {
        if(!response.ok) {
            return Promise.reject(json);
        }
        return json;
    })
    );
};

//registration and login functions
export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function register(registerRequest) {
    return request({
        url: API_BASE_URL + "/auth/register",
        method: 'POST',
        body: JSON.stringify(registerRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/auth/getUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/auth/getEmailAvailability?email=" + email,
        method: 'GET'
    });
}

//result history functions
export function saveResultHistoryObject(resultHistory) {
    return request({
        url: API_BASE_URL + "/resultHistory?resultHistory=" + resultHistory,
        method: 'POST'
    });
}
