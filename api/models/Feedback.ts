import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema({
  _id: { type: String, required: true },
  text: String,
  url: String,
});

const Feedback = model('Feedback', feedbackSchema);

export default Feedback;
