const express = require('express');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml'); // Replace './swagger.yaml' with the path to your Swagger file
const app = express();
require('dotenv').config();

app.use(express.json());

// Importing the data from JSON files
const users = require('../initial-data/users.json');
const brands = require('../initial-data/brands.json');
const products = require('../initial-data/products.json');

// Error handling
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Route to authenticate users and generate JWT token
app.post('/login', (req, res) => {
  const { username } = req.body;

	const user = users.find(u => u.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate a JWT token with user data
  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET,  // Using a secret key from environment variables
    { expiresIn: '1h' }     // Set token expiration
  );

  res.status(200).json({ token });
});


// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

module.exports = app;
