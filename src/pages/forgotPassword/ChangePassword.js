import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri'; // Importe os ícones do react-icons
import api from "../../api/APIs";
import transcargoLogo from '../../assets/transcargoLogo.png'
import novoFundo from '../../assets/novoFundo.png'
import './ChangePassword.css';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error('A nova senha e a confirmação da nova senha não correspondem.');
      return;
    }

    try {
      setLoading(true);

      const response = await api.post('/changePassword', {
        currentPassword,
        newPassword,
      });

      if (response.status === 200) {
        toast.success('Senha alterada com sucesso.');
        history.push("/dashboard");
      } else {
        toast.error('Ocorreu um erro ao alterar a senha. Por favor, tente novamente mais tarde.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro ao alterar a senha. Por favor, tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <ToastContainer />
        <div>
          <img src={transcargoLogo} alt="Logo" className="logoCP" />
          <img src={novoFundo} alt='faixa' className="faixaCP" />
          <h1 className="changePasswordTitle">Trocar Senha</h1>
        </div>
        <div className="changePasswordForm">
          <form className="formCP" onSubmit={handleSubmit}>
            <input
              type={showPassword ? "text" : "password"} // Altera o tipo de input para exibir ou ocultar a senha
              className="inputCP"
              placeholder="Senha atual"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
            />
            <input
              type={showPassword ? "text" : "password"} // Altera o tipo de input para exibir ou ocultar a senha
              className="inputCP"
              placeholder="Nova senha"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <input
              type={showPassword ? "text" : "password"} // Altera o tipo de input para exibir ou ocultar a senha
              className="inputCP"
              placeholder="Confirmar nova senha"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
            />
            <button
              type="button"
              className="togglePasswordVisibility"
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
            </button>
            <button type="submit" className="submit" disabled={loading}>
              {loading ? "Carregando..." : "Salvar"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
