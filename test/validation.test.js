const app = require('../src');
const req = require('supertest');
const chai = require('chai');
const expect = chai.expect;

describe('Test Validation Methods for Courses', () => {
	it('should return 400 for a request without a name', (done) => {
		req(app)
			.post('/api/courses')
			.set('Accept', 'application/json')
			.send({})
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if(err) return done(err);
				expect(res.status).to.equal(400);
				expect(res.body.message).to.contain('"name" is required');
				done();
			});
	});
});
