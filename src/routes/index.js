import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
    const { user } = useAuth();

    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <>
                        <Navbar />
                        <Component {...props} />
                    </>
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/signup" component={Register} />
                <Route path="/changePassword" component={ChangePassword} />
                <PrivateRoute path="/trackScreen" component={Track} />
                <PrivateRoute path="/delivery" component={TrackDelivery} />
                <PrivateRoute path="/mapa" component={MapPage} />
                <PrivateRoute path="/paymentScreen" component={Payment} />
                <PrivateRoute path="/paymentCheckout" component={Checkout} />
                <PrivateRoute path="/myLoads" component={MyLoads} />
                <PrivateRoute path="/createRoute" component={CreateRoute} />
                <PrivateRoute path="/createTrucks" component={CreateTrucks} />
                <PrivateRoute path="/" component={Home} />
            </Switch>
        </Router>
    );
}
