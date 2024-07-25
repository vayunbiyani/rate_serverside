import { Request, Response } from 'express';
import Feedback from '../models/Feedback';

export const createFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getFeedbackByRoute = async (req: Request, res: Response) => {
  try {
    const routeUrl = req.body.routeUrl;
    if (!routeUrl) {
      return res.status(400).json({ message: 'Route URL is required.' });
    }
    const feedbacksForRoute = await Feedback.find({ url: routeUrl });
    if (feedbacksForRoute.length === 0) {
      return res.status(404).json({ message: 'No feedback found for this route.' });
    }
    res.json(feedbacksForRoute);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while fetching feedback.' });
  }
};

export const updateFeedback = async (req: Request, res: Response) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFeedback) return res.status(404).json({ message: 'Feedback not found.' });
    res.json(updatedFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const clearFeedback = async (req: Request, res: Response) => {
  try {
    const result = await Feedback.deleteMany({});
    res.status(200).json({ message: `${result.deletedCount} document(s) deleted.` });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while deleting feedback.' });
  }
};
