import React,  { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Lodash from "lodash"

const App = () => {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [cardTrack, setCardTrack] = useState([])
  const [cards, setCards] = useState([])

  // fetch poke-data during mount stage
  useEffect(() => {
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

      for (let i = 199; i <= 208; i++) {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + i
        arr.push(await fetchData(url))
      }
      return arr
    }

    (async () => {
      const list = await pokeList()
      setCards(list)
    })();
  }, [])

  // empty callback to re-render when score and cardTrack updates
  useEffect(() => {}, [score, cardTrack, bestScore])

  const selectCard = (event) => {
    const check = event.target.id
    const result = cardTrack.filter(item => item === check)

    if (result.length >= 1 ) { 
      setScore(0)
      setCardTrack([])
    } else { 
      setScore(score + 1)
      if ((score + 1) >= bestScore) {
         setBestScore(score + 1)
      }
      setCardTrack(cardTrack.concat(check))
    }
  }

  return (
    <>
      <Header score={score} bestScore={bestScore}/>
      <div className="App">
        {Lodash.shuffle(cards).map(pokemon =>
          <div className='pokecards' key={pokemon[0]}><img src={pokemon[2]} id={pokemon[0]} onClick={selectCard} alt={"picture of " + pokemon[1]}/>{pokemon[1]}</div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
