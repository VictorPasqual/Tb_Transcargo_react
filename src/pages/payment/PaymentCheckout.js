import React, { useState } from 'react';
import Navbar from '../../components/navbar/NavBar';
import IconMoney from '../../assets/moneyCell.png'
import './PaymentScreen.css'

const PaymentCheckout = () => {

    // estados para os campos do formulário de informações
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');

    // estados para os campos do formulário de pagamento
    const [paymentMethod, setPaymentMethod] = useState('');

    // estado para controlar a exibição da etapa de pagamento
    const [isPaymentStep, setIsPaymentStep] = useState(false);

    // função para lidar com a submissão do formulário de pagamento
    const handlePaymentSubmit = (event) => {
        event.preventDefault();
        if (paymentMethod === '') {
            alert('Por favor, selecione um método de pagamento.');
        } else {
            // realizar o processamento de pagamento e exibir mensagem de sucesso
            alert('Pagamento processado com sucesso!');
        }
    };

    // função para atualizar o estado de "paymentMethod" com base na opção selecionada
    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    return (
        <div className="containerPayment">
            <Navbar />
            <h1 className='info'>Dados do Cartão {'>'}{'>'}</h1>
            <h1 className='pag'>Pagamento {'>'}{'>'}</h1>
            <h1 className='fim'>Fim</h1>
            <form onSubmit={handlePaymentSubmit} className='formsPayment'>
                <div className='imagePayment'>
                    <img src={IconMoney} alt='paymentMethod' />
                </div>

                <input
                    type="text"
                    id="card-name"
                    className="card-name-input"
                    placeholder="Nome impresso no cartão"
                    value={cardName}
                    onChange={(event) => setCardName(event.target.value)}
                />
                <input
                    type="text"
                    id="card-number"
                    className="card-number-input"
                    placeholder="Número do cartão"
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)}
                />
                <input
                    type="text"
                    id="expiration-date"
                    className="expiration-date-input"
                    placeholder="Data de validade (MM/AA)"
                    value={expirationDate}
                    onChange={(event) => setExpirationDate(event.target.value)}
                />
                <input
                    type="text"
                    id="cvv"
                    className="cvv-input"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(event) => setCvv(event.target.value)}
                />

                {
                    isPaymentStep && (
                        <>
                            <h1>Forma de pagamento</h1>
                            <div className="payment-method-options">
                                <label>
                                    <input
                                        type

                                        ="radio"
                                        name="payment-method"
                                        value="boleto"
                                        checked={paymentMethod === 'boleto'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    Boleto bancário
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="payment-method"
                                        value="pix"
                                        checked={paymentMethod === 'pix'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    Pix
                                </label>
                            </div>
                            <button type="submit" className="payment-submit-button">Finalizar pagamento</button>
                        </>
                    )
                }

                {
                    !isPaymentStep && (
                        <button type="submit" className="info-submit-button">Próximo</button>
                    )
                }
            </form>
        </div>

    );

};

export default PaymentCheckout;