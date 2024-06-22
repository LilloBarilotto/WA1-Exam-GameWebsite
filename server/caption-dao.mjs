/** DAO access module for captions */
import db from './db.mjs';

export default function CaptionDAO() {

    /** Return 5 random captions that are not included into the best captions of the choiced meme*/
    this.getRandomCaptions = (meme_ID) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM captions WHERE id NOT IN (SELECT caption_id FROM best_captions where meme_id = ?) ORDER BY RANDOM() LIMIT 5', [meme_ID], (err, rows) => {
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
            db.all('SELECT c.id, c.description FROM captions c, best_captions bc WHERE c.id = bc.caption_id AND bc.meme_id = ? ORDER BY RANDOM() LIMIT 2', [memeId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    this.isBestCaption = (memeId, captionId) => { 
        return new Promise<Boolean>((resolve, reject) => {
            db.get('SELECT * FROM best_captions WHERE meme_id = ? AND caption_id = ?', [memeId, captionId], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row !== undefined);
                }
            });
        });
    }

    this.getRoundCaptions = (roundId) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM captions WHERE id IN (SELECT caption_id FROM round_captions WHERE round_id = ?)', [roundId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    this.getCaption = (captionId) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM captions WHERE id = ?', [captionId], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
};