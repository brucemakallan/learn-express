const isCourseValid = require('./validation');
const Course = require('./models');

const WELCOME_MESSAGE = 'Welcome!';
const NOT_FOUND_MESSAGE = 'Course not found';

const welcome = (req, res) => res.send({message: WELCOME_MESSAGE});

const getAllCourses = (req, res) =>
	Course.find(
		{},
		(err, courses) => err ? res.status(500).send({message: err.message}) : res.status(200).send(courses)
	);

const getSpecificCourse = (req, res) =>
	Course.findById(
		req.params.id,
		(err, course) => {
			if(err) res.status(500).send({message: err.message});
			else course ? res.status(200).send(course) : res.status(404).send({message: NOT_FOUND_MESSAGE});
		}
	);

const postCourse = (req, res) => {
	if (isCourseValid(req, res)) {
		const course = new Course;
		course.name = req.body.name;
		course.save((err) => err ? res.status(500).send({message: err.message}) : res.status(201).send(course));
	}
};

const updateCourse = (req, res) => {
	if (isCourseValid(req, res)) {
		Course.findOneAndUpdate(
			{_id: req.params.id},
			req.body,
			{new: true},
			(err, course) => {
				if(err) res.status(500).send({message: err.message});
				else course ? res.status(200).send(course) : res.status(404).send({message: NOT_FOUND_MESSAGE});
			}
		);
	}
};

const deleteCourse = (req, res) =>
	Course.findByIdAndDelete(
		req.params.id,
		(err, course) => {
			if(err) res.status(500).send({message: err.message});
			else course ? res.status(200).send(course) : res.status(404).send({message: NOT_FOUND_MESSAGE});
		}
	);

module.exports = {
	welcome,
	getAllCourses,
	getSpecificCourse,
	postCourse,
	updateCourse,
	deleteCourse
};
