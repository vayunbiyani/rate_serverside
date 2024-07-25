import { Router } from 'express';
import { createFeedback, getFeedbackByRoute, updateFeedback, clearFeedback } from '../controllers/feedbackController';
import { uploadAudio, upload } from '../controllers/audioController';

const router = Router();

router.get('/', (_req, res) => {
    res.send('Welcome to the feedback API');
});

router.post('/feedback', createFeedback);
router.post('/feedbacks', getFeedbackByRoute);
router.post('/getFeedback/:id', updateFeedback);
router.delete('/clear-feedback', clearFeedback);
router.post('/upload-audio', upload, uploadAudio);

export default router;
