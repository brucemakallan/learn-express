const mongoose = require('mongoose');

// Connect to the database
const configEnvironment = require(`../../config/${process.env.NODE_ENV}`);
let connectionUrl = configEnvironment.db;
mongoose.connect(connectionUrl, { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to Database!'));

const Schema = mongoose.Schema;
const CourseSchema = new Schema({
	name: {type: String, required: true},
	dateCreated: {type: Date, default: Date.now},
	dateUpdated: {type: Date, default: Date.now}
});
const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
