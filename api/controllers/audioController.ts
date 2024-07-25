import { Request, Response } from 'express';
import multer from 'multer';
import { convertToWav, transcribeAudio } from '../services/audioService';
import Feedback from '../models/Feedback';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage }).single('audio');

export const uploadAudio = async (req: Request, res: Response) => {
  console.log('Uploading audio...');
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  try {
    
    const convertedBuffer = await convertToWav(req.file.buffer);
    const response = await transcribeAudio(convertedBuffer);
    const uuid = uuidv4().replace(/-/g, '');
    console.log(req.body.url);
    const feedback = new Feedback({ 
      text: response.data.text,
      _id: uuid,
      url: req.body.url,
    });
    await feedback.save();
    console.log('Feedback saved successfully.');
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'An error occurred while transcribing audio.' });
  }
};
