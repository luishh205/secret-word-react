//css
import './App.css';
//react
import {useCallback, useEffect,useState } from 'react';
//data
import { wordsList } from './Data/words.js';
//components
import StartScreen from './Components/StartScreen';
import Game from './Components/Game.js';
import GameOver from './Components/GameOver.js';

const stages = [
  { id:1, name: "start" },
  { id:2, name: "game"  },
  { id:3, name: "end" } 
];

const qusesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setpickedWord] = useState("");
  const [pickedCategory, setpickedCategory] = useState("");
  const [letters, setletters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(qusesQty);
  const [score,setScore] = useState(0);

  const pickWordAndCategory = useCallback(()=>{
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word = words[category][Math.floor(Math.random() * words[category].length)];
    
    return {word, category};
  },[words]);

  const startGame = useCallback(() => {

    clearLetterStates();

    const { word, category } = pickWordAndCategory();

    let worLetters = word.split("");

    worLetters = worLetters.map((l) => l.toLowerCase());

    setpickedWord(word);
    setpickedCategory(category);
    setletters(worLetters);

    setGameStage(stages[1].name);
  },[pickWordAndCategory])

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()
      
    if(
      guessedLetters.includes(normalizedLetter) || 
      wrongLetters.includes(normalizedLetter)
      )
      {
      return;
    }

    if(letters.includes(normalizedLetter)){
        setGuessedLetters((actualGessedLetters)=>[
          ...actualGessedLetters,
          normalizedLetter,
        ]);
    }else{
        setWrongLetters((actualWrongLetters)=>[
          ...actualWrongLetters,
          normalizedLetter,
        ]);
        setGuesses((actualGusses) => actualGusses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }
  
  useEffect(() => {
      if(guesses <= 0){
        clearLetterStates();
        setGameStage(stages[2].name);
      }
  },[guesses])

  useEffect(()=>{
  const uniqueLetters = [...new Set(letters)];
  
  if(guessedLetters.length === uniqueLetters.length){

    setScore((actualScore)=> actualScore += 100);

    startGame();
  }

  }, [guessedLetters])

  const retry = () => {
    setScore(0);
    setGuesses(qusesQty);

    setGameStage(stages[0].name)
  }
    return (
      <div className="App">
        {gameStage === "start" && <StartScreen startGame={startGame} />}
        {gameStage === "game" && <Game verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
        />}
        {gameStage === "end" && <GameOver retry={retry} score={score}/>}
      </div>
    );
}

export default App;
