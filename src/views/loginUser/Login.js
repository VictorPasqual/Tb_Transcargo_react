import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';

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
      const response = await axios.post('http//:localhost:8080/auth', { email, password });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success('Você foi autenticado com sucesso.');
      } else {
        toast.error('Credenciais inválidas');
      }
    } catch (error) {
      console.log({ message: `cai no catch ${error}` });
      toast.error('Não foi possível realizar o login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">E-mail:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label htmlFor="password">Senha:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
};

export default Login;
