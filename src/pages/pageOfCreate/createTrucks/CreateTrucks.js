import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import api from "../../../api/APIs";
import "./CreateTrucks.css";

const CreateTruckPage = () => {
    const [placa, setPlaca] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [owner, setOwner] = useState("");

    const handleCreateTruck = async (e) => {
        e.preventDefault();

        try {
            if (!placa || !marca || !modelo || !owner) {
                toast.error("Preencha todos os campos obrigatórios");
                return;
            }

            const response = await api.post("/trucks", {
                placa,
                marca,
                modelo,
                owner,
            });

            console.log(response.data);
            // Lógica adicional, como redirecionar para outra página ou atualizar a lista de caminhões
        } catch (error) {
            console.error("Erro ao criar caminhão:", error);
        }
    };

    return (
        <div className="backgroundCT">
            <ToastContainer />
            <div className="containerCT">
                <h2>Criar Caminhão</h2>
                <form onSubmit={handleCreateTruck}>
                    <div className="form-group">
                        <label htmlFor="placa">Placa:</label>
                        <input
                            id="placa"
                            className="inputCT"
                            type="text"
                            value={placa}
                            onChange={(e) => setPlaca(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="marca">Marca:</label>
                        <input
                            id="marca"
                            className="inputCT"
                            type="text"
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="modelo">Modelo:</label>
                        <input
                            id="modelo"
                            className="inputCT"
                            type="text"
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="owner">Owner:</label>
                        <input
                            id="owner"
                            className="inputCT"
                            type="text"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                        />
                    </div>
                    <button className="buttonCT" type="submit">
                        Criar Caminhão
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTruckPage;
