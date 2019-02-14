if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const app = require('./api');
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
