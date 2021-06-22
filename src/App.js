import Home from './components/Home';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { DataContext } from './context/Context';

function App() {
  // const [presentItems, setPresentItems] = useState([]);
  return (
    <div className="App font-body">
      <Router>
        {/* <DataContext.Provider value={{ presentItems, setPresentItems }}> */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
        {/* </DataContext.Provider> */}
      </Router>
    </div>
  );
}

export default App;
