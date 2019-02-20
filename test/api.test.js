const app = require('../src');
const req = require('supertest');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

describe('Test API endpoints for Courses', () => {
	let courseId;
	const courseName = 'Astrophysics';

	before('post a new Course', (done) => {
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
				courseId = res.body._id;
				done();
			});
	});

	after('drop the database', (done) => {
		mongoose.connection.db.dropDatabase(done);
	});

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

	it('should get all Courses', (done) => {
		req(app)
			.get('/api/courses')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if(err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body).to.have.lengthOf(1);
				expect(res.body[0].name).to.equal(courseName);
				done();
			});
	});

	it('should get a specific Course', (done) => {
		req(app)
			.get(`/api/courses/${courseId}`)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if(err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body.name).to.equal(courseName);
				done();
			});
	});

	it('should throw 404 if a specific Course is Not Found', (done) => {
		req(app)
			.get('/api/courses/ff69418b544d7ff0ff78e2ff')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if(err) return done(err);
				expect(res.status).to.equal(404);
				done();
			});
	});	

	it('should update a specific Course', (done) => {
		const updatedName = 'The ins and outs of madness';
		req(app)
			.put(`/api/courses/${courseId}`)
			.set('Accept', 'application/json')
			.send({ name: updatedName })
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if(err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body.name).to.equal(updatedName);
				done();
			});
	});

	it('should delete a specific Course', (done) => {
		req(app)
			.delete(`/api/courses/${courseId}`)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if(err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body._id).to.equal(courseId);
				done();
			});
	});
});
