import React from 'react';
import './Home.css';

const HomeScreen = (props) => {
    const { userRole } = props;

    return (
        <div className='container'>
      
            <h2 className='AgilidadeText'>
                Agilidade e comprometimento
                no transporte nacional e
                internacional
            </h2>
            <div className='blackbox'></div>
            <div className='blackbox2'></div>
            <div className='blackbox3'></div>
            <h3 className='ConhecaText'>
                Conheça nossos serviços ↦
            </h3>
            <div className='blackbox4'></div>
        </div>
    );
};

export default HomeScreen;
