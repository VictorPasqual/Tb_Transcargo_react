import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/loginUser/Login';
import Register from './pages/registerUser/Register';
import Track from './pages/track-delivery/Track'
import TrackDelivery from './pages/track-delivery/Delivery';
import Payment from './pages/payment/PaymentScreen'
import Checkout from './pages/payment/PaymentCheckout'
import MapPage from './pages/track-delivery/MapPage';
import Home from './pages/home/Home.js'
import EntranceScreen from './components/loadingInicio/loadingInicio';
import Navbar from '../src/components/navbar/NavBar';

function App() {
  const [isLoading, setIsLoading] = useState(true);


  setTimeout(() => {
    setIsLoading(false);
  }, 3000);


  return (
    <>
      {isLoading ? (
        <EntranceScreen />
      ) : (
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Register} />
            <Route render={(props) => (
              <Route>
                <Navbar  />
                <Switch>
                  <Route path="/home" component={Home}  />
                  <Route path="/trackScreen" component={Track}  />
                  <Route path="/delivery" component={TrackDelivery} />
                  <Route path="/mapa" component={MapPage} />
                  <Route path="/paymentScreen" component={Payment} />
                  <Route path="/paymentCheckout" component={Checkout} />
                </Switch>
              </Route>
            )} />
          </Switch>
        </Router>
      )}
    </>
  );
}

export default App;