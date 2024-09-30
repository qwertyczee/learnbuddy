const { OpenAI } = require('openai');
require('dotenv').config();

const puppeteer = require('puppeteer');
const axios = require('axios');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatbot = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [{ role: "user", content: message }],
      max_tokens: 150,
    });

    const botReply = response.choices[0].message.content.trim();

    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const processVideo = async (req, res) => {
  try {
    const { videoUrl } = req.body;

    if (!videoUrl) {
      return res.status(400).send('Video URL is required.');
    }

    const WEBSITE_URL = "https://notegpt.io/youtube-transcript-generator";
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const context = browser.defaultBrowserContext();
    await context.overridePermissions(WEBSITE_URL, [
      "clipboard-read",
      "clipboard-write",
      "clipboard-sanitized-write",
    ]);

    await page.goto(WEBSITE_URL);
    await page.type('input[type="text"]', videoUrl);
    console.log('1');
    await page.click('button.el-button--success');
    console.log('2');
    await page.waitForSelector('i.el-icon-copy-document');
    console.log('3');
    await page.click('i.el-icon-copy-document');
    console.log('4');

    const transcript = await page.evaluate(() => {
      return navigator.clipboard.readText();
    });
    console.log('5');

    await browser.close();
    

    const cleanedTranscriptPart1 = transcript.replace(/\r?\n\r?\n\d{2}:\d{2}:\d{2}\t/g, ' ');
    const cleanedTranscriptPart2 = cleanedTranscriptPart1.replace(/\r?\n\r?\n/g, ''); 
    const finalTranscript = cleanedTranscriptPart2.replace(/\d{2}:\d{2}:\d{2}\t/g, ''); 

    const original = finalTranscript;
    console.log('6');

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Transform the following content into a clear, structured programming explanation with brief, separated code snippets and detailed explanations. Ensure that the result is based strictly on the content provided, and do not include or reference the original content in the final output. Provide an introduction, a brief definition of the concept, short code examples with comments, and a summary.Transcript:    ${finalTranscript}`
        }
      ],
      max_tokens: 3000,
    });
    console.log('7');

    const summary = response.choices[0].message.content.trim();

    res.json({ summary });
  } catch (error) {
    console.error('Error processing video:', error);
    res.status(500).send('Error processing video.');
  }
};

module.exports = { chatbot, processVideo };