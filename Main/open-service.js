import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (pass, prompt, res) {
    // Quick validation before running request
    if (pass != process.env.API_SECRET)
    {
        res.status(400).json({
            error: {
                message: "Invalid Passport.",
            }
        });
        return;
    }

    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured.",
            }
        });
        return;
    }

    // run prompt
    try {
        const completion = await openai.createCompletion({
            model: process.env.MODEL_TO_USE,
            prompt: prompt,
            temperature: 0.8,
            max_tokens: 300
        });
        res.status(200).json({ result: completion.data.choices[0].text });
    } catch(error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json({ result: error.response.data });
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500);
        }
  }
}
