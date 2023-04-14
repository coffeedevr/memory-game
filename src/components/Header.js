import React from "react"

const Header = (props) => {
    
    return <div className="header-component">
        <h1 id="header-text">Memory Game</h1>
        <p id="score-text">Score: {props.score} | Best Score: {props.bestScore}</p>
    </div>
}

export default Header