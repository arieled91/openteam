const URL = "http://localhost:8888/api/";

export const client = (path, prop)=>{
  return fetch(path, prop)
  .then(handleErrors)
  .then((response)=>{
    return response.json()
  })
};

export const clientGet = (path, prop)=>{
    return client(URL+path, prop)
};

export const clientPost = (path, entity) => {
  return clientGet(path,
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
  return client(path,
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

