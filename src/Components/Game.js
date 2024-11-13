import React from 'react'
import "./Game.css"

const Game = ({verifyLetter}) => {
  return (
   <div className="game">
      <p className="points">
        <span>Pontuação: 000</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>Dica...</span>
      </h3>
      <p>Você ainda tem xx tentativas(s).</p>
      <div className="wordContainer">
        <span className="letter"></span>
        <span className="blankSquare">a</span>
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar letra da palavra:</p>
        <form>
          <input type="text" name="letter" maxLength="1" required />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        <span>a,b,s</span>
      </div>
   </div>
  )
}

export default Game