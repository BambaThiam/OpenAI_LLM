'use client'
import React, { useState } from 'react'
import Emoji from '../components/Emoji'

const NextJSTutorial = () => {
  const firstName = 'Bamba'
  // const lastName = 'THIAM'
  const [lastName, setLastName] = useState('')

  const handleSubmit = async () => {
    //console.log('Hello World')
    const response = await fetch('api/next', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: 'Some Message', lastName: lastName }),
    })
    //console.log(response)

    const responseJson = await response.json()
    console.log(responseJson)
  }
  return (
    <div>
      <p>C'est là où tout se passe !</p>
      <p>TalWind CSS is awesome !</p>
      <p className="text-red-500">{firstName}</p>
      {/* STATE */}
      <div className="flex flex-col space-y-4">
        <div>
          <p>My last name is: {lastName}</p>
          <input
            type="text"
            className="outline w-32 rounded-md"
            onChange={(e) => {
              setLastName(e.target.value)
            }}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      {/* EMOJI */}
      <Emoji color="blue" />
    </div>
  )
}

export default NextJSTutorial
