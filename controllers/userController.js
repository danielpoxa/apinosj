const User = require('../models/usersModel');

const getUsers = (req, res) => {
    User.getALLUsers((err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
};

const createUser = (req, res) => {
    const { name, email } = req.body;
    User.createUser(name, email, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: result.insertId, name, email });
        }
    });
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    User.updateUser(id, name, email, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json({ message: 'User updated successfully' });
        }
    });
};

const deleteUser = (req, res) => {
    const { id } = req.params;
    User.deleteUser(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json({ message: 'User deleted successfully' });
        }
    });
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};
