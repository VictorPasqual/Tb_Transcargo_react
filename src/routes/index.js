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
import MyLoads from '../pages/myLoads/MyLoads';
import CreateRoute from '../pages/pageOfCreate/createRoute/CreateRoute'
import CreateTrucks from '../pages/pageOfCreate/createTrucks/CreateTrucks'
import ChangePassword from '../pages/forgotPassword/ChangePassword.js'
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
                                <Route path="/myLoads" component={MyLoads} />
                                <Route path="/createRoute" component={CreateRoute}/>
                                <Route path="/createTrucks" component={CreateTrucks}/>
                            </Switch>
                        </Route>
                    )} /> :
                    <>
                        <Route exact path="/" component={Login} />
                        <Route path="/signup" component={Register} />
                        <Route path="/changePassword" component={ChangePassword}/>
                    </>
                }


            </Switch>
        </Router>)
}