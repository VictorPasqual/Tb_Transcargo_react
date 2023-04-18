import React, { useState } from 'react';
import LogoInicio from '../../assets/logo.png';
import Lupa from '../../assets/lupa.png';
import IconProfile from '../../assets/user.png';
import BackIconProfile from '../../assets/Ellipse.png';
import CaminhoesFundo from '../../assets/caminhoesFundo.jpg'
import { useHistory } from 'react-router-dom';
import './Home.css'; // Importe o arquivo de estilo CSS

const HomeScreen = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // Novo estado para controlar o menu de perfil
    const history = useHistory();

    const handleSearchClick = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleProfileClick = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen); // Altera o estado do menu de perfil ao clicar no ícone de perfil
    };

    const handleLogout = () => {
        history.push('/');
        console.log("Usuário deslogado"); // Exemplo de log de deslogamento
    };

    return (
        <div className='container'>       
            <nav className="navbar-container">

                <div className="logo-container">
                    <img src={LogoInicio} alt="Logo da Empresa" />
                </div>


                <div className="navbar-item">
                    <h3 style={{ color: '#fff', fontSize: 26 }}>Caminhões</h3>
                </div>


                <div className="navbar-item">
                    <h3 style={{ color: '#fff', fontSize: 26 }}>Cargas</h3>
                </div>


                <div className="navbar-item">
                    <h3 style={{ color: '#fff', fontSize: 26 }}>Rotas</h3>
                </div>


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


                <div
                    className="profile-container"
                    style={{
                        backgroundImage: `url(${BackIconProfile})`,
                        width: 96,
                        height: 95,
                        top: 14,
                        marginRight: 20,
                    }}
                    onClick={handleProfileClick} // Adiciona o evento de clique para abrir/fechar o menu de perfil
                >
                    <img src={IconProfile} className="profile" alt="Ícone de Perfil" />
                </div>


                {isProfileMenuOpen && (
                    <div className="profile-menu-container">
                        <ul className="profile-menu">
                            <li className="profile-menu-item">Ver Perfil</li>
                            <li className="profile-menu-item" onClick={handleLogout}>Sair</li>
                        </ul>
                    </div>
                )}
            </nav>

            <div> {/* Adicione o conteúdo da página aqui */}</div>
        </div>
    );
};

export default HomeScreen;
