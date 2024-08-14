const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.set('view engine', 'ejs')


// Connect to MongoDB
mongoose.connect("mongodb+srv://Ahmed:aKJpCZlOCA0tpAbz@todo-list.3oiso.mongodb.net/?retryWrites=true&w=majority&appName=ToDo-List");

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



