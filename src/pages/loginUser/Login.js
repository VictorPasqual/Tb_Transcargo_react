import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import transcargoLogo from '../../assets/transcargoLogo.png'
import iconEmail from '../../assets/logoemail.png'
import iconCadeado from '../../assets/logocadeado.png'
import novoFundo from '../../assets/novoFundo.png'
import { REACT_APP_API_URL } from '../../api/APIs'
import { useHistory } from "react-router-dom";
import './Login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailIconVisible, setEmailIconVisible] = useState(true);
  const [passwordIconVisible, setPasswordIconVisible] = useState(true);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const history = useHistory();


  const handleEmailChange = ({ target }) => {
    setEmail(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
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
    console.log(`Email: ${email}, Password: ${password}`);

    if (!email || !password) {
      toast.error('Preencha os campos de email e senha');
      return;
    }

    try {
      const response = await axios.post(`${REACT_APP_API_URL}/auth`, { email, password });
      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success('Você foi autenticado com sucesso.');
        // Navegar para a tela Home

        history.push('/home');
        setEmail('')
        setPassword('')
        setEmailIconVisible(true);
        setPasswordIconVisible(true);
      } else {
        toast.error('Credenciais inválidas');
        setEmailIconVisible(true);
        setPasswordIconVisible(true);
      }
    } catch (error) {
      console.error({ message: `Caiu no catch: ${error}` });
      toast.error('Não foi possível realizar o login');
      setEmail('')
      setPassword('')
      setEmailIconVisible(true);
      setPasswordIconVisible(true);
    }
  };


  return (
    <>
      <div>
        <ToastContainer />
        <div>
          <img src={transcargoLogo} alt="Logo" className="logo" />
          <img src={novoFundo} alt='faixa' className="faixa" />
          <h1 className="bemvindo">Bem-Vindo </h1>
          <h1 className="devolta">de volta! </h1>
          <p className="criarConta" onClick={() => history.push('/signup')}>Criar minha conta
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
                onChange={handleEmailChange}
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
                onChange={handlePasswordChange}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
              />
              {!passwordFocused && !password && <img src={iconCadeado} alt="Password Icon" className="iconCadeado" />}
            </div>
            <p className="losesenha">Esqueci a Senha</p>
            <button type="submit" className="botao">ENTRAR</button>
          </form>
        </div>
      </div >
    </>
  );
};

export default Login;