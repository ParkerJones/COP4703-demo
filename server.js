const express = require('express');
const path = require('path');

const controller_index = require('./src/controllers/index.js');

const app = express();
const PORT = 1738;

app.use(express.json());

// Set view engine
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Routes
app.get('/', controller_index.render);
app.post('/execute-sp6', controller_index.execute_sp6);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}.`)
});
