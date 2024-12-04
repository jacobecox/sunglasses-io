const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app/server'); // Adjust the path as needed
const expect = chai.expect;
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');


describe('Brands', () => {
  // Test for GET /api/brands
  // describe('/GET brand', () => {
  //   it('should GET all brands', (done) => {})
  //   it('should GET products for a specific brand id', (done) => {})
  // })
});

describe('Login', () => { 
    // Test for GET /api/login
    it('should log in user and return a JWT token', (done) => {
      let user = { username: 'yellowleopard753', password: 'jonjon' }
      chai.request(server)
      .post('/login')
      .send(user)
      .end(function(err, res) {
        const token = res.body.token;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token')
        expect(token).to.be.a('string')
        done();
      })
    })
    it('should return 401 if credentials are incorrect', (done) => {
        let userData = { username: 'yellowleopard753', password: 'wrongpassword' };
        chai.request(server)
          .post('/login')
          .send(userData)
          .end(function (err, res) {
            expect(res).to.have.status(401); // Expecting status 401 (Unauthorized)
            expect(res.body).to.have.property('message', 'Invalid credentials'); // Expect an error message
            done();
          });
      });
});

describe('Cart', () => {
  // Test for GET /api/me/cart
  describe('/GET cart', () => {
    it('should not GET cart if the user is not logged in', (done) => {
      chai.request(server)
      .get('/cart')
      .set('authorization', 'invalidtoken')  // Pass an invalid token
      .end((err, res) => {
        expect(res).to.have.status(401);  // Expect 401 Unauthorized
        done();
    })
  })
    it('should GET all items in the cart if the user is logged in', (done) => {
      const token = jwt.sign(  // Fetch token from login
        { username: 'yellowleopard753', password: 'jonjon' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' });
      chai.request(server)
      .get('/cart')
      .set('authorization', token)
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array')
        expect(res.body.length).to.be.greaterThan(0)
        done();
    })
  })
  })
  // Test for POST /api/me/cart
  describe('/POST cart', () => {
    it('should not POST item if not logged in', (done) => {
      const newItem = {
        id: '2',
        name: 'Black Sunglasses',
        price: 100,
        quantity: 1
      };
      chai.request(server)
      .post('/cart')
      .set('authorization', 'invalidtoken')  // Pass an invalid token
      .send(newItem)
      expect(res.status).to.equal(401);
      expect(res.body.message).to.equal('No token provided');
    })

    it('should add item by id to the cart', (done) => {
      const token = jwt.sign(  // Fetch token from login
        { username: 'yellowleopard753', password: 'jonjon' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' });
      const newItem = { //  Item for test to pass into cart
        id: '2',
        name: 'Black Sunglasses',
        price: 100,
        quantity: 1
      };
      chai.request(server)
      .post('/cart')
      .set('authorization', token)  // Pass an invalid token
      .send(newItem)
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Item added to cart');
      expect(res.body.newItem).to.deep.equal(newItem); // Body must include newItem

    it('should update quantity if item already exists in cart', (done) => {})
  })
  // Test for DELETE /api/me/cart
  // describe('/DELETE cart', () => {
  //   it('should DELETE items by id from the cart', (done) => {})
  //   it('should not DELETE item if id does not exist', (done) => {})
  })
});
