import React from "react"

function Footer () {
    const footerText = '© ' + new Date().getFullYear() + ' coffeedevr | '

    return <div className="footer-component">
        <p id='footer-text'>{footerText}</p>
    </div>
}

export default Footer