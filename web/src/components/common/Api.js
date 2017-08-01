const URL = window.location.hostname === 'localhost' ? '/' : 'https://openteamweb.herokuapp.com/';

const API = URL+"api/";
// const URL = "http://localhost:8888/api/";

export const health = ()=>{
  return fetch(URL+'health').then((response)=>{
    console.log(response);
    return response
  });
};

export const clientLink = (path, ...props)=>{
  return fetch(path, ...props)
  .then(handleErrors)
  .then((response)=>{
    return response.json()
  })
};

export const client = (path, prop)=>{
    return clientLink(API+path, prop)
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

export const clientAdd = (resourcePath, entityPath) => {
  return clientLink(resourcePath,
      {
        method: "PATCH",
        headers: {
          'Content-Type': 'text/uri-list'
        },
        body: entityPath
      })
};

export const clientPatch = (path, entity) => {
  return clientLink(path,
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

