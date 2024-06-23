const SERVER_URL = 'http://localhost:3001/api';
/*********************************** MEME'S API *********************************************/
async function getRandomMeme(ids) {
    return await fetch(SERVER_URL + '/memes/random',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(ids),
    })
    .then(handleInvalidResponse)
    .then(response => response.json());
};

/*********************************** GAME'S API *********************************************/
async function addGame(game) {
    return await fetch(SERVER_URL + '/games', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(game),
    }).then(handleInvalidResponse)
    .then(response => response.json());
}

async function getGames() {
    return await fetch(SERVER_URL + '/games', {
        credentials: 'include'
    })
    .then(handleInvalidResponse)
    .then(response => response.json());
}

async function getGame(id) {
    return await fetch(SERVER_URL + `/games/${id}`,  {
        credentials: 'include'
    })
    .then(handleInvalidResponse)
    .then(response => response.json());
}

async function getRoundResults(round) {
    return await fetch(SERVER_URL + '/games/anonymous', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(round)
    }).then(handleInvalidResponse)
    .then(response => response.json());
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

async function getLeaderboard() {
    return await fetch(SERVER_URL + '/users')
    .then(handleInvalidResponse)
    .then(response => response.json());
}

/*********************************** UTILITY *********************************************/

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
  getLeaderboard,
 
  getGames,
  getGame,
  addGame,

  getRoundResults,
  getRandomMeme
};

export default API;