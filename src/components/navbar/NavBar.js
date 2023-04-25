import React, { useState } from 'react';
import logoTrans from '../../assets/logoTrans.png';
import iconSearch from '../../assets/lupa.png';
import { useHistory } from "react-router-dom";
import './NavBar.css'

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const history = useHistory()

    const handleServicosClick = () => {
        setShowMenu(!showMenu);
    };

    const handleSearchClick = () => {
        setShowSearch(!showSearch);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Do something with the search query
    };

    return (
        <nav className="navbar">
            <div className="logoHome" onClick={() => history.push('/home')}>
                <a href="#"><img src={logoTrans} alt="logoTrans" className='logoTrans' /></a>
            </div>
            <ul class="nav-links">
                <li><a href="#" onClick={() => history.push('/home')}>Início</a></li>
                <li><a href="#">Quem Somos</a></li>
                <li>
                    <a href="#" onClick={handleServicosClick}>Serviços +</a>
                    {showMenu && (
                        <div className="servicos-menu">
                            <ul>
                                <li onClick={() => history.push('/paymentScreen')}>Contratar Transportadora</li>
                                <li onClick={() => history.push('/trackScreen')}>Rastrear Encomenda</li>
                            </ul>
                        </div>
                    )}
                </li>
                <li><a href="#">Atendimento Online</a></li>
                <li><a href="#">Minha Conta</a></li>
            </ul>
            <div className="search-icon">
                <a href="#" onClick={handleSearchClick}><img src={iconSearch} alt="iconSearch" /></a>
                {showSearch && (
                    <div className="search-bar">
                        <form onSubmit={handleSearchSubmit}>
                            <input type="text" placeholder="Search..." />
                            <button type="submit">Search</button>
                        </form>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;