const SERVER_URL = 'http://localhost:3001/api';
/*********************************** MEME'S API *********************************************/
async function getMemes() {
  const response = await fetch(SERVER_URL + '/memes');
  
  if (!response.ok) {
    throw new Error('Failed to fetch memes');
  }
  
  return response.json();
}

async function getMeme(id) {
    const response = await fetch(SERVER_URL + `/memes/${id}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch meme with id ' + id);
    }
    
    return response.json();
}

/*********************************** GAME'S API *********************************************/
async function getGames() {
    const response = await fetch(SERVER_URL + '/games');
    
    if (!response.ok) {
        throw new Error('Failed to fetch games');
    }
    
    return response.json();
}

async function getGame(id) {
    const response = await fetch(SERVER_URL + `/games/${id}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch game with id ' + id);
    }
    
    return response.json();
}

async function getRound(id) {
    const response = await fetch(SERVER_URL + `/rounds/${id}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch round with id ' + id);
    }
    
    return response.json();
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
    const response = await fetch(SERVER_URL + '/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({credentials}),
    });
    
    if (!response.ok) {
        throw new Error('Failed to login');
    }
    
    return response.json();
}

async function logout() {
    const response = await fetch(SERVER_URL + '/sessions/current', {
        method: 'DELETE',
    });
    
    if (!response.ok) {
        throw new Error('Failed to logout');
    }
}

async function getCurrentUser() {
    const response = await fetch(SERVER_URL + '/sessions/current');
    
    if (!response.ok) {
        throw new Error('Failed to get current user');
    }
    
    return response.json();
}

async function getUsers() {
    const response = await fetch(SERVER_URL + '/users');
    
    if (!response.ok) {
        throw new Error('Failed to get users and their ranking');
    }
    
    return response.json();
}

/*********************************** CAPTION'S API*********************************************/
async function getCaptions() {
    const response = await fetch(SERVER_URL + '/captions');
    
    if (!response.ok) {
        throw new Error('Failed to fetch captions');
    }
    
    return response.json();
}

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


const API = {
  getMemes,
  getMeme,
  getGames,
  login,
  logout,
  getCurrentUser,
  getUsers,
  getCaptions,
  getCaption,
};

export default API;