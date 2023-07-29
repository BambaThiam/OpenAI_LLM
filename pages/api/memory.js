import { OpenAI } from 'langchain'
import { BufferMemory } from 'langchain/memory'
import { conversationChain } from 'langchain/chains'

let model
let memory
let chain

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { input, firstMsg } = req.body
    if (!input) {
      throw new Error('No input!')
    }
    console.log({ input })
    return res.status(200).json({ output: 'hello' })
  } else {
    res.status(405).json({ message: 'Only POST is allowed' })
  }
}
