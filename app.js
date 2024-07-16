const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/database'); // Import database configuration
const routes = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Assign database connection to global variable
global.db = db;

// Routes
app.use('/api', routes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
