import React from 'react'

const Emoji = ({ color }) => {
  return (
    <div className={`bg-${color}-500 text-center`}>
      {/* <p>La couleur est {color}</p> */}
      {/* Ternary */}
      {color === 'blue' ? (
        <p>La variable color est {color}</p>
      ) : (
        <p>"Ce n'est pa du bleu</p>
      )}
    </div>
  )
}

export default Emoji
