const SERVER_URL = 'http://localhost:3001/api';
/*********************************** MEME'S API *********************************************/
async function getMemes() {
  return await fetch(SERVER_URL + '/memes')
    .then(handleInvalidResponse)
    .then(response => response.json());
}

async function getMeme(id) {
    return await fetch(SERVER_URL + `/memes/${id}`)
    .then(handleInvalidResponse)
    .then(response => response.json());
}

async function getRandomMeme() {
    return await fetch(SERVER_URL + '/memes/random')
    .then(handleInvalidResponse)
    .then(response => response.json());
};

/*********************************** GAME'S API *********************************************/
async function getGames() {
    return await fetch(SERVER_URL + '/games')
    .then(handleInvalidResponse)
    .then(response => response.json());
}

async function getGame(id) {
    return await fetch(SERVER_URL + `/games/${id}`)
    .then(handleInvalidResponse)
    .then(response => response.json());
}

async function getRound(id) {
    return  fetch(SERVER_URL + `/rounds/${id}`)
    .then(handleInvalidResponse)
    .then(response => response.json());
}

//TODO non esiste attualmente questa API
async function getRounds(id) {
    const response = await fetch(SERVER_URL + `/games/${id}/rounds`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch rounds of game with id ' + id);
    }
    
    return response.json();
}

/*********************************** USER'S API *********************************************/
async function login(credentials) {
    return await fetch(SERVER_URL + '/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
    }).then(handleInvalidResponse)
    .then(response => response.json());
}

async function logout() {
    return await fetch(SERVER_URL + '/sessions/current', {
        method: 'DELETE',
        credentials: 'include',
    }).then(handleInvalidResponse);
}

async function getCurrentUser() {
    return await fetch(SERVER_URL + '/sessions/current', {
        credentials: 'include'
    }).then(handleInvalidResponse)
    .then(response => response.json());
};

async function getUsers() {
    return await fetch(SERVER_URL + '/users')
    .then(handleInvalidResponse)
    .then(response => response.json());
}

/*********************************** CAPTION'S API*********************************************/
async function getCaption(id) {
    const response = await fetch(SERVER_URL + `/captions/${id}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch caption with id ' + id);
    }
    
    return response.json();
}

async function getBestCaption(id) {
    const response = await fetch(SERVER_URL + `/rounds/${id}/captions/best_captions`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch best caption of round with id ' + id);
    }
    
    return response.json();
}

function handleInvalidResponse(response) {
    if (!response.ok) { throw Error(response.statusText) }
    let type = response.headers.get('Content-Type');
    if (type !== null && type.indexOf('application/json') === -1){
        throw new TypeError(`Expected JSON, got ${type}`)
    }
    return response;
}


const API = {
  login,
  logout,
  getCurrentUser,
  
  getMemes,
  getMeme,
  getGames,
  getUsers,
  getCaption,
};

export default API;