# Learn Express

### Notes

#### Intro and Resources
- Getting started with Express
https://expressjs.com/en/starter/installing.html

- API Reference
https://expressjs.com/en/4x/api.html

- Webpack
https://webpack.js.org/guides/getting-started/

- Node monitor to automatically restart server
`sudo npm i -g nodemon`

- EsLint Rules
https://eslint.org/docs/rules/ 
`npm install -g eslint`
`eslint src`

- Joi - for input validation
https://www.npmjs.com/package/joi 
`npm i joi`

#### API
Read parameters in URL

`/api/courses/:year/:month/:day`
e.g. `http://localhost:3000/api/courses/2019/12/1`
```
req.params.year
req.params.month
```

Read query string variables
`/api/courses/:year/:month/date?sortBy=asc`
```
req.query.sortBy
```
