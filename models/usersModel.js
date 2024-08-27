// models/usersModel.js

const db = require('../config/db');

// Função para criar um novo usuário
const createUser = (name, email, callback) => {
    // Seleciona o próximo ID disponível
    const getNextIdSql = 'SELECT IFNULL(MAX(idusers), 0) + 1 AS next_id FROM users';
    
    db.query(getNextIdSql, (err, results) => {
        if (err) {
            return callback(err);
        }
        const nextId = results[0].next_id;
        const sql = 'INSERT INTO users (idusers, name, email) VALUES (?, ?, ?)';
        db.query(sql, [nextId, name, email], (err, result) => {
            if (err) {
                return callback(err);
            }
            rearrangeIds(callback); // Reorganiza IDs após adição
        });
    });
};

// Função para reorganizar IDs
const rearrangeIds = (callback) => {
    const sql = `
        SET @current_id = 0;
        UPDATE users SET idusers = (@current_id := @current_id + 1) ORDER BY idusers;
    `;
    db.query(sql, callback);
};

// Função para obter todos os usuários
const getALLUsers = (callback) => {
    const sql = 'SELECT * FROM users ORDER BY idusers ASC';
    db.query(sql, callback);
};

// Função para atualizar um usuário existente
const updateUser = (id, name, email, callback) => {
    const sql = 'UPDATE users SET name = ?, email = ? WHERE idusers = ?';
    db.query(sql, [name, email, id], callback);
};

// Função para excluir um usuário
const deleteUser = (id, callback) => {
    const sql = 'DELETE FROM users WHERE idusers = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return callback(err);
        }
        rearrangeIds(callback); // Reorganiza IDs após exclusão
    });
};

module.exports = {
    createUser,
    getALLUsers,
    updateUser,
    deleteUser
};
