import React, { useState } from 'react';
import LogoInicio from '../../assets/logo.png';
import Lupa from '../../assets/lupa.png';
import IconProfile from '../../assets/user.png';
import BackIconProfile from '../../assets/Ellipse.png';
import './Inicio.css'; // Importe o arquivo de estilo CSS

const HomeScreen = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSearchClick = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar-container">
                {/* Logo */}
                <div className="logo-container">
                    <img src={LogoInicio} alt="Logo da Empresa" />
                </div>

                {/* Caminhões */}
                <div className="navbar-item">
                    <h3 style={{ color: '#fff' }}>Caminhões</h3>
                </div>

                {/* Cargas */}
                <div className="navbar-item">
                    <h3 style={{ color: '#fff' }}>Cargas</h3>
                </div>

                {/* Rotas */}
                <div className="navbar-item">
                    <h3 style={{ color: '#fff' }}>Rotas</h3>
                </div>

                {/* Lupa de busca */}
                <div className="search-container">
                    {isSearchOpen && (
                        <input type="text" placeholder="Buscar..." />
                    )}
                    <img
                        src={Lupa}
                        alt="Ícone de Lupa de Busca"
                        onClick={handleSearchClick}
                    />
                </div>

                {/* Ícone de perfil */}
                <div className="profile-container"
                    style={{
                        backgroundImage: `url(${BackIconProfile})`,
                        width: 96,
                        height: 95,
                        top: 14,
                        marginRight: 20
                    }}>
                    <img src={IconProfile} className='profile' alt="Ícone de Perfil" />
                </div>
            </nav >

            {/* Conteúdo da página */}
            < div > {/* Adicione o conteúdo da página aqui */}</div >
        </div >
    );
};

export default HomeScreen;
