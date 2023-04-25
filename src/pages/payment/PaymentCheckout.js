import React, { useState } from 'react';
import Navbar from '../../components/navbar/NavBar';
import IconMoney from '../../assets/moneyCell.png'
import './PaymentCheckout.css'

const PaymentCheckout = () => {

    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Processar os dados do cartão e efetuar a compra
    };

    return (
        <div className="containerPayment">
            <Navbar />
            <h1 className='info'>Informações {'>'}{'>'}</h1>
            <h1 className='pag'>Pagamento {'>'}{'>'}</h1>
            <h1 className='fim'>Fim</h1>
            <form onSubmit={handleSubmit} className='payment-form'>
                <div className='payment-image'>
                    <img src={IconMoney} alt='paymentMethod' />
                </div>

                <input
                    type="text"
                    id="cardNumber"
                    className="payment-input"
                    placeholder="Numero impresso no cartão"
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)}
                />
                <input
                    type="text"
                    id="cardName"
                    className="payment-input"
                    placeholder="Nome completo do titular"
                    value={cardName}
                    onChange={(event) => setCardName(event.target.value)}
                />
                <input
                    type="text"
                    id="expiration-date"
                    className="payment-input"
                    placeholder="Data de validade (MM/AA)"
                    value={expiryDate}
                    onChange={(event) => setExpiryDate(event.target.value)}
                />
                <input
                    type="text"
                    id="cvv"
                    className="payment-input"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(event) => setCvv(event.target.value)}
                />

                <button type="submit" className='payment-submit-button'>Comprar</button>
            </form>
        </div>

    );

};

export default PaymentCheckout;