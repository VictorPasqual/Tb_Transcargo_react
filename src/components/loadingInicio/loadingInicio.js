import React, { useState, useEffect } from "react";
import caminhoesInicio from "../../assets/caminhoes-inicio.png";
import loadingIcon from "../../assets/pneu.png"
import "./loadingInicio.css";

const Inicio = () => {


  return (
    <div className="entrance-screen">
      <div className="entrance-image-container">
        <img src={caminhoesInicio} alt="Entrance" className="entrance-image" />
      </div>

      <div className="loading-container">
        <img src={loadingIcon} alt="Loading" className="loading-icon" />
        <div className="loading-text">Carregando...</div>
      </div>
    </div>
  );
};

export default Inicio;