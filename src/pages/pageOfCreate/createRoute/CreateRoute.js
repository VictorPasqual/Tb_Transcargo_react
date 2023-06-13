import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import api from "../../../api/APIs";
import axios from "axios";
import "./CreateRoute.css";

const CreateRoutePage = () => {
  const [origemCEP, setOrigemCEP] = useState("");
  const [destinoCEP, setDestinoCEP] = useState("");
  const [caminhao, setCaminhao] = useState("");
  const [distancia, setDistancia] = useState("");
  const [origemEndereco, setOrigemEndereco] = useState("");
  const [destinoEndereco, setDestinoEndereco] = useState("");
  const [showCreateRouteButton, setShowCreateRouteButton] = useState(false);
  const [showCalculateButton, setShowCalculateButton] = useState(true);

  const handleCreateRoute = async (e) => {
    e.preventDefault();

    try {
      if (!origemCEP || !destinoCEP || !caminhao) {
        toast.error("Preencha todos os campos obrigatórios");
        return;
      }

      const response = await api.post("/routes", {
        origemCEP,
        destinoCEP,
        distancia,
        caminhao
      });

      console.log("Rota criada:", response.data);
      // Lógica adicional, como redirecionar para outra página ou atualizar a lista de rotas
    } catch (error) {
      console.error("Erro ao criar rota:", error);
    }
  };

  const handleCalculateDistance = async () => {
    try {
      if (!origemCEP || !destinoCEP) {
        toast.error("Preencha os campos de CEP para calcular a distância");
        return;
      }

      const response = await api.post("/routes/distance", {
        origemCEP,
        destinoCEP,
      });

      const distancia = response.data.distancia;

      console.log("Distância calculada:", distancia);

      setDistancia(distancia);
      if (distancia) {
        setShowCreateRouteButton(true);
        setShowCalculateButton(false);
      }
    } catch (error) {
      console.error("Erro ao calcular distância:", error);
    }
  };

  const buscarEnderecoOrigem = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${origemCEP}/json/`);
      const data = response.data;
      const endereco = data.logradouro + ", " + data.localidade + " - " + data.uf;

      console.log("Endereço de origem:", endereco);

      setOrigemEndereco(endereco);
    } catch (error) {
      console.error("Erro ao buscar endereço de origem:", error);
    }
  };

  const buscarEnderecoDestino = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${destinoCEP}/json/`);
      const data = response.data;
      const endereco = data.logradouro + ", " + data.localidade + " - " + data.uf;

      console.log("Endereço de destino:", endereco);

      setDestinoEndereco(endereco);
    } catch (error) {
      console.error("Erro ao buscar endereço de destino:", error);
    }
  };

  useEffect(() => {
    if (origemCEP) {
      buscarEnderecoOrigem();
    }
  }, [origemCEP]);

  useEffect(() => {
    if (destinoCEP) {
      buscarEnderecoDestino();
    }
  }, [destinoCEP]);

  return (
    <div className="backgroundCR">
      <ToastContainer />
      <div className="create-route-container">
        <h2>Criar Rota</h2>
        <form onSubmit={handleCreateRoute}>
          <div className="form-group">
            <label>Origem CEP:</label>
            <input
              type="text"
              value={origemCEP}
              onChange={(e) => setOrigemCEP(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Origem Endereço:</label>
            <input type="text" value={origemEndereco} disabled placeholder="Endereço de origem" />
          </div>
          <div className="form-group">
            <label>Destino CEP:</label>
            <input
              type="text"
              value={destinoCEP}
              onChange={(e) => setDestinoCEP(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Destino Endereço:</label>
            <input type="text" value={destinoEndereco} disabled placeholder="Endereço de destino" />
          </div>
          <div className="form-group">
            <label>Distância:</label>
            <input type="text" value={distancia} disabled />
          </div>
          <div className="form-group">
            <label>Caminhão destinado:</label>
            <input
              type="text"
              value={caminhao}
              onChange={(e) => setCaminhao(e.target.value)}
            />
          </div>
          {showCreateRouteButton && (
            <button className="buttonCR" type="submit">
              Criar Rota
            </button>
          )}
          {showCalculateButton && (
            <button className="buttonCR" type="button" onClick={handleCalculateDistance}>
              Calcular Distância
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateRoutePage;
