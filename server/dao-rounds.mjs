//** DAO about rounds */

import db from './db.mjs';

export default function RoundDAO() {

    this.getGames= (userId) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM games WHERE user_id = ?', [userId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });  
    };

    this.getRounds = (gameId) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM rounds WHERE game_id = ?', [gameId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    };

    this.getRound = (roundId) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM rounds WHERE id = ?', [roundId], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    };
    
};