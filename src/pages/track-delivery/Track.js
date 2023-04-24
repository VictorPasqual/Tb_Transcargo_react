import React, { useState } from 'react';
import rastreamento from '../../assets/rastreamento.png'
import './Track.css';

const TrackDelivery = () => {
    const [notaFiscal, setNotaFiscal] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');

    const handleNotaFiscalChange = (event) => {
        setNotaFiscal(event.target.value);
    };

    const handleCpfCnpjChange = (event) => {
        setCpfCnpj(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // implementar a lógica de rastreamento da entrega aqui
    };

    return (
        <div className='containerTrack'>
            <img src={rastreamento}/>
            <form onSubmit={handleSubmit} className='formTrack'>
                <input
                    type='text'
                    id='notaFiscal'
                    className='notaFiscal'
                    name='notaFiscal'
                    value={notaFiscal}
                    onChange={handleNotaFiscalChange}
                />

                <input
                    type='text'
                    id='cpfCnpj'
                    className='cpfCnpjTrack'
                    name='cpfCnpj'
                    value={cpfCnpj}
                    onChange={handleCpfCnpjChange}
                />

                <input type='submit' className='rastrear' value='Rastrear' />
            </form>
        </div>
    );
};

export default TrackDelivery;
