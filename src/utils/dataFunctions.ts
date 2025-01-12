import OpenAI from 'openai';

const OPENAI_APIKEY = import.meta.env.VITE_OPENAI_APIKEY

// export const fetchChat = async ({persons, chatType = "discussion"} : {persons:Array<string> , topic: string, chatType: string}) => {
export const fetchChat = async ({ content = 'Tell me a joke' }: { content: string }) => {

  // https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety
  const client = new OpenAI({ apiKey: OPENAI_APIKEY, dangerouslyAllowBrowser: true })
  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content },
    ],
    temperature: 0.8,
    max_tokens: 1024,
  });

  // console.log("response", response)
  return response.choices[0]?.message?.content
};

