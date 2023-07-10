import React,  { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Lodash from "lodash"


const LoadGame = ({game, cards, over, round, selectCard, setCards,  setGame, setOver, fetchPoke, setRound}) => {

  return (
    game ? 
    <LoadCard cards={cards} over={over} round={round} selectCard={selectCard} setRound={setRound} setCards={setCards} setGame={setGame}/> 
    : <Menu setGame={setGame}  setOver={setOver} fetchPoke={fetchPoke}/>
  )
}

const Menu = ({setGame, setOver, fetchPoke}) => {
  return <div className="menu">
    <h1 className='menu-header'>Instructions:</h1>
    <p className='menu-text'>
      There will be 10 random Pokemon that will display on your screen.<br/>
      The goal is to pick ALL Pokemons without picking them twice.<br/>
      Every time you click a Pokemon, their positions will be shuffled.
    </p>
    <button className="btn-game" type="button"
    onClick={()=>{
      setGame(true)
      setOver(false)
      fetchPoke()
    }}>START GAME</button>
    </div>
}

const LoadCard = ({over, round, cards, selectCard, setRound, setCards, setGame}) => {
 if (over === false) {
 return (
  <>
  <div className="round-container">
    <h1 className="round-text">Round {round}</h1>
  </div>
  {
    cards ? 
      <div className="LoadGame">
        {Lodash.shuffle(cards).map(pokemon =>
          <div className='pokecards' key={pokemon[0]}><img src={pokemon[2]} id={pokemon[0]} onClick={selectCard} alt={"picture of " + pokemon[1]}/>{pokemon[1]}</div>
        )}
      </div> : <p>Loading...</p>
  }
  </>
  )
 } else {
  return (
    <div className="menu">
      <h1 className="menu-header">Game Over!</h1>
      <h2 className="menu-text">Wanna try again?</h2>
      <button className="btn-game" type="button" onClick={()=>{
        setGame(false)
        setRound(1)
        setCards(null)
        }}>RESTART</button>
    </div>
  )
 }
}

const App = () => {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [cardTrack, setCardTrack] = useState([])
  const [cards, setCards] = useState(null)
  const [game, setGame] = useState(false)
  const [over, setOver] = useState(false)
  const [round, setRound] = useState(1)

  useEffect(() => {}, [score, cardTrack, bestScore, game, over, round])

  // fetch poke-data during mount stage
  const fetchPoke = () => {

    let randomArray = [];
    while(randomArray.length <= 10) {
      let random = Math.round(Math.random() * 100) + 1;
      if(randomArray.indexOf(random) === -1) {
        randomArray.push(random);
      }
    }

    const fetchData = async (url) => {
      try {
        const response = await fetch(url)
        const data =  await response.json()
        return [data.id, data.name.toUpperCase(), data.sprites.other.home.front_default]
      } catch (err) {
        console.log("Error", err)
      }
    }

    const pokeList = async () => {
      let arr = []

      for (let i = 0; i <= 9; i++) {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + randomArray[i]
        arr.push(await fetchData(url))
      }
      return arr
    }

    (async () => {
      const list = await pokeList()
      setCards(list)
    })();
  
  }

  const selectCard = (event) => {
    const check = event.target.id
    const result = cardTrack.filter(item => item === check)

    if (result.length >= 1 ) { 
      setOver(true)
      setScore(0)
      setCardTrack([])
    } else { 
      setScore(score + 1)
      if ((score + 1) >= bestScore) {
        setBestScore(score + 1)
      }
      if  ((score + 1)  === ( 10 * round)) {
        setCardTrack([])
        fetchPoke()
        setRound(round + 1)
      } else {
        setCardTrack(cardTrack.concat(check))
      }
    }
  }


  return (
    <>
      <Header score={score} bestScore={bestScore}/>
      <div className="App">
        {/* <LoadGame round={round} game={game} over={over} cards={cards} setGame={setGame} setOver={setOver} setCards={setCards} setRound={setRound}  selectCard={selectCard} fetchPoke={fetchPoke}/> */}
        {game ?  <LoadCard cards={cards} over={over} round={round} selectCard={selectCard} setRound={setRound} setCards={setCards} setGame={setGame}/> : <Menu setGame={setGame}  setOver={setOver} fetchPoke={fetchPoke}/>}
      </div>
      <Footer />
    </>
  );
}


export default App;
