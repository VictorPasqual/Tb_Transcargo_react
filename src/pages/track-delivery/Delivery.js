import React, { useState, useEffect } from 'react';
import api from '../../api/APIs';
import Truck from '../../assets/truck.png';
import Map from '../../assets/google-maps.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useHistory, Link } from 'react-router-dom';
import './Delivery.css';

const Delivery = (props) => {
  const notaFiscal = props.location.state && props.location.state.data && props.location.state.data.notaFiscal;
  const cpfCnpj = props.location.state && props.location.state.data && props.location.state.data.cpfCnpj;

  const history = useHistory()

  const [carga, setCarga] = useState(null);
  const [trajetoria, setTrajetoria] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);


  async function obterCargaETrajetoria() {
    setCarregando(true);

    try {
      const [cargaResponse, trajetoriaResponse] = await Promise.all([
        api.get(`/cargas/caminhao/${notaFiscal || cpfCnpj}`),
        api.get(`/cargas/${notaFiscal || cpfCnpj}`),
      ]);

      setCarga(cargaResponse.data);
      setTrajetoria(trajetoriaResponse.data);
      setErro(null);
    } catch (error) {
      setErro(error);
      setCarga(null);
      setTrajetoria(null);
    }

    setCarregando(false);
  }

  useEffect(() => {
    obterCargaETrajetoria();
  }, [notaFiscal, cpfCnpj]);

  function handleTentarNovamente() {
    obterCargaETrajetoria();
  }

  if (erro) {
    return (
      <div>
        <div>Erro ao carregar a carga e a trajetória</div>
        <button onClick={handleTentarNovamente}>Tentar novamente</button>
        <button onClick={() => history.goBack()}>Voltar</button>
      </div>
    )
  }

  if (!carga || !trajetoria) {
    return (
      <div>
        <div className="spinner">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
      </div>
    );
  }

  return (
    <div className="truck-carousel-content">
      <h3 className='acompanheDelivery'>ACOMPANHE SUA ENTREGA</h3>
      <div className="truck-info">
        <img
          className="truck-image"
          src={Truck}
          alt={`Truck`}
        />
        <div className="truck-details">
          <p>Placa: {carga.placa}</p>
          <p>Marca: {carga.marca}</p>
          <p>Modelo: {carga.modelo}</p>
        </div>
      </div>
      <p className='tempo'>Tempo extimado: 2 dias</p>
      <Link to={{
        pathname: '/mapa',
        state: { 
          positionOrigemLat: trajetoria.origemLat, 
          positionOrigemLng: trajetoria.origemLng, 
          positionDestinoLat: trajetoria.destinoLat, 
          positionDestinoLng: trajetoria.destinoLng }
      }}>
        <div className="content-image"></div>
        <img
          className="map-image"
          src={Map}
          alt={`Map`}
        />
      </Link>

    </div >

  );
};

export default Delivery;
