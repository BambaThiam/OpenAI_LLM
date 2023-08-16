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

// 1. Prompt Templates ************

const template =
  'You are a {profile} who must write a procedure to build {topic} {environment} . Thank you for proposing, in {side}, a procedure for the realization of this tunnel in {language}.'
const prompt = new PromptTemplate({
  template: template,
  inputVariables: ['profile', 'topic', 'environment', 'side', 'language'],
})

const formattedPromptTemplate = await prompt.format({
  profile: 'civil engineer',
  topic: 'an emergency access tunnel',
  environment: 'in a sand field and under the water table',
  side: '300 words',
  language: 'french',
})

// // console.log({ formattedPromptTemplate })

// // // 2. LLM CHAIN ************

const model = new OpenAI({ temperature: 0.9 })
const chain = new LLMChain({ prompt: prompt, llm: model })
// const resChain = await chain.call({
//   profile: 'civil engineer',
//   topic: 'an emergency access tunnel',
//   environment: 'in a sand field and under the water table',
//   side: '1500 words',
//   language: 'french',
// })

// console.log(resChain)

// 2 - Agent  ************
//Chain = pre-defined --- 1. research => API call. 2. summarize research
// Agent = task + tools + template => it figures out what to do
// models : https://platform.openai.com/docs/models
const agentModel = new OpenAI({
  temperature: 0,
  modelName: 'text-davinci-003',
})

const tools = [
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    location: 'Champigny-sur-Marne,Ile-de-France,France',
    hl: 'fr',
    gl: 'fr',
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

// /**Plan and Action Agent */

const chatModel = new ChatOpenAI({
  temperature: 0,
  modelName: 'gpt-3.5-turbo',
  verbose: true,
})

const executor = PlanAndExecuteAgentExecutor.fromLLMAndTools({
  llm: chatModel,
  tools: tools,
})
const result = await executor.call({
  // input
  input:
    "Peux-tu me fournir une procédure de creusement d'un tunnel d'accès secours au tunnel du grand paris?",
})

console.log(result)

// // MEMORY ***********

// // Retient en mémoire, hyper puissant pour des conversations longue par exemple
// const llm = new OpenAI({})
// const memory = new BufferMemory()
// const conversationChain = new ConversationChain({ llm: llm, memory: memory })

// const input1 = 'Hey, my name is Bamba ?'
// const res1 = await conversationChain.call({
//   input: input1,
// })

// console.log(input1)
// console.log(res1)

// const input2 = "What's my name?"
// const res2 = await conversationChain.call({
//   input: input2,
// })

// console.log(input2)
// console.log(res2)

// // Hey, my name is Bamba ?
// // {
// //   response: " Hi Bamba! My name is AI. It's nice to meet you! How can I help you today?"
// // }

// // What's my name?
// // { response: ' Your name is Bamba.' }
