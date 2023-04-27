import React, { useState } from 'react';
import rastreamento from '../../assets/rastreamento.png'
import Navbar from '../../components/navbar/NavBar';
import { useHistory } from 'react-router-dom';
import './Track.css';

const TrackDelivery = () => {
    const [notaFiscal, setNotaFiscal] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');

    const history = useHistory()

    const handleNotaFiscalChange = (event) => {
        setNotaFiscal(event.target.value);
    };

    const handleCpfCnpjChange = (event) => {
        setCpfCnpj(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Cria um objeto com as informações que deseja passar para a página de entrega
       
        // Passa o objeto como propriedade da página de entrega e redireciona o usuário
        history.push({
            pathname: '/delivery',
            state: { data: { notaFiscal: notaFiscal, cpfCnpj: cpfCnpj } }
          })
    };

    return (
        <div className='containerTrack'>
            <Navbar />
            <h3 className='acompanhe'>ACOMPANHE SUA ENTREGA
            </h3>
            <div className='imageTrack '>
                <img src={rastreamento} alt='rastreamento' />
            </div>
            <p className='informe'>Informe o número da Nota Fiscal e o CPF/CNPJ do Destinatário:
            </p>
            <form onSubmit={handleSubmit} className='formTrack'>
                <input
                    type='text'
                    id='notaFiscal'
                    className='notaFiscal'
                    placeholder='Nota Fiscal'
                    name='notaFiscal'
                    value={notaFiscal}
                    onChange={handleNotaFiscalChange}
                />

                <input
                    type='text'
                    id='cpfCnpj'
                    className='cpfCnpjTrack'
                    placeholder='CNPJ/CPF somente numeros'
                    name='cpfCnpj'
                    value={cpfCnpj}
                    onChange={handleCpfCnpjChange}
                />

                <button type='submit'
                    className='rastrear'
                    value='Rastrear'
                >
                    Rastrear
                </button>
            </form>
        </div>
    );
};

export default TrackDelivery;
