const URL = window.location.hostname === 'localhost' ? '' : 'https://openteamweb.herokuapp.com/';

const API = URL+"api/";
// const URL = "http://localhost:8888/api/";

export const ping = ()=>{
  return fetch(URL+'ping').then((response)=>{
    console.log('Backend Status: '+response.status);
    return response
  });
};

export const clientJson = (path, prop)=>{
  return fetch(path, prop)
  .then(handleErrors)
  .then((response)=>{
    return response.json()
  })
};

export const client = (path, prop)=>{
    return clientJson(API+path, prop)
};

export const clientPost = (path, entity) => {
  return client(path,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entity)
      })
};

export const clientPatch = (path, entity) => {
  return clientJson(path,
      {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entity)
      })
};

function handleErrors(response) {
    if (!response.ok) throw Error(response.statusText);
    return response;
}

