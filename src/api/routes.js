const express = require('express');
const controllers = require('./controllers');

const app = express();
app.use(express.json());

// welcome
app.get('/', controllers.welcome);
app.get('/api', controllers.welcome);

// courses
app.get('/api/courses', controllers.getAllCourses);
app.get('/api/courses/:id', controllers.getSpecificCourse);
app.post('/api/courses', controllers.postCourse);
app.put('/api/courses/:id', controllers.updateCourse);
app.delete('/api/courses/:id', controllers.deleteCourse);

module.exports = app;
