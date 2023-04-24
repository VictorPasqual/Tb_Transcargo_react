import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';
import transcargoLogo from '../../assets/transcargoLogo.png'
import { REACT_APP_API_URL } from '../../api/APIs';
import iconRole from '../../assets/role.png'
import iconName from '../../assets/userInput.png'
import iconCpfCnpj from '../../assets/cpf-cnpj-icon.png'
import iconEmail from '../../assets/logoemail.png'
import iconPassword from '../../assets/logocadeado.png'
import novoFundo from '../../assets/novoFundo.png'
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

  const history = useHistory()
  const [showIcons, setShowIcons] = useState({
    role: true,
    name: true,
    cpfCnpj: true,
    email: true,
    password: true,
  });
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
    setShowIcons({ ...showIcons, [name]: false });
    setFormData({ ...formData, [name]: value });
    try {
      await Yup.reach(schema, name).validate(value);
      setErrors({ ...errors, [name]: '' });
    } catch (error) {
      setErrors({ ...errors, [name]: error.message });
    }
  };

  const handleInputBlur = (event) => {
    const { name } = event.target;
    setShowIcons({ ...showIcons, [name]: true });
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
      <div>
        <img src={transcargoLogo} alt="Logo" className="logo" />
        <img src={novoFundo} alt='faixa' className="faixa" />
        <h1 id="bemvindo">Bem-Vindo </h1>
        <h1 id="devolta">de volta! </h1>
        <p id="acesse">Acesse sua conta agora!</p>
        <p id="losesenha">Esqueci a Senha</p>
        <button id="entrar" onClick={() => history.push('/')}>ENTRAR</button>
        <h2 id="crieConta">Crie sua conta</h2>
        <p id="preencha">Preencha seus dados</p>
        <form onSubmit={handleSubmit}>
          <div>
            {showIcons.role && !formData.role && <img src={iconRole} alt="Email Icon" id="iconRole" />}
            <select id="role" style={{
              width: 587,
              height: 84,
              color: '#696B69',
              fontFamily: 'M PLUS Code Latin',
              fontSize: '210%',
              position: 'absolute',
              textAlign: 'center',
              left: 1350,
              top: 283,
              transform: 'translate(-50%, -50%)'
            }} name="role" value={formData.role} onChange={handleInputChange} required>
              <option value="" disaled>Role</option>
              <option value="admin" style={{ fontSize: 20 }}>Admin</option>
              <option value="motorista" style={{ fontSize: 20 }}>Motorista</option>
              <option value="cliente" style={{ fontSize: 20 }}>Cliente</option>
            </select>
            {errors.role && <span>{errors.role}</span>}
          </div>

          <div>
            {showIcons.name && !formData.name && <img src={iconName} alt="Name Icon" id="iconName" />}
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              onBlur={handleInputBlur}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>
          <div>
            {showIcons.cpfCnpj && !formData.cpfCnpj && <img src={iconCpfCnpj} alt="Cpf/Cnpj Icon" id="iconCpfCnpj" />}
            <input type="text" id="cpf-cnpj" name="cpf-cnpj" placeholder="CPF/CNPJ" value={formData.cpfCnpj} onChange={handleInputChange} required onBlur={handleInputBlur} />
            {errors.cpfCnpj && <span>{errors.cpfCnpj}</span>}
          </div>
          <div>
            {showIcons.email && !formData.email && <img src={iconEmail} alt="Email Icon" id="iconEmail" />}
            <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required onBlur={handleInputBlur} />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            {showIcons.password && !formData.password && <img src={iconPassword} alt="Password Icon" id="iconPassword" />}
            < input type="password" id="password" name="password" placeholder="Senha" value={formData.password} onChange={handleInputChange} required onBlur={handleInputBlur} />
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