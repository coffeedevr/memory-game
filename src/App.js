import React,  { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Lodash from "lodash"

const App = () => {
  const [score, setScore] = useState(0)
  const [cardTrack, setCardTrack] = useState([])
  const [cards, setCards] = useState([])

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

  useEffect(() => {

  }, [score, cardTrack])

  const selectCard = (event) => {
    const check = event.target.id
    const result = cardTrack.filter(item => item === check)

    console.log(result)

    if (result.length >= 1 ) { 
      setScore(0)
      setCardTrack([])
      console.log('oops')
    } else { 
      setScore(score + 1)
      setCardTrack(cardTrack.concat(check))
      console.log('yey')
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="App">
        {Lodash.shuffle(cards).map(pokemon =>
          <div className='pokecards' key={pokemon[0]}><img src={pokemon[2]} id={pokemon[0]} onClick={selectCard} alt={"picture of " + pokemon[1]}/>{pokemon[1]}</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
