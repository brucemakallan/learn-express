const app = require('../src');
const req = require('supertest');
const chai = require('chai');
const expect = chai.expect;

describe('Test API endpoints for Courses', function() {
	it('should get welcome message', (done) => {
		req(app)
			.get('/')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if(err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body.message).to.equal('Welcome!');
				done();
			});
	});

	it('should post a new Course', (done) => {
		const courseName = 'The ins and outs of madness';
		req(app)
			.post('/api/courses')
			.set('Accept', 'application/json')
			.send({name: courseName})
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if(err) return done(err);
				expect(res.status).to.equal(201);
				expect(res.body.name).to.equal(courseName);
				expect(res.body).to.have.property('_id');
				expect(res.body).to.have.property('dateCreated');
				expect(res.body).to.have.property('dateUpdated');
				done();
			});
	});
});
