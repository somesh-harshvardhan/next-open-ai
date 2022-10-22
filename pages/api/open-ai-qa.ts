import { NextApiRequest,NextApiResponse } from "next"
import { Configuration,OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey  : process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration);
async function gptResponseFunc(question){
  return await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"Unknown\".\n\nQ: What is human life expectancy in the United States?\nA: Human life expectancy in the United States is 78 years.\n\nQ: Who was president of the United States in 1955?\nA: Dwight D. Eisenhower was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: Where were the 1992 Olympics held?\nA: The 1992 Olympics were held in Barcelona, Spain.\n\nQ: How many squigs are in a bonk?\nA: Unknown\n\nQ:${question}?\nA:`,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
      })
}

export default async function handler(req : NextApiRequest,res : NextApiResponse){
    const {method,body} = req;
    switch(method){
        case "POST" : 
        const {question}=body;
        const gptResponse = await gptResponseFunc(question);
        res.status(200).json({answer : `${gptResponse.data.choices[0].text}`});
        break;
        default : 
        res.status(409).json({message : "Could not process request"})
    }
    
}