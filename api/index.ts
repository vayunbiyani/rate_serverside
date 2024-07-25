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
export default app;
