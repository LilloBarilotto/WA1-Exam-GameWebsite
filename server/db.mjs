/**DB access module */

import sqlite3 from 'sqlite3';

// open database
const db = new sqlite3.Database('meme-game.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

export default db;
