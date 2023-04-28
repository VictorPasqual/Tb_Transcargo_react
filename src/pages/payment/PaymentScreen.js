import React, { useState } from 'react';
import Navbar from '../../components/navbar/NavBar';
import ImageForms from '../../assets/iconTrack.png'
import { useHistory } from "react-router-dom";
import './PaymentScreen.css'

const InfoAndPaymentScreen = () => {

    const history = useHistory()

    // estados para os campos do formulário de informações
    const [cnpjOrCpf, setCnpjOrCpf] = useState('');
    const [trackingCode, setTrackingCode] = useState('');
    const [recipient, setRecipient] = useState('');
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState('');
    const [shippingType, setShippingType] = useState('');

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
        )
        {
            alert('Por favor, preencha todos os campos.');
            history.push('/paymentCheckout')
        } else {
            setIsPaymentStep(true);
        }
    };


    // função para atualizar o estado de "cnpjOrCpf" com base na opção selecionada
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setCnpjOrCpf('');
    };

    return (
        <div className="containerPayment">
      
            <h1 className='info'>Informações {'>'}{'>'}</h1>
            <h1 className='pag'>Pagamento {'>'}{'>'}</h1>
            <h1 className='fim'>Fim</h1>
            <form onSubmit={handleInfoSubmit} className='formsPayment'>
                <div className='imagePayment'>
                    <img src={ImageForms} alt='ImageForms' />
                </div>
                <div className='cpf'>
                    <input
                        type="radio"
                        id="cpf"
                        name="document"
                        value="cpf"
                        checked={selectedOption === 'cpf'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="cpf" className='label-cpf-cnpj'>CPF</label>
                </div>
                <div className="cnpj">
                    <input
                        type="radio"
                        id="cnpj"
                        name="document"
                        value="cnpj"
                        checked={selectedOption === 'cnpj'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="cnpj" className='label-cpf-cnpj'>CNPJ</label>
                </div>

                {
                    selectedOption === 'cpf' && (
                        <input
                            type="text"
                            id="cpf"
                            className='cpf-input'
                            placeholder="CPF"
                            value={cnpjOrCpf}
                            onChange={(event) => setCnpjOrCpf(event.target.value)}
                        />
                    )
                }

                {
                    selectedOption === 'cnpj' && (
                        <input
                            type="text"
                            id="cnpj"
                            className='cnpj-input'
                            placeholder="CNPJ"
                            value={cnpjOrCpf}
                            onChange={(event) => setCnpjOrCpf(event.target.value)}
                        />
                    )
                }

                <input
                    input
                    type="text"
                    id="tracking-code"
                    className="tracking-code-input"
                    placeholder="Código de rastreamento"
                    value={trackingCode}
                    onChange={(event) => setTrackingCode(event.target.value)}
                />
                <input
                    type="text"
                    id="recipient"
                    className="recipient-input"
                    placeholder="Destinatário"
                    value={recipient}
                    onChange={(event) => setRecipient(event.target.value)}
                />
                <input
                    type="text"
                    id="address"
                    className="address-input"
                    placeholder="Endereço de entrega"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
                <select
                    id="category"
                    className="category-select"
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
                    className="shipping-type-select"
                    value={shippingType}
                    onChange={(event) => setShippingType(event.target.value)}
                >
                    <option value="">Selecione o tipo de envio</option>
                    <option value="teste1">teste1</option>
                    <option value="teste2">teste2</option>
                    <option value="teste3">teste3</option>
                </select>


                <button type="submit" className='buttonContinuar'>Continuar</button>
            </form >
        </div >

    );

};

export default InfoAndPaymentScreen;