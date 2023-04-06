import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './views/loginUser/Login';
import Register from './views/registerUser/Register';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/signup">Register</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
