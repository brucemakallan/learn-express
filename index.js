if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const port = process.env.PORT || 3000;
const app = require('./api/routes');
app.listen(port, () => console.log(`Listening on port ${port} ...`));
