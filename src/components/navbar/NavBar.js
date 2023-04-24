import React, { useState } from 'react';
import logoTrans from '../../assets/logoTrans.png';
import iconSearch from '../../assets/lupa.png';
import { useHistory } from "react-router-dom";
import './NavBar.css'

const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false);

    const history = useHistory()


    const handleServicosClick = () => {
        setShowMenu(!showMenu);
    };

    return (
        <nav className="navbar">
        <div className="logoHome">
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
            <a href="#"><img src={iconSearch} alt="iconSearch" /></a>
        </div>
    </nav>
    );
};

export default Navbar;
