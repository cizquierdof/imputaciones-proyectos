import React from 'react'
import config from '../config/config'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'

const Navbar = () => {

    const Brand = () => {
        return (
            <Link to='/' className='brand'>
                {config.BRAND}
            </Link>
        )
    }

    const Menu = () => {

        return (
            <div className='ui two item menu'>
                <Link to='/projects' className='ui basic purple button'>Proyectos</Link>
                <Link to='/clients' className='ui basic green button'>Clientes</Link>
            </div>
        )
    }

    return (
        <div className='navbar'>
            <Brand />
            <Menu />
        </div>
    )
}
export default Navbar
