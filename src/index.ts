import { GoogleGenAI } from '@google/genai';
import express from 'express';
import 'dotenv/config';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const contextPath = path.join(process.cwd(), 'src', 'data.json');
console.log(contextPath);

function loadContext() {
  if (fs.existsSync(contextPath)) {
    const raw = fs.readFileSync(contextPath, 'utf-8');
    return JSON.parse(raw);
  }
  return {};
}

interface Message {
  role: 'user' | 'AI';
  content: string;
}

interface Context {
  [userId: string]: Message[];
}

function saveContext(context: Context): void {
  fs.writeFileSync(contextPath, JSON.stringify(context, null, 2), 'utf-8');
}

app.post('/chat', async (req, res) => {
  try {
    const data = await req.body;
    console.log(data);
    const userId = data.userId;
    const message = data.message;
    if (typeof userId !== 'string' || typeof message !== 'string' || !userId || !message) {
      return res.status(400).json({ error: 'Invalid input. userId and message are required.' });
    }

    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: 'Give short answer' + message,
    });

    if (!result.text) {
      throw new Error('No response from AI model');
    }
    const context = loadContext();
    if (!context[userId]) {
      context[userId] = [];
    }
    context[userId].push({ role: 'user', content: message });
    context[userId].push({ role: 'AI', content: result.text });

    saveContext(context);
    res.status(200);
    res.json({ response: result.text });
  } catch {
    res.status(500);
    res.json({ status: 500, message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`The app started on ${PORT} port`);
});
