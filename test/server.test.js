const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app/server'); // Adjust the path as needed

const should = chai.should();
chai.use(chaiHttp);

describe('Brands', () => {
  // Test for GET /api/brands
  describe('/GET brand', () => {
    it('should GET all brands', (done) => {})
    it('should GET products for a specific brand id', (done) => {})
  })
});

describe('Login', () => {
  describe('/GET user', () => {
    // Test for GET /api/login
    it('should not GET user if not logged in', (done) => {})
    it('should GET user by token if logged in', (done) => {})
  })
});

describe('Cart', () => {
  // Test for GET /api/me/cart
  describe('/GET cart', () => {
    it('should not GET cart if not logged in', (done) => {})
    it('should GET all items in the cart', (done) => {})
  })
  // Test for POST /api/me/cart
  describe('/POST cart', () => {
    it('should not POST item if not logged in', (done) => {})
    it('should POST item by id to the cart', (done) => {})
    it('should not POST item if id does not exist', (done) => {})
    it('should update quantity if item already exists', (done) => {})
  })
  // Test for DELETE /api/me/cart
  describe('/DELETE cart', () => {
    it('should DELETE items by id from the cart', (done) => {})
    it('should not DELETE item if id does not exist', (done) => {})
  })

});
