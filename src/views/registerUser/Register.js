import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';


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
})

const Register = () => {
  const [formData, setFormData] = useState({ role: '', name: '', email: '', cpfCnpj: '', password: '' });
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      await schema.validate(formData);
      const response = await axios.post('http://localhost:8080/users', formData);
      console.log(response.data);
      toast.success('Você está registrado!');
      setFormData({ role: '' ,name: '', email: '', cpfCnpj: '', password: '', });
    } catch (error) {
      console.log(error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        toast.error('Este e-mail já está cadastrado!');
      } else {
        toast.error('Houve um problema. Verifique os campos abaixo.');
      }
    }
  };

  return (
    <div>
      <h2>Registro de usuário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          />
          {errors.role && <span>{errors.role}</span>}
        </div>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {errors.name && <span>{errors.name}</span>}

        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="cpf_Cnpj">CPF/CNPJ:</label>
          <input
            type="text"
            id="cpfCnpj"
            name="cpfCnpj"
            value={formData.cpfCnpj}
            onChange={handleInputChange}
            required
          />
          {errors.cpfCnpj && <span>{errors.cpfCnpj}</span>}
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;