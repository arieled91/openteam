const URL = "http://localhost:8888/api";

export const client = (path)=>{
    return fetch(URL+path)
        .then(handleErrors)
        .then((response)=>{
            return response.json()
        })
};

function handleErrors(response) {
    if (!response.ok) throw Error(response.statusText);
    return response;
}

