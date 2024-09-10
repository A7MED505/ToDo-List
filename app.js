const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session'); // Ensure express-session is required
const MongoStore = require('connect-mongo'); // Ensure connect-mongo is required
const app = express();

// Use environment variable for port or default to 3000
const port = process.env.PORT || 3000;

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@todo-list.3oiso.mongodb.net/?retryWrites=true&w=majority&appName=ToDo-List`;
mongoose.connect(connectionString).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: connectionString }),
    cookie: { secure: false } // Set `true` if using HTTPS
}));


// Set view engine
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
