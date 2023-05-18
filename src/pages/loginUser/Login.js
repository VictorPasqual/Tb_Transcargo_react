import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import transcargoLogo from '../../assets/transcargoLogo.png'
import iconEmail from '../../assets/logoemail.png'
import iconCadeado from '../../assets/logocadeado.png'
import novoFundo from '../../assets/novoFundo.png'
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import './Login.css';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailIconVisible, setEmailIconVisible] = useState(true);
  const [passwordIconVisible, setPasswordIconVisible] = useState(true);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [adminLoginEmail, setAdminLoginEmail] = useState('');
  const [adminLoginPassword, setAdminLoginPassword] = useState('');

  const history = useHistory();

  const { authUser, authUserAdmin } = useAuth()


  const handleCreateAccount = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const handleCreateAccountSubmit = async (e) => {
    e.preventDefault();

    // Verificar se o perfil selecionado é de administrador
    if (adminLoginEmail && adminLoginPassword) {
      console.log(adminLoginEmail, adminLoginPassword)
      try {
        // Fazer a chamada para o backend para autenticar o adminLogin como administrador
        const response = await authUserAdmin(adminLoginEmail, adminLoginPassword)
        if (response) {
          history.push("/signup")
        } else {
          toast.error("Este perfil não é Admin")
        }
      } catch (error) {
        // Exibir uma mensagem de erro genérica em caso de falha na requisição
        toast.error("Ocorreu um erro ao autenticar como administrador. Por favor, tente novamente mais tarde.");
      }
    } else {
      // O perfil selecionado é de usuário
      // Redirecione para a página de registro de usuário
      await authUserAdmin(adminLoginEmail, adminLoginPassword)
      history.push("/signup");
    }
  };


  const handleEmailFocus = () => {
    setEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setEmailFocused(false);
    if (!email || !email.match(/^\S+@\S+\.\S+$/)) {
      setEmailIconVisible(true);
      toast.error('Por favor, insira um e-mail válido.');
    } else {
      setEmailIconVisible(false);
    }
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
    if (!password || password.length < 6) {
      setPasswordIconVisible(true);
      toast.error('A senha está incorreta!.');
    } else {
      setPasswordIconVisible(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error('Preencha os campos de email e senha');
      return;
    }

    await authUser(email, password)

  }

  return (
    <>
      <div>
        <ToastContainer />
        <div>
          <img src={transcargoLogo} alt="Logo" className="logo" />
          <img src={novoFundo} alt='faixa' className="faixa" />
          <h1 className="bemvindo">Bem-Vindo </h1>
          <h1 className="devolta">de volta! </h1>
          <p className="criarConta" onClick={handleCreateAccount}>Criar minha conta
          </p>
        </div>
        <div className="faixa-branca">
          <h1 className="title">Entrar</h1>
          <p className="subtitulo">Preencha seus Dados</p>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                className="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
              />
              {!emailFocused && !email && <img src={iconEmail} alt="Email Icon" className="iconEmail" />}
            </div>
            <div>
              <input
                type="password"
                className="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
              />
              {!passwordFocused && !password && <img src={iconCadeado} alt="Password Icon" className="iconCadeado" />}
            </div>
            <p className="losesenha">Esqueci a Senha</p>
            <button type="submit" className="botao" disabled={loading}>{loading ? "Loading..." : "ENTRAR"}</button>
          </form>
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Selecionar perfil</h2>
              <button onClick={() => history.push('/signup')}>Usuário</button>
              <div className="admin-login">
                <label htmlFor="adminLogin">Login de Administrador</label>
                <input
                  type="email"
                  placeholder="email"
                  id="adminLogin"
                  value={adminLoginEmail}
                  onChange={(e) => setAdminLoginEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="password"
                  id="adminLogin"
                  value={adminLoginPassword}
                  onChange={(e) => setAdminLoginPassword(e.target.value)}
                />
              </div>
              <button onClick={handleCloseModal}>Cancelar</button>
              <button onClick={handleCreateAccountSubmit}>Continuar</button>
            </div>
          </div>
        )}

      </div >
    </>
  );
};

export default Login;