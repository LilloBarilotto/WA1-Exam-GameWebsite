/**DAO module for access memes */

import db from './db.mjs';

export default function MemeDAO() {

    this.getMeme = (id) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM memes WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    };

    /** Return a meme that is not included into the list of passed memes */
    this.getRandMeme = (ids) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM memes WHERE id NOT IN (' + ids.join(',') + ') ORDER BY RANDOM() LIMIT 1', (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    };

};