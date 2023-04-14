import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './pages/loginUser/Login';
import Register from './pages/registerUser/Register';
// import Teste from './pages/teste/Home';
import Home from './pages/home/Home'
import EntranceScreen from './components/loadingInicio/loadingInicio'; // Importe o componente EntranceScreen
// import Global from './styles/global';


function App() {
  const [isLoading, setIsLoading] = useState(true); // Adicione o estado isLoading para controlar a exibição da tela de entrada

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {/* <Teste boxData={data}/> */}
      {isLoading ? (
        // Renderize a tela de entrada enquanto isLoading for verdadeiro
        <EntranceScreen />
      ) : (
        // Renderize o conteúdo do aplicativo depois que a animação de entrada terminar
        <Router>
          {/* <nav>
            <ul>
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/signup">Register</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
            </ul>
          </nav> */}

          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Register} />
            <Route path="/home" component={Home}/>
          </Switch>
        </Router>
      )}
    </>
  );
}

export default App;
