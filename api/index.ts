import express from 'express';
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
import cors from 'cors';
import dotenv from 'dotenv';
import feedbackRoutes from './routes';
import corsMiddleware from './middlewares/cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(corsMiddleware);
app.use(express.json());
app.use('/api', feedbackRoutes);

const PORT = process.env.PORT || 3005;

mongoose.connect(`${process.env.MONGODB_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.error(err));
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}



const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}

module.exports = allowCors(handler)

export default app;
