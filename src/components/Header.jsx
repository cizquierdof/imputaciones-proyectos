import React from 'react'
import '../css/Header.css'

const Header = props => {
    return (
        <h1 className="ui header">
        <i aria-hidden="true" className="list icon"></i>
            {props.children}
        </h1>
    )
}

export default Header
