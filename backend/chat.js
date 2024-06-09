import OpenAI from "openai";
import { OpenAIError } from "openai";


const openai   = new OpenAI({
    apiKey: "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" ,
    baseURL : "https://aiforcause.deepnight.tech/openai/"
});


const gpt = async () => {

    try{

    const userMessage = 'Once upon a time';
    const gptResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      prompt: userMessage,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    const gptMessage = gptResponse;

    console.log('GPT Response:', gptMessage);

  } catch (error) {
    console.error('Error communicating with GPT:', error);
  }

};

gpt().then((res) => console.log(res) )