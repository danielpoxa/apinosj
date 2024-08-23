const db = require('../config/db');

const createUser = (name, email, callback) => {
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], callback);
};

const getALLUsers = (callback) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, callback);
};

const updateUser = (id, name, email, callback) => {
    const sql = 'UPDATE users SET name = ?, email = ? WHERE idusers = ?';  // Certifique-se do nome correto da coluna ID
    db.query(sql, [name, email, id], callback);
};

const deleteUser = (id, callback) => {
    const sql = 'DELETE FROM users WHERE idusers = ?';  // Certifique-se do nome correto da coluna ID
    db.query(sql, [id], callback);
};

module.exports = {
    createUser,
    getALLUsers,
    updateUser,
    deleteUser
};
