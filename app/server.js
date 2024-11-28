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
  const { username, password } = req.body; //pull username and password from request
	const user = users.find(u => u.login.username === username); //searching for user with username which match request

  if (!user || user.login.password !== password) { // if password or username don't match or don't exist, give error 401
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate a JWT token with user data
  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET,  // Using a secret key from environment variables
    { expiresIn: '1h' }
  );

  console.log('token:', token)

  res.set('authorization', `bearer ${token}`);
  
  return res.status(200).json({ token: token }); // Response to be returned
});


// Route to authenticate token and get cart
app.get('/cart', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  // Trying to figure out why the 'authorization: bearer token' is returning undefined
  console.log('headers:', req.headers)

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  // Verify jwt token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' })
    }
    
    // Retrieve cart items for user
    const userCart = getUserCart(decoded.username);
    console.log('cart:',userCart)
    res.status(200).json(userCart);  // Send the cart items in the response
  })
})


// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

module.exports = app;
