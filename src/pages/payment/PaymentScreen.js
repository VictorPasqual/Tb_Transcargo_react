import React, { useState } from 'react';
import Navbar from '../../components/navbar/NavBar';
import ImageForms from '../../assets/iconTrack.png'
import './PaymentScreen.css'

const InfoAndPaymentScreen = () => {

    // estados para os campos do formulário de informações
    const [cnpjOrCpf, setCnpjOrCpf] = useState('');
    const [trackingCode, setTrackingCode] = useState('');
    const [recipient, setRecipient] = useState('');
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState('');
    const [shippingType, setShippingType] = useState('');

    // estados para os campos do formulário de pagamento
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');

    // estado para controlar a exibição da etapa de pagamento
    const [isPaymentStep, setIsPaymentStep] = useState(false);

    // estado para controlar a opção selecionada (CPF ou CNPJ)
    const [selectedOption, setSelectedOption] = useState('cpf');

    // função para validar os campos de informações antes de ir para a etapa de pagamento
    const handleInfoSubmit = (event) => {
        event.preventDefault();
        if (
            cnpjOrCpf.trim() === '' ||
            trackingCode.trim() === '' ||
            recipient.trim() === '' ||
            address.trim() === '' ||
            category.trim() === '' ||
            shippingType.trim() === ''
        ) {
            alert('Por favor, preencha todos os campos.');
        } else {
            setIsPaymentStep(true);
        }
    };

    // função para lidar com a submissão do formulário de pagamento
    const handlePaymentSubmit = (event) => {
        event.preventDefault();
        // realizar o processamento de pagamento e exibir mensagem de sucesso
        alert('Pagamento processado com sucesso!');
    };

    // função para atualizar o estado de "cnpjOrCpf" com base na opção selecionada
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setCnpjOrCpf('');
    };

    return (
        <div className="containerPayment">
            <Navbar />
            <h1>Informações</h1>
            <form onSubmit={handleInfoSubmit} className='formsPayment'>
                <div className='imagePayment'>
                    <img src={ImageForms} alt='ImageForms' />
                </div>
                <div>
                    <input
                        type="radio"
                        className='cpf'
                        id="cpf"
                        name="document"
                        value="cpf"
                        checked={selectedOption === 'cpf'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="cpf" style={{ color: '#fff', display: 'inline-block', marginRight: '10px' }}>CPF</label>
                </div>
                <div>
                    <input
                        type="radio"
                        className="cnpj"
                        id="cnpj"
                        name="document"
                        value="cnpj"
                        checked={selectedOption === 'cnpj'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="cnpj" style={{ color: '#fff', display: 'inline-block', marginRight: '10px' }}>CNPJ</label>
                </div>

                {selectedOption === 'cpf' && (
                    <input
                        type="text"
                        id="cpf"
                        placeholder="CPF"
                        value={cnpjOrCpf}
                        onChange={(event) => setCnpjOrCpf(event.target.value)}
                    />
                )}

                {selectedOption === 'cnpj' && (
                    <input
                        type="text"
                        id="cnpj"
                        placeholder="CNPJ"
                        value={cnpjOrCpf}
                        onChange={(event) => setCnpjOrCpf(event.target.value)}
                    />
                )}


                <input
                    type="text"
                    id="tracking-code"
                    placeholder="Código de rastreamento"
                    value={trackingCode}
                    onChange={(event) => setTrackingCode(event.target.value)}
                />
                <input
                    type="text"
                    id="recipient"
                    placeholder="Destinatário"
                    value={recipient}
                    onChange={(event) => setRecipient(event.target.value)}
                />
                <input
                    type="text"
                    id="address"
                    placeholder="Endereço de entrega"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
                <select
                    id="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                >
                    <option value="">Selecione a categoria</option>
                    <option value="teste1">teste1</option>
                    <option value="teste2">teste2</option>
                    <option value="teste3">teste3</option>
                </select>
                <select
                    id="shipping-type"
                    value={shippingType}
                    onChange={(event) => setShippingType(event.target.value)}
                >
                    <option value="">Selecione o tipo de envio</option>
                    <option value="teste1">teste1</option>
                    <option value="teste2">teste2</option>
                    <option value="teste3">teste3</option>
                </select>

                {isPaymentStep && (
                    <>
                        <h1>Pagamento</h1>
                        <form onSubmit={handlePaymentSubmit}>
                            <input
                                type="text"
                                id="card-number"
                                placeholder="Número do cartão"
                                value={cardNumber}
                                onChange={(event) => setCardNumber(event.target.value)}
                            />
                            <input
                                type="text"
                                id="expiration-date"
                                placeholder="Data de validade (MM/AA)"
                                value={expirationDate}
                                onChange={(event) => setExpirationDate(event.target.value)}
                            />
                            <input
                                type="text"
                                id="cvv"
                                placeholder="CVV"
                                value={cvv}
                                onChange={(event) => setCvv(event.target.value)}
                            />
                            <button type="submit">Pagar</button>
                        </form>
                    </>
                )}

                {!isPaymentStep && (
                    <button type="submit">Continuar</button>
                )}
            </form>
        </div>

    );

};

export default InfoAndPaymentScreen;