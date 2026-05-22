import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  
  // Increase payload limit to support base64 image uploads
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Redirect clean paths like /pitchdeck to /?screen=pitchdeck for reliable deep-linking
  app.use((req, res, next) => {
    const cleanPath = req.path.replace(/^\//, '');
    const validScreens = [
      'landing', 'onboarding', 'pitchdeck', 'dashboard', 'transcripts', 
      'pcontext', 'context-chat', 'settings', 'discover', 'scorecard', 
      'playbook', 'blueprint', 'integrations', 'export', 'team', 'notifications'
    ];
    if (validScreens.includes(cleanPath)) {
      return res.redirect(`/?screen=${cleanPath}`);
    }
    next();
  });

  // Shared Gemini client setup using recommended headers
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Main Gemini endpoint
  app.post('/api/gemini/generate', async (req, res) => {
    try {
      const {
        prompt,
        image,
        systemInstruction,
        temperature,
        topK,
        topP,
        model,
        responseType,
        jsonSchema,
        searchGrounding,
      } = req.body;

      if (!prompt && !image) {
        return res.status(400).json({ success: false, error: 'Prompt or image is required' });
      }

      const selectedModel = model || 'gemini-3.5-flash';

      // Setup configs
      const config: any = {
        temperature: temperature !== undefined ? parseFloat(temperature) : 0.7,
      };

      if (systemInstruction) {
        config.systemInstruction = systemInstruction;
      }

      if (topK !== undefined) {
        config.topK = parseInt(topK, 10);
      }

      if (topP !== undefined) {
        config.topP = parseFloat(topP);
      }

      // Configure JSON mime type and optionally dynamic schema
      if (responseType === 'json') {
        config.responseMimeType = 'application/json';
        if (jsonSchema && Object.keys(jsonSchema).length > 0) {
          config.responseSchema = jsonSchema;
        }
      }

      // Configure search grounding
      if (searchGrounding) {
        config.tools = [{ googleSearch: {} }];
      }

      // Prepare multi-modal content parts
      let contentsPayload: any = prompt;

      if (image && image.data) {
        const base64Data = image.data.includes('base64,') 
          ? image.data.split('base64,')[1] 
          : image.data;
          
        const imagePart = {
          inlineData: {
            mimeType: image.mimeType || 'image/jpeg',
            data: base64Data,
          },
        };

        const textPart = {
          text: prompt || 'Analyze this image.',
        };

        contentsPayload = { parts: [imagePart, textPart] };
      }

      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: contentsPayload,
        config,
      });

      // Recover citations and sources from search grounding metadata
      const groundingMetadata = response.candidates?.[0]?.groundingMetadata || null;

      res.json({
        success: true,
        text: response.text,
        groundingMetadata,
      });
    } catch (error: any) {
      console.error('Gemini error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'An error occurred during content generation',
      });
    }
  });

  // Support custom /api/openai route for the migrated Groundwork applet
  app.post('/api/openai', async (req, res) => {
    try {
      const { messages, response_format } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'messages array is required' });
      }

      const openaiKey = process.env.OPENAI_API_KEY;

      if (openaiKey) {
        // Direct request to native OpenAI API using the company-provided key
        try {
          const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${openaiKey}`
            },
            body: JSON.stringify({
              model: "gpt-4o", // High-performing GPT model perfect for product specs discovery
              messages,
              ...(response_format ? { response_format } : {})
            })
          });

          if (!response.ok) {
            const errData: any = await response.json().catch(() => ({}));
            throw new Error(errData?.error?.message || `OpenAI status code: ${response.status}`);
          }

          const data = await response.json();
          return res.json(data);
        } catch (fetchErr: any) {
          console.error('Direct OpenAI fetch error:', fetchErr);
          return res.status(502).json({
            error: {
              message: `Failed to connect to OpenAI endpoint: ${fetchErr.message}`
            }
          });
        }
      }

      // Otherwise, we translate the incoming messages to a format suitable for generateContent
      // Filter out system prompts to pass as systemInstruction
      let systemInstruction = "";
      const conversations: string[] = [];

      for (const msg of messages) {
        if (msg.role === 'system') {
          systemInstruction = msg.content;
        } else {
          conversations.push(`${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`);
        }
      }

      const promptText = conversations.join('\n\n') + '\n\nAssistant:';

      const config: any = {};
      if (systemInstruction) {
        config.systemInstruction = systemInstruction;
      }

      if (response_format?.type === 'json_object') {
        config.responseMimeType = 'application/json';
      }

      // Call Gemini 3.5 Flash server-side with optimal configuration
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: promptText,
        config,
      });

      const replyText = response.text || '';

      res.json({
        choices: [
          {
            message: {
              role: 'assistant',
              content: replyText,
            },
            finish_reason: 'stop',
          },
        ],
      });
    } catch (error: any) {
      console.error('OpenAI translation layer error:', error);
      res.status(500).json({
        error: {
          message: error.message || 'An error occurred during Gemini translation',
        },
      });
    }
  });

  // Serve static assets/Vite router in production or pass to Vite dev middleware in development
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server launched successfully at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal dev server crash:', err);
  process.exit(1);
});
