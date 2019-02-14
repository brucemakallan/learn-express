const Joi = require('joi');

const courseSchema = Joi.object().keys({
	name: Joi.string().min(3).max(40).required()
});

const isCourseValid = (req, res) => {
	const { error } = Joi.validate(req.body, courseSchema);
	if(error) {
		res.status(400).send({message: error.details[0].message});
		return false;
	}
	return true;
};

module.exports = isCourseValid;
