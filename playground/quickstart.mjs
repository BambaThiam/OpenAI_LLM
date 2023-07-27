import { OpenAI } from 'langchain/llms/openai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { PromptTemplate } from 'langchain/prompts'
import { ConversationChain, LLMChain } from 'langchain/chains'
import { initializeAgentExecutorWithOptions } from 'langchain/agents'
import { SerpAPI } from 'langchain/tools'
import { Calculator } from 'langchain/tools/calculator'
import { BufferMemory } from 'langchain/memory'
// import { ConversationChain } from 'langchain/chains'
import { PlanAndExecuteAgentExecutor } from 'langchain/experimental/plan_and_execute'
import { exec } from 'child_process'

// export => MAC OS
// set => WINDOWS

//console.log(process.env.SUPABASE_PRIVATE8key)
// export OPENAI_API_KEY=<>
// export SERPAPI_API_KEY=<>
// Replace with your API keys!

// to run, go to terminal and enter: cd playground
// then enter: node quickstart.mjs
// console.log('Welcome to the LangChain Quickstart Module!')

// 1. Prompt Templates ************

//google: "who is Bamba"
//chatgpt: "who is Bamba" => prompt template => You are a helpful assistant, speaking with a user. They said {who is Bamba}. Be as helpful as possible! And nice!

const template =
  'You are a director of social media with 30years of experience. Please give me some ideas for content I should write about regarding {topic}? The content is for {socialplatform}. Translate to {language}.'
const prompt = new PromptTemplate({
  template: template,
  inputVariables: ['topic', 'socialplatform', 'language'],
})

const formattedPromptTemplate = await prompt.format({
  topic: 'artificial intelligence',
  socialplatform: 'twitter',
  language: 'french',
})

//console.log({ formattedPromptTemplate })

// 2. LLM CHAIN ************
// temperature:0 => pas créatif, 1 trés créatif
const model = new OpenAI({ temperature: 0.9 })
const chain = new LLMChain({ prompt: prompt, llm: model })
// const resChain = await chain.call({
//   topic: 'artificial intelligence',
//   socialplatform: 'twitter',
//   language: 'french',
// })

//console.log(resChain)

// Agent
//Chain = pre-defined --- 1. research => API call. 2. summarize research
// Agent = task + tools + template => it figures out what to do
// models : https://platform.openai.com/docs/models
const agentModel = new OpenAI({
  temperature: 0,
  modelName: 'text-davinci-003',
})

const tools = [
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    location: 'Dallas,Texas,United States',
    hl: 'en',
    gl: 'us',
  }),
  new Calculator(),
]

// const executor = await initializeAgentExecutorWithOptions(tools, agentModel, {
//   agentType: 'zero-shot-react-description',
//   verbose: true,
//   maxIterations: 5,
// })

// const input = 'What is langchain?'

// const result = await executor.call({
//   input: input,
// })

// console.log(result)

/**Plan and Action Agent */

const chatModel = new ChatOpenAI({
  temperature: 0,
  modelName: 'gpt-3.5-turbo',
  verbose: true,
})

const executor = PlanAndExecuteAgentExecutor.fromLLMAndTools({
  llm: chatModel,
  tools: tools,
})

// // Nous ne lui disons pas comment le faire, nous lui disons quoi faire.
// const result = await executor.call({
//   // input: "Qui est l'actuel président du Sénégal?",
//   input: "Peux-tu me fournir l'IFC d'une maquette 3D d'un hopital?",
// })

// console.log(result)

// MEMORY ***********

// Retient en mémoire, hyper puissant pour des conversations longue par exemple
const llm = new OpenAI({})
const memory = new BufferMemory()
const conversationChain = new ConversationChain({ llm: llm, memory: memory })

const input1 = 'Hey, my name is Bamba ?'
const res1 = await conversationChain.call({
  input: input1,
})

console.log(input1)
console.log(res1)

const input2 = "What's my name?"
const res2 = await conversationChain.call({
  input: input2,
})

console.log(input2)
console.log(res2)

// Hey, my name is Bamba ?
// {
//   response: " Hi Bamba! My name is AI. It's nice to meet you! How can I help you today?"
// }

// What's my name?
// { response: ' Your name is Bamba.' }
