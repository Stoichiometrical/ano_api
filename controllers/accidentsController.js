const db = require('../config/database');

// Report a new accident
exports.reportAccident = (req, res) => {
    const { reporter_id, location, severity, photo } = req.body;
    const query = 'INSERT INTO Accidents (reporter_id, location, severity, photo) VALUES (?, ?, ?, ?)';
    db.query(query, [reporter_id, location, severity, photo], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).send({ message: 'Accident reported successfully', accidentId: results.insertId });
    });
};

// Update accident status
exports.updateStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const query = 'UPDATE Accidents SET status = ? WHERE id = ?';
    db.query(query, [status, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send({ message: 'Accident status updated successfully' });
    });
};

// Get accident details
exports.getAccidentDetails = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Accidents WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (results.length === 0) {
            res.status(404).send({ message: 'Accident not found' });
            return;
        }
        res.status(200).send(results[0]);
    });
};

// Get all accidents
exports.getAllAccidents = (req, res) => {
    const query = 'SELECT * FROM Accidents';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send(results);
    });
};
