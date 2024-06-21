/* Data Access Object (DAO) module for accessing users data */

import db from './db.mjs';
import crypto from "crypto";

export default function UserDAO (){

    this.getUsers = () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM users', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const users = rows.map(user => ({ id: user.id, nickname: user.nickname , point: user.point}));
                    resolve(users);
                }
            });
        });
    }

    this.getUserById = (id) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    const user = { id: row.id, username: row.username, nickname: row.nickname , point: row.point};
                    resolve(user);
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
                            const user = { id: row.id, username: row.username, nickname: row.nickname , point: row.point};
                            resolve(user);
                        }
                    });
                }
            });
        });
    }

} 