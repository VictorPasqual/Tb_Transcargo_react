import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error('Preencha os campos de email e senha');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/auth', { email, password });

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
    <>
      <div id="faixa">
        <img src="../../assets/transcargo.png" alt="Logo"/>
        <h1 id="bemvindo">Bem-Vindo de volta!</h1>
        <p id="acesse">Acesse sua conta agora mesmo</p>
      </div>
      <div id="faixa-branca">
        <h1 id="title">Entrar</h1>
        <p id="subtitulo">Preencha seus Dados</p>
        <form onSubmit={handleSubmit} >
          <div>
            <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder="Email" />
          </div>
          <div>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} placeholder="Senha" />
          </div>
          <p id="losesenha">Esqueci a Senha</p>
          <button type="submit" id="botao">ENTRAR</button>
        </form>
      </div>
    </>
  );
};

export default Login;
