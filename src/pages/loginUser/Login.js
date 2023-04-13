import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import transcargoLogo from '../../assets/transcargoLogo.png'
import iconEmail from '../../assets/logoemail.png'
import iconCadeado from '../../assets/logocadeado.png'
import { REACT_APP_API_URL } from '../../api/transcargoApi'
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = ({ target }) => {
    setEmail(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error('Preencha os campos de email e senha');
      return;
    }

    try {
      const response = await axios.post(`${REACT_APP_API_URL}/auth`, { email, password });
      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success('Você foi autenticado com sucesso.');
      } else {
        toast.error('Credenciais inválidas');
      }
    } catch (error) {
      console.error({ message: `Caiu no catch: ${error}` });
      toast.error('Não foi possível realizar o login');
    }
  };

  return (
    <div id="telLogin">
      <div id="faixa">
        <img src={transcargoLogo} alt="Logo" id="logo" />
        <h1 id="bemvindo">Bem-V
        indo </h1>
        <h1 id="devolta">de volta! </h1>
      </div>
      <div id="faixa-branca">
        <h1 id="title">Entrar</h1>
        <p id="subtitulo">Preencha seus Dados</p>
        <form onSubmit={handleSubmit} >
          <div>
            <img src={iconEmail} alt="email" id="iconEmail" />
            <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder="Email" />
          </div>
          <div>
            <img src={iconCadeado} alt="cadeado" id="iconCadeado" />
            <input type="password" id="password" value={password} onChange={handlePasswordChange} placeholder="Senha" />
          </div>
          <p id="losesenha">Esqueci a Senha</p>
          <button type="submit" id="botao">ENTRAR</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
