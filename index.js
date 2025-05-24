const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: "sk-demo1234567890", // Replace with real key if needed
});
const openai = new OpenAIApi(configuration);

app.post("/ask", async (req, res) => {
  const { question, subject } = req.body;
  const prompt = `তুমি একজন অভিজ্ঞ শিক্ষক। একজন HSC/SSC শিক্ষার্থী যদি প্রশ্ন করে "${question}" (${subject}), তাকে সহজ ভাষায় বাংলায় ব্যাখ্যা করে উত্তর দাও।`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const answer = completion.data.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ answer: "AI উত্তর দিতে ব্যর্থ হয়েছে।" });
  }
});

app.listen(port, () => {
  console.log(`Study AI server is running on http://localhost:${port}`);
});
