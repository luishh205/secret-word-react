//css
import './App.css';
//react
import { useCallback,useEffect,useState } from 'react';
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

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setpickedWord] = useState("");
  const [pickedCategory, setpickedCategory] = useState("");
  const [letters, setletters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score,setScore] = useState(0);

  const pickWordAndCategory = ()=>{
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word = words[category][Math.floor(Math.random() * words[category].length)];
    
    //console.log(category);
    //console.log(word);

    return {word, category};
  }

  const startGame = () => {

    const { word, category } = pickWordAndCategory();

    let worLetters = word.split("");

    worLetters = worLetters.map((l) => l.toLowerCase());

    setpickedWord(word);
    setpickedCategory(category);
    setletters(worLetters);

    //console.log(worLetters);
    setGameStage(stages[1].name);
  }

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()
      
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }

    if(letters.includes(normalizedLetter)){
        setGuessedLetters((actualGessedLetters)=>[
          ...actualGessedLetters,
          normalizedLetter,
        ]);
    }else{
        setGuessedLetters((actualWrongLetters)=>[
          ...actualWrongLetters,
          normalizedLetter,
        ]);
        setGuesses((actualGusses) => actualGusses - 1);
    }
  };
  
  const retry = () => {
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
        {gameStage === "end" && <GameOver retry={retry}/>}
      </div>
    );
}

export default App;
