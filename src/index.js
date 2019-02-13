import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.load();
}
import app from './api';
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
