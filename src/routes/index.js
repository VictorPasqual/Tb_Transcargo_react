import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../pages/loginUser/Login';
import Register from '../pages/registerUser/Register';
import Track from '../pages/track-delivery/Track'
import TrackDelivery from '../pages/track-delivery/Delivery';
import Payment from '../pages/payment/PaymentScreen'
import Checkout from '../pages/payment/PaymentCheckout'
import MapPage from '../pages/track-delivery/MapPage';
import Home from '../pages/home/Home.js'
import Navbar from '../components/navbar/NavBar';
import { useAuth } from "../hooks/auth";



export default function Routes() {

    const { user } = useAuth()

    return (
        <Router>
            <Switch>
                {!!user?.id ?
                    <Route render={() => (
                        <Route>
                            <Navbar />
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/trackScreen" component={Track} />
                                <Route path="/delivery" component={TrackDelivery} />
                                <Route path="/mapa" component={MapPage} />
                                <Route path="/paymentScreen" component={Payment} />
                                <Route path="/paymentCheckout" component={Checkout} />
                            </Switch>
                        </Route>
                    )} /> :
                    <>
                        <Route exact path="/" component={Login} />
                        <Route path="/signup" component={Register} />
                    </>
                }


            </Switch>
        </Router>)
}