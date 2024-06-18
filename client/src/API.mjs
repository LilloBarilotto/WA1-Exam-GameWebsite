/*********************************** MEME'S API *********************************************/
async function getMemes() {
  const response = await fetch('/api/memes');
  
  if (!response.ok) {
    throw new Error('Failed to fetch memes');
  }
  
  return response.json();
}

async function getMeme(id) {
    const response = await fetch(`/api/memes/${id}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch meme with id ' + id);
    }
    
    return response.json();
}

/*********************************** GAME'S API *********************************************/
async function getGames() {
    const response = await fetch('/api/games');
    
    if (!response.ok) {
        throw new Error('Failed to fetch games');
    }
    
    return response.json();
}

async function getGame(id) {
    const response = await fetch(`/api/games/${id}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch game with id ' + id);
    }
    
    return response.json();
}

async function getRound(id) {
    const response = await fetch(`/api/rounds/${id}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch round with id ' + id);
    }
    
    return response.json();
}

//TODO non esiste attualmente questa API
async function getRounds(id) {
    const response = await fetch(`/api/games/${id}/rounds`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch rounds of game with id ' + id);
    }
    
    return response.json();
}

/*********************************** USER'S API *********************************************/
async function login(email, password) {
    const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
        throw new Error('Failed to login');
    }
    
    return response.json().username;
}

async function logout() {
    const response = await fetch('/api/sessions/current', {
        method: 'DELETE',
    });
    
    if (!response.ok) {
        throw new Error('Failed to logout');
    }
}

async function getCurrentUser() {
    const response = await fetch('/api/sessions/current');
    
    if (!response.ok) {
        throw new Error('Failed to get current user');
    }
    
    return response.json();
}

async function getUsers() {
    const response = await fetch('/api/users');
    
    if (!response.ok) {
        throw new Error('Failed to get users and their ranking');
    }
    
    return response.json();
}

/*********************************** CAPTION'S API*********************************************/
async function getCaptions() {
    const response = await fetch('/api/captions');
    
    if (!response.ok) {
        throw new Error('Failed to fetch captions');
    }
    
    return response.json();
}

async function getCaption(id) {
    const response = await fetch(`/api/captions/${id}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch caption with id ' + id);
    }
    
    return response.json();
}

async function getBestCaption(id) {
    const response = await fetch(`/api/rounds/${id}/captions/best_captions`);
    
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