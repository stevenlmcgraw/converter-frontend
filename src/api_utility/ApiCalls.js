import { ACCESS_TOKEN, API_BASE_URL } from "../constants/index";

const request = (options) => {
    const headers = new Headers({
        'Content-Type' : 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' 
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

//user and user profile functions
export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token! Better get one.");
    }

    return request({
        url: API_BASE_URL + "/user/currentUser",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/user/" + username,
        method: 'GET'
    });
}

//favorites list
export function addFormulaToFavoritesList(username, formulaName) {
    return request({
        url: API_BASE_URL + "/user/" + username 
        + "/favorites/" + formulaName,
        method: 'POST'
    })
}

export function deleteFormulaFromFavoritesList(username, formulaName) {
    return request ({
        url: API_BASE_URL + "/user/" + username + 
        "/favorites/delete/" + formulaName,
        method: 'DELETE'
    })
}

export function deleteAllFromFavoritesList(username) {
    return request ({
        url: API_BASE_URL + "/user/" + username + 
        "/favorites/delete/",
        method: 'DELETE'
    })
}

//result history functions
export function saveResultHistoryObject(resultHistory) {
    return request({
        url: API_BASE_URL + "/resultHistory",
        method: 'POST',
        body: JSON.stringify(resultHistory)
    });
}

export function getAllUsernameResultHistory(username) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token! Better get one.");
    }
    
    return request({
        url: API_BASE_URL + "/resultHistory/" + username,
        method: 'GET'
    });
}
