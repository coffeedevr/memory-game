import React from "react"
import GithubLogo from '../assets/githublogo.png'

function Footer () {
    const footerText = '© ' + new Date().getFullYear() + ' coffeedevr | '

    return <div className="footer-component">
        <p id="footer-text">{footerText}</p><a href=""><img id="footer-logo" src={GithubLogo} alt="github logo"/></a>
    </div>
}

export default Footer