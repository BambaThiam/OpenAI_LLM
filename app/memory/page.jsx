// start here
'use client'
import React, { useState } from 'react'
import PageHeader from '../components/PageHeader'
import PromptBox from '../components/PromptBox'
import Title from '../components/Title'
import TwoColumnLayout from '../components/TwoColumnLayout'
import ResultWithSources from '../components/ResultWithSources'
import '../globals.css'

const Memory = () => {
  const [prompt, setPrompt] = useState('')
  const [error, setError] = useState(null)
  const [messages, setMessages] = useState([
    {
      text: 'Hello! Quel est votre meilleur projet et son résultat financier ?',
      type: 'bot',
    },
  ])

  const [firstMsg, setFirstMsg] = useState(true)

  const handlePromptChange = (e) => {
    setPrompt(e.target.value)
  }

  const handleSubmitPrompt = async () => {
    console.log('Sending', prompt)
    try {
      // update the user message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, type: 'user', sourceDocuments: null },
      ])
      const response = await fetch('api/memory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: prompt, firstMsg: firstMsg }),
      })
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`)
      }

      setPrompt('')
      // So we don't reinitialize the chain
      setFirstMsg(false)
      const searchRes = await response.json()
      // Add the bot message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: searchRes.output.response, type: 'bot', sourceDocuments: null },
      ])
      console.log({ searchRes })
      // Clear any old error messages
      setError('')
    } catch (err) {
      console.error(err)
      setError(err)
    }
  }
  return (
    <>
      <Title headingText={'Memory'} emoji="🧠" />
      <TwoColumnLayout
        leftChildren={
          <>
            <PageHeader
              heading="Je suis doué et j'ai une bonne mémoire"
              boldText="Essayons si je peux me souvenir de notre meilleur projet et du résultat financier. Je suis capable de récuperer ces informations dans tout contenu dans un document PDF."
              description="Cet outil utilise la mémoire tampon et la chaîne de conversation. "
            />
          </>
        }
        rightChildren={
          <>
            <ResultWithSources messages={messages} pngFile="brain" />
            <PromptBox
              prompt={prompt}
              handleSubmit={handleSubmitPrompt}
              error={''}
              handlePromptChange={handlePromptChange}
            />
          </>
        }
      />
    </>
  )
}

export default Memory
