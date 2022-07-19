import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/cart" exact component={Cart} />
      <Route exact path="/" component={Products} />
      </Switch>
    </Router>
  );
}

export default App;
