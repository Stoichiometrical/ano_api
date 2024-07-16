const db = require('../config/database');

// Register a new user
exports.register = (req, res) => {
    const { email, password, name, surname, role, allergies, medical_insurance, emergency_contact } = req.body;
    const query = 'INSERT INTO Users (email, password, name, surname, role, allergies, medical_insurance, emergency_contact) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [email, password, name, surname, role, allergies, medical_insurance, emergency_contact], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).send({ message: 'User registered successfully', userId: results.insertId });
    });
};

// User login
exports.login = (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM Users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (results.length === 0) {
            res.status(401).send({ message: 'Invalid credentials' });
            return;
        }
        res.status(200).send({ message: 'Login successful', user: results[0] });
    });
};

// Update user profile
exports.updateProfile = (req, res) => {
    const { id } = req.params;
    const { allergies, medical_insurance, emergency_contact } = req.body;
    const query = 'UPDATE Users SET allergies = ?, medical_insurance = ?, emergency_contact = ? WHERE id = ?';
    db.query(query, [allergies, medical_insurance, emergency_contact, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send({ message: 'Profile updated successfully' });
    });
};

// Get user details by ID
exports.getUserById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (results.length === 0) {
            res.status(404).send({ message: 'User not found' });
            return;
        }
        res.status(200).send(results[0]);
    });
};

// Delete user by ID
exports.deleteUserById = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send({ message: 'User deleted successfully' });
    });
};

// Get all users
exports.getAllUsers = (req, res) => {
    const query = 'SELECT * FROM Users';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send(results);
    });
};
