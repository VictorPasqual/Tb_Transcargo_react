import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import transcargoLogo from '../../assets/transcargoLogo.png'
import iconEmail from '../../assets/logoemail.png'
import iconCadeado from '../../assets/logocadeado.png'
import novoFundo from '../../assets/novoFundo.png'
import { useHistory } from "react-router-dom";
import './Login.css';
import { useAuth } from "../../hooks/auth";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailIconVisible, setEmailIconVisible] = useState(true);
  const [passwordIconVisible, setPasswordIconVisible] = useState(true);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const { authUser } = useAuth()

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

    const authenticated = await authUser(email, password)
    console.log(authenticated)
    if(authenticated) {
      history.push('/home')
    }

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
      </div >
    </>
  );
};

export default Login;