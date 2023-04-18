import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';
import transcargoLogo from '../../assets/transcargoLogo.png'
import { REACT_APP_API_URL } from '../../api/APIs';
import iconEmail from '../../assets/logoemail.png'
import iconCadeado from '../../assets/logocadeado.png'
import { useHistory } from 'react-router-dom';
import './Register.css'

const schema = Yup.object().shape({
  role: Yup.string().required('O campo role é obrigatório'),
  name: Yup.string().required('O campo nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('O campo e-mail é obrigatório'),
  cpfCnpj: Yup.string()
    .test('cpf-cnpj', 'CPF ou CNPJ inválido', (value) => cpfValidator.isValid(value) || cnpjValidator.isValid(value))
    .required('O campo CPF/CNPJ é obrigatório'),
  password: Yup.string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .max(100, 'A senha deve ter no máximo 100 caracteres')
    .required('O campo senha é obrigatório'),
});

const Register = () => {
  const [emailIconVisible, setEmailIconVisible] = useState(true);
  const [passwordIconVisible, setPasswordIconVisible] = useState(true);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setInputFocused] = useState(false);

  const history = useHistory()

  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    cpfCnpj: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    try {
      await Yup.reach(schema, name).validate(value);
      setErrors({ ...errors, [name]: '' });
    } catch (error) {
      setErrors({ ...errors, [name]: error.message });
    }
  };

  const handleInputFocus = () => {
    setPasswordFocused(true);
  };

  const handleInputBlur = () => {
    setPasswordFocused(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      await schema.validate(formData);
      const response = await axios.post(`${REACT_APP_API_URL}/users`, formData);
      console.log(response.data);
      toast.success('Você está registrado!');
      setFormData({ role: '', name: '', email: '', cpfCnpj: '', password: '' });
    } catch (error) {
      setFormData({ role: '', name: '', email: '', cpfCnpj: '', password: '' });
      console.log(error);
      if (error.name === 'ValidationError') {
        toast.error('Houve um problema. Verifique os campos abaixo.');
      } else if (error.name === 'SequelizeUniqueConstraintError') {
        toast.error('Este e-mail já está cadastrado!');
      } else {
        toast.error('Houve um problema. Verifique os campos abaixo.');
      }
    }
  };

  return (
    <div>
      <div id="faixa">
        <img src={transcargoLogo} alt="Logo" id="logo" />
        <h1 id="bemvindo">Bem-Vindo </h1>
        <h1 id="devolta">de volta! </h1>
        <p id="acesse">Acesse sua conta agora!</p>
        <p id="losesenha">Esqueci a Senha</p>
        <button id="entrar" onClick={() => history.push('/')}>ENTRAR</button>
        <h2 id="crieConta">Crie sua conta</h2>
        <p id="preencha">Preencha seus dados</p>
        <form onSubmit={handleSubmit}>
          <div>
            <select id="role" style={{
              width: 587,
              color: '#696B69',
              fontFamily: 'M PLUS Code Latin',
              fontSize: '210%',
              position: 'absolute',
              textAlign: 'center',
              left: 1341,
              top: 284,
              transform: 'translate(-50%, -50%)'
            }} name="role" value={formData.role} onChange={handleInputChange} required>
              <option value="" disabled>Role</option>
              <option value="admin" style={{ fontSize: 20 }}>Admin</option>
              <option value="motorista" style={{ fontSize: 20 }}>Motorista</option>
              <option value="cliente" style={{ fontSize: 20 }}>Cliente</option>
            </select>
            {errors.role && <span>{errors.role}</span>}
          </div>

          <div>
            <input
              type="text" 
              id="name" 
              name="name" 
              placeholder="Name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            {!emailFocused && <img src={iconEmail} alt="Email Icon" className="iconEmail" />}
            {errors.name && <span>{errors.name}</span>}
          </div>
          <div>
            <input type="text" id="cpfCnpj" name="cpfCnpj" placeholder="CPF/CNPJ" value={formData.cpfCnpj} onChange={handleInputChange} required />
            {errors.cpfCnpj && <span>{errors.cpfCnpj}</span>}
          </div>
          <div>
            <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <input type="password" id="password" name="password" placeholder="Senha" value={formData.password} onChange={handleInputChange} required />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <button type="submit" id="cadastrar">CADASTRAR</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;