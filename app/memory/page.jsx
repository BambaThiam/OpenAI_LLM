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

  const handlePromptChange = (e) => {
    setPrompt(e.target.value)
  }

  const handleSubmitPrompt = async () => {
    console.log('Sending', prompt)
  }
  return (
    <>
      <Title headingText={'Memory'} emoji="🧠" />
      <TwoColumnLayout
        leftChildren={
          <>
            <PageHeader
              heading="Je suis doué ai j'ai une bonne mémoire"
              boldText="Essayons si je peux me souvenir de notre meilleur projet et du résultat financier. Je suis capable de récuperer ces informations dans tout contenu dans un document PDF."
              description="Cet outil utilise la mémoire tampon et la chaîne de conversation. "
            />
          </>
        }
        rightChildren={
          <>
            <ResultWithSources messages={[]} pngFile="brain" />
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
