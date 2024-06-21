/** DAO access module for captions */

import db from './db.mjs';

export default function CaptionDAO() {

    //** Return N random captions (usually 5) */
    this.getCaptionsN = (n) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM captions ORDER BY RANDOM() LIMIT ?', [n], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    };

    /** Return two from the best caption for the meme!*/
    this.getBestCaption = (memeId) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM captions c, best_captions bc WHERE c.id= best_captions.caption_id AND bc.meme_id = ? ORDER BY RANDOM() LIMIT 2', [memeId], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

};