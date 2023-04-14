import React from "react"

const Header = (props) => {
    
    return <div className="header-component">
        <h1 id="header-text">Test Your Memory</h1>
        <p id="header-text-2">Pokemon Edition</p>
        <p id="score-text">Score: {props.score} | Best Score: {props.bestScore}</p>
    </div>
}

export default Header