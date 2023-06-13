import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cpf as cpfValidator, cnpj as cnpjValidator } from "cpf-cnpj-validator";
import transcargoLogo from "../../assets/transcargoLogo.png";
import api from "../../api/APIs";
import iconRole from "../../assets/role.png";
import iconName from "../../assets/userInput.png";
import iconCpfCnpj from "../../assets/cpf-cnpj-icon.png";
import iconEmail from "../../assets/logoemail.png";
import iconPassword from "../../assets/logocadeado.png";
import novoFundo from "../../assets/novoFundo.png";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import "./Register.css";

const Register = () => {
  const history = useHistory();
  const [showIcons, setShowIcons] = useState({
    role: true,
    name: true,
    cpfCnpj: true,
    email: true,
    password: true,
  });
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    cpfCnpj: "",
    email: "",
    password: "",
  });

  const { isAdmin } = useAuth();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setShowIcons({ ...showIcons, [name]: false });
    setFormData({ ...formData, [name]: value });
  };

  const handleInputBlur = (event) => {
    const { name } = event.target;
    setShowIcons({ ...showIcons, [name]: true });
  };

  const validateEmail = (email) => {
    // Utilize a validação que preferir para o campo de e-mail
    // Neste exemplo, estou utilizando uma expressão regular simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCpfCnpj = (cpfCnpj) => {
    // Utilize a biblioteca cpf-cnpj-validator para validar CPF/CNPJ
    return cpfValidator.isValid(cpfCnpj) || cnpjValidator.isValid(cpfCnpj);
  };

  const validatePassword = (password) => {
    // Faça as validações necessárias para a senha
    // Neste exemplo, estou verificando se a senha tem pelo menos 6 caracteres
    return password.length >= 6;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, cpfCnpj, password } = formData;

    if (!validateEmail(email)) {
      toast.error("E-mail inválido. Verifique o formato do e-mail.");
      return;
    }

    if (!validateCpfCnpj(cpfCnpj)) {
      toast.error("CPF/CNPJ inválido. Verifique o número do CPF/CNPJ.");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Senha inválida. A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const response = await api.post("/users", formData);
      console.log(response.data);
      toast.success("Você está registrado!");
    } catch (error) {
      console.log(error);
      if (error.name === "ValidationError" || error.name === "SequelizeUniqueConstraintError") {
        toast.error("Este e-mail já está cadastrado!");
      } else {
        toast.error("Houve um problema. Verifique os campos abaixo.");
      }
    }
  };

  console.log(isAdmin);

  return (
    <div>
      <div>
        <img src={transcargoLogo} alt="Logo" className="logo" />
        <img src={novoFundo} alt="faixa" className="faixa" />
        <h1 id="bemvindo">Bem-Vindo </h1>
        <h1 id="devolta">de volta! </h1>
        <p id="acesse">Acesse sua conta agora!</p>
        <p id="losesenha">Esqueci a Senha</p>
        <button id="entrar" onClick={() => history.push("/")}>
          ENTRAR
        </button>
        <h2 id="crieConta">Crie sua conta</h2>
        <p id="preencha">Preencha seus dados</p>
        <form onSubmit={handleSubmit}>
          <div>
            {showIcons.role && !formData.role && <img src={iconRole} alt="Email Icon" id="iconRole" />}
            <select
              id="role"
              className="form-input"
              style={{
                width: 587,
                height: 84,
                color: "#696B69",
                fontFamily: "M PLUS Code Latin",
                fontSize: "210%",
                position: "absolute",
                textAlign: "center",
                left: 1350,
                top: 283,
                transform: "translate(-50%, -50%)",
              }}
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled style={{ fontSize: 20, color: "grey" }}>
                Selecione um Role
              </option>
              {isAdmin && (
                <option value="admin" style={{ fontSize: 20, fontWeight: "bold" }}>
                  Admin
                </option>
              )}
              {isAdmin && (
                <option value="motorista" style={{ fontSize: 20, fontWeight: "bold" }}>
                  Motorista
                </option>
              )}
              <option value="cliente" style={{ fontSize: 20, fontWeight: "bold" }}>
                Cliente
              </option>
            </select>
          </div>

          <div>
            {showIcons.name && !formData.name && <img src={iconName} alt="Name Icon" id="iconName" />}
            <input
              type="text"
              id="name"
              className="form-input"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              onBlur={handleInputBlur}
            />
          </div>

          <div>
            {showIcons.cpfCnpj && !formData.cpfCnpj && (
              <img src={iconCpfCnpj} alt="Cpf/Cnpj Icon" id="iconCpfCnpj" />
            )}
            <input
              type="text"
              id="cpf-Cnpj"
              className="form-input"
              name="cpfCnpj"
              placeholder="CPF/CNPJ"
              value={formData.cpfCnpj}
              onChange={handleInputChange}
              required
              onBlur={handleInputBlur}
            />
          </div>

          <div>
            {showIcons.email && !formData.email && <img src={iconEmail} alt="Email Icon" id="iconEmail" />}
            <input
              type="email"
              id="email"
              className="form-input"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              onBlur={handleInputBlur}
            />
          </div>

          <div>
            {showIcons.password && !formData.password && (
              <img src={iconPassword} alt="Password Icon" id="iconPassword" />
            )}
            <input
              type="password"
              id="password"
              className="form-input"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleInputChange}
              required
              onBlur={handleInputBlur}
            />
          </div>

          <button type="submit" id="cadastrar">
            CADASTRAR
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
