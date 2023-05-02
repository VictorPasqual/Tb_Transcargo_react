import React, { useState, useEffect } from 'react';
import logoTrans from '../../assets/logoTrans.png';
import iconSearch from '../../assets/lupa.png';
import jwtDecode from 'jwt-decode';
import { JWT_SECRET } from '../../config/configJwt';
import { useHistory } from "react-router-dom";
import './NavBar.css'

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showMenuMC, setShowMenu2] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [marginLeft, setMarginLeft] = useState('695px');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const history = useHistory()

    // Obter o token JWT do armazenamento local ou de outra fonte
    const token = localStorage.getItem('token');

    // Decodificar o token JWT para obter as informações do usuário
    const decodedToken = jwtDecode(token, JWT_SECRET);

    // Obter o papel do usuário a partir das informações decodificadas do token
    const userRole = decodedToken.role;

    const handleServicosClick = () => {
        setShowMenu(!showMenu);
    };

    const handleServicosClickMC = () => {
        setShowMenu2(!showMenuMC);
    };

    const handleSearchClick = () => {
        if (!showSearch && !isSearchOpen) {
            setShowSearch(!showSearch);
            setMarginLeft('500px');
            setIsSearchOpen(true);
        }
        else {
            setShowSearch(!showSearch);
            setMarginLeft('695px');
            setIsSearchOpen(false);
        }
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
            <ul className="nav-links" style={{ marginLeft }}>
                <li><a href="#" onClick={() => history.push('/home')}>Início</a></li>
                <li><a href="#">Quem Somos</a></li>
                <li>
                    <a href="#" onClick={handleServicosClick}>Serviços +</a>
                    {showMenu && (
                        <div className="servicos-menu">
                            <ul>
                                {userRole !== 'Motorista' &&
                                    <>
                                        <li onClick={() => history.push('/paymentScreen')}>Contratar Transportadora</li>
                                        <li onClick={() => history.push('/trackScreen')}>Rastrear Encomenda</li>
                                    </>
                                }
                                {userRole === 'Motorista' &&
                                    <li>Minhas Cargas</li>
                                }
                            </ul>
                        </div>
                    )}
                </li>
                <li><a href="#">Atendimento Online</a></li>
                <li>
                    <a href="#" onClick={handleServicosClickMC}>Minha Conta</a>
                    {showMenuMC && (
                        <div className="servicos-menu">
                            <ul>
                                <li onClick={() => history.push('/perfil')}>Ver Perfil</li>
                                <li onClick={() => history.goBack}>Sair</li>
                            </ul>
                        </div>
                    )}</li>
            </ul>
            <div className="search-icon">
                <a href="#" onClick={handleSearchClick}><img src={iconSearch} alt="iconSearch" /></a>
                {showSearch && (
                    <div className="search-bar"  >
                        <form onSubmit={handleSearchSubmit} >
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
