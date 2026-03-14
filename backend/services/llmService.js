const axios = require("axios");

// in-memory cache
const analysisCache = {};

async function analyzeEmotion(text) {

  try {

    // check cache first
    if (analysisCache[text]) {
      console.log("Returning cached analysis");
      return analysisCache[text];
    }

    console.log("Calling Gemini API...");

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
                  Analyze this journal entry.

                  Return JSON only:

                  {
                  "emotion":"ONE word emotion only",
                  "keywords":[],
                  "summary":""
                  }

Journal:
${text}
`
              }
            ]
          }
        ]
      }
    );

    const result =
      response.data.candidates[0].content.parts[0].text;

    // store result in cache
    analysisCache[text] = result;

    return result;

  } catch (error) {

    console.error("Gemini API Error:", error.response?.data || error);
    throw error;

  }

}

module.exports = analyzeEmotion;