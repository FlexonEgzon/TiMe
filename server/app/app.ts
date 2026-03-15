import express from 'express';
import TCRouter from '../routes/card.routes.js';
const app = express();

app.use(express.json());
app.use('/', TCRouter);

app.get('/health', (req, res) => {
  res.send('Hello World!');
  console.log('Time', Date.now());
});

export default app;
