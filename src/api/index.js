import express from 'express';

const app = express();
app.get('/', (req, res) => res.send('Welcome! Learning CRUD in Express API'));

export default app;
