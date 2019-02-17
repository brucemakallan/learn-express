const mongoose = require('mongoose');

// Connect to the remote database
mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true });
var db = mongoose.connection;
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
