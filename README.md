[![Build Status](https://travis-ci.org/brucemakallan/learn-express.svg?branch=develop)](https://travis-ci.org/brucemakallan/learn-express) [![Coverage Status](https://coveralls.io/repos/github/brucemakallan/learn-express/badge.svg)](https://coveralls.io/github/brucemakallan/learn-express)


# Learn Express

### Live API on Heroku
https://express-101.herokuapp.com 


- Get a Course
```
GET: /api/courses/:id

Sample Response:
{
  "_id": "5c694192544d7aa0ff78e21b",
  "dateCreated": "2019-02-17T11:12:18.407Z",
  "dateUpdated": "2019-02-17T11:12:18.407Z",
  "name": "Metaphysics",
  "__v": 0
}
```
- Post a new Course
```
POST: /api/courses

Payload:
{
  "name": "Getting started with Express APIs"
}
```
- Get all Courses
```
GET: /api/courses
```
- Update a Course
```
PUT: /api/courses/:id

Payload:
{
  "name": "Getting started with Express APIs"
}
```
- Delete a Course
```
DELETE: /api/courses/:id
```


### Setup
- Create `.env` file with the following constants (Do not put their values in quotes)
```
PORT=<PORT>
MONGO_CONNECTION_STRING=<connection string>
```
*RECOMMENDATION*:
Use a Cloud-Hosted MongoDB e.g. From MongoDB Atlas (https://www.mongodb.com/cloud/atlas). This will work on both on localhost and the deployment environment without need to setup the database.

To view and/or directly manipulate documents (entries) in the MongoDB, try MongoDB Compass (https://www.mongodb.com/products/compass)

- Install dependencies `npm i`
- Run the server in development mode `npm run start:dev`
- OR: Run the server in production mode `npm run start`

### Notes

#### Intro and Resources
- Getting started with Express
https://expressjs.com/en/starter/installing.html

- API Reference
https://expressjs.com/en/4x/api.html

- Webpack
https://webpack.js.org/guides/getting-started/

- Node monitor to automatically restart server
```
sudo npm i -g nodemon
```

- EsLint Rules
https://eslint.org/docs/rules/ 
```
npm install -g eslint
```
Add `"eslint src"` to `scripts` in `package.json`
```
"scripts": {
  ...
  "lint": "eslint src"
  ...
}
```
Run: `npm run lint`

- Joi - for input validation
https://www.npmjs.com/package/joi 
```
npm i joi
```

- TDD with supertest and Mocha (plus Chai assertion library)
https://github.com/visionmedia/supertest
https://www.chaijs.com/guide/styles/#expect
```
npm i -D supertest
npm i -D mocha
npm i -D chai
```

Add instanbul's `nyc` to show code test coverage with the help of Travis CI and Coveralls 
https://istanbul.js.org/docs/tutorials/mocha/
https://github.com/istanbuljs/nyc#integrating-with-coveralls
```
npm i -D nyc
npm i -D coveralls

{
  "script": {
     "test": "nyc --reporter=html --reporter=text mocha",
     "coverage": "nyc report --reporter=text-lcov | coveralls"
  }
}
```

#### API
Read parameters in URL

`/api/courses/:year/:month/:day`
e.g.
`http://localhost:3000/api/courses/2019/12/1`

```
req.params.year
req.params.month
```

Read query string variables
`/api/courses/:year/:month/date?sortBy=asc`
```
req.query.sortBy
```

#### MongoDB with Mongoose ODM
https://mongoosejs.com/docs/index.html

##### Queries:
https://mongoosejs.com/docs/queries.html

*LIST OF QUERIES*
- Model.deleteMany()
- Model.deleteOne()
- Model.find()
- Model.findById()
- Model.findByIdAndDelete()
- Model.findByIdAndRemove()
- Model.findByIdAndUpdate()
- Model.findOne()
- Model.findOneAndDelete()
- Model.findOneAndRemove()
- Model.findOneAndUpdate()
- Model.replaceOne()
- Model.updateMany()
- Model.updateOne()

*examples for "`find( ... )`"*

// named john and greater than or equal to 18
```
MyModel.find({ name: 'john', age: { $gte: 18 }});
```

// executes, passing results to callback
```
MyModel.find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});
```

// executes, name LIKE john and only selecting the "name" and "friends" fields
```
MyModel.find({ name: /john/i }, 'name friends', function (err, docs) { })
```

// all fields but "friends"
```
MyModel.find({ name: /john/i }, '-friends', function (err, docs) { })
```

// passing options
```
MyModel.find({ name: /john/i }, null, { skip: 10 })
```

// passing options and executes
```
MyModel.find({ name: /john/i }, null, { skip: 10 }, function (err, docs) {});
```

*OTHER OPTIONS*

`skip:` #
`limit:` #
`sort:`  asc, desc, ascending, descending, 1, -1.

##### Schema Types:
https://mongoosejs.com/docs/schematypes.html
```
var schema = new Schema({
  name:    String,
  binary:  Buffer,
  living:  Boolean,
  updated: { type: Date, default: Date.now },
  age:     { type: Number, min: 18, max: 65 },
  mixed:   Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  decimal: Schema.Types.Decimal128,
  array: [],
  ofString: [String],
  ofNumber: [Number],
  ofDates: [Date],
  ofBuffer: [Buffer],
  ofBoolean: [Boolean],
  ofMixed: [Schema.Types.Mixed],
  ofObjectId: [Schema.Types.ObjectId],
  ofArrays: [[]],
  ofArrayOfNumbers: [[Number]],
  nested: {
    stuff: { type: String, lowercase: true, trim: true }
  },
  map: Map,
  mapOfString: {
    type: Map,
    of: String
  }
})
```

e.g.

```
var Thing = mongoose.model('Thing', schema);

var m = new Thing;
m.name = 'Statue of Liberty';
m.age = 125;
m.updated = new Date;
m.binary = Buffer.alloc(0);
m.living = false;
m.mixed = { any: { thing: 'i want' } };
m.markModified('mixed');
m._someId = new mongoose.Types.ObjectId;
m.array.push(1);
m.ofString.push("strings!");
m.ofNumber.unshift(1,2,3,4);
m.ofDates.addToSet(new Date);
m.ofBuffer.pop();
m.ofMixed = [1, [], 'three', { four: 5 }];
m.nested.stuff = 'good';
m.map = new Map([['key', 'value']]);
m.save(callback);
```
