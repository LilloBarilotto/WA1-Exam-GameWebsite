/* Data Access Object (DAO) module for accessing users data */

import db from './db.mjs';
import crypto from "crypto";

export default function UserDAO (){

    this.getUsers = () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT nickname, total_point FROM users', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    this.getUserById = (id) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT id, username, nickname, total_point FROM users WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    };

    this.getUser = (username, password) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE username=?';
            db.get(sql, [username], (err, row) => {
                if (err) {
                    console.error("User not found ERR")
                    reject(err);
                } else if (row === undefined) {
                    resolve(false);
                }
                else {
                    crypto.scrypt(password, row.salt, 32, function (err, hashedPassword) {
                        if (err) reject(err);
                        if (!crypto.timingSafeEqual(Buffer.from(row.hash, 'hex'), hashedPassword))
                            resolve(false);
                        else{
                            const user = { id: row.id, username: row.username, nickname: row.nickname , total_point: row.total_point};
                            resolve(user);
                        }
                    });
                }
            });
        });
    }

    this.updateUserPoint = (id, point) => {
        return new Promise((resolve, reject) => {
            db.run('UPDATE users SET total_point = total_point + ? WHERE id = ?', [point, id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    
} 