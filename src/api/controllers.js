const isCourseValid = require('./validation');

// temp data. To be replaced with MongoDB
const courses = [
	{id: 1, name: 'Learning JS'},
	{id: 2, name: 'Intro to Python'},
	{id: 3, name: 'Astrophysics'},
	{id: 4, name: 'The science of love'},
	{id: 5, name: 'Pet care'},
	{id: 6, name: 'Why indoor cats may be happier'},
	{id: 7, name: 'Into the multiverse'}
];

const welcome = (req, res) => res.send({message: 'Welcome!'});

// Get all courses as a list
const getAllCourses = (req, res) => 
	courses
		? res.send(courses)
		: res.status(404).send({message: 'No courses available'});

// Get one specific course by id
const getSpecificCourse = (req, res) => {
	const course = courses.find(c => c.id === Number(req.params.id));	
	course
		? res.send(course)
		: res.status(404).send({message: 'Course not found'});
};

// Post a new course
const postCourse = (req, res) => {
	const course = {
		id: courses.length + 1,
		name: req.body.name
	};
	if (isCourseValid(req, res)) {
		courses.push(course);
		res.status(201).send(course);
	}
};

// Update a course
const updateCourse = (req, res) => {
	const course = courses.find(c => c.id === Number(req.params.id));
	if (course && isCourseValid(req, res)) {
		course.name = req.body.name;
		res.send(course);
	}
	else res.status(404).send({message: 'Course not found'});
};

// Delete a course
const deleteCourse = (req, res) => {
	const course = courses.find(c => c.id === Number(req.params.id));	
	if(course) res.send(courses.splice(courses.indexOf(course), 1)[0]);
	else res.status(404).send({message: 'Course not found'});
};

module.exports = {
	welcome,
	getAllCourses,
	getSpecificCourse,
	postCourse,
	updateCourse,
	deleteCourse
};
