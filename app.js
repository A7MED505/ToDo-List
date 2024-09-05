// app.js file:

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

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

// Set view engine
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

});
