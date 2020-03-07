import { API_BASEURL, ACCESS_TOKEN } from "../constants/index";

const request = (options) => {
    const headers = new Headers({
        'Content-type' : 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authoriation', 'Bearer ', 
        + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => response.json.then(json => {
        if(!response.ok) {
            return Promise.reject(json);
        }
        return json;
    })
    );
};