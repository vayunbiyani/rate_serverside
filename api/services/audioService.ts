import ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';
import axios from 'axios';
import FormData from 'form-data';

export const convertToWav = (buffer: Buffer): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);

    ffmpeg(readable)
      .toFormat('wav')
      .on('error', reject)
      .on('end', () => {
        const convertedBuffer = Buffer.concat(chunks);
        resolve(convertedBuffer);
      })
      .pipe()
      .on('data', (chunk) => {
        chunks.push(chunk);
      });
  });
};

export const transcribeAudio = async (buffer: Buffer) => {
  const formData = new FormData();
  formData.append('file', buffer, { filename: 'audio.wav', contentType: 'audio/wav' });
  formData.append('model', 'whisper-1');

  const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      ...formData.getHeaders(),
    },
  });

  return response;
};
