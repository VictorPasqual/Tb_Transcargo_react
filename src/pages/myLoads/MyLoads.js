import React, { useState, useEffect } from "react";
import api from "../../api/APIs";
import './MyLoads.css';

const CargaModal = ({ cargas, onClose }) => {
    return (
        <div className="carga-modal show">
            <div className="carga-modal-content">
                <div className="carga-modal-header">
                    <button className="close-button" onClick={onClose}>
                        Fechar
                    </button>
                </div>
                <div className="carga-modal-body">
                    <p>NF: {cargas.notaFiscal}</p>
                    <p>Peso: {cargas.peso}</p>
                    <p>Descrição: {cargas.descricao}</p>
                    <p>Origem: {cargas.origemLat} {cargas.origemLng}</p>
                    <p>Destino: {cargas.destinoLat} {cargas.destinoLng}</p>
                </div>
            </div>
        </div>
    );
};

const MyLoads = () => {
    const [cargas, setCargas] = useState([]);
    const [rotas, setRotas] = useState([]);
    const [selectedCarga, setSelectedCarga] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Aqui você precisará capturar o ID do usuário logado do seu sistema de autenticação
        const loggedUserId = 1; // Exemplo de ID do usuário logado
        setUserId(loggedUserId);
    }, []);

    useEffect(() => {
        if (userId) {
            fetchCargas();
        }
    }, [userId]);

    const fetchCargas = async () => {
        try {
            const response = await api.get(`/trucks/${userId}/user`);
            const trucks = response.data;
            console.log(trucks);
            if (trucks.length > 0) {
                const caminhaoId = trucks[0].id; // Obtém o ID do primeiro caminhão encontrado
                const cargasResponse = await api.get(`/trucks/${caminhaoId}/cargas`);
                setCargas(cargasResponse.data);
                setRotas(cargasResponse.data);
            } else {
                console.log("O usuário não possui caminhões.");
            }
        } catch (error) {
            console.error("Erro ao obter as cargas:", error);
        }
    };


    const handleCargaClick = (cargas) => {
        setSelectedCarga(cargas);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedCarga(null);
        setShowModal(false);
    };

    console.log(rotas)

    return (
        <div className="containerMyloads" >
            <div className="motorista-cargas">
                <div className="cargas-list-container">
                    <h3>Cargas do Motorista</h3>

                    <div
                        key={cargas.id}
                        className="carga-item"
                        onClick={() => handleCargaClick(cargas)}
                    >
                        NF: {cargas.notaFiscal}
                    </div>
                    <div>
                        <h2>Informações da Rota do Caminhão</h2>
                        Origem CEP: <p>{rotas.origemCEP}</p>
                        Destino CEP: <p>{rotas.destinoCEP}</p>
                        Distância: <p>{rotas.distancia}</p> km
                    </div>
                </div>
                {selectedCarga && (
                    <CargaModal cargas={selectedCarga} onClose={handleCloseModal} />
                )}
            </div>
        </div>
    );
};

export default MyLoads;
