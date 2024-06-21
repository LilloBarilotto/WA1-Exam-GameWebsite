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

    this.addRound = (round) => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO rounds (meme_ID, first_best_caption_ID, second_best_caption_ID, selected_caption_ID, point, game_ID) VALUES (?, ?, ?, ?, ?, ?)', [round.meme_ID, round.first_best_caption_ID, round.second__best_caption_ID, round.selected_caption_ID, round.point, round.game_ID], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    this.addGames = (game) => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO games (user_ID, meme_ID, date) VALUES (?, ?)', [game.user_ID, game.meme_ID, game.date], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    this.deleteGame = (gameId) => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM games WHERE id = ?', [gameId], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }
    
};