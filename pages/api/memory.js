import { OpenAI } from 'langchain'
import { BufferMemory } from 'langchain/memory'
import { ConversationChain, conversationChain } from 'langchain/chains'

let model
let memory
let chain

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { input, firstMsg } = req.body
    if (!input) {
      throw new Error('No input!')
    }

    if (firstMsg) {
      console.log('initializing chain')
      // 3 lignes principales pour lancer langchain
      model = new OpenAI({ modelName: 'gpt-3.5-turbo' })
      //   davinci-002
      memory = new BufferMemory()
      chain = new ConversationChain({ llm: model, memory: memory })
    }

    const response = await chain.call({
      input: input,
    })
    console.log({ response })
    console.log({ input })
    return res.status(200).json({ output: response })
  } else {
    res.status(405).json({ message: 'Only POST is allowed' })
  }
}
