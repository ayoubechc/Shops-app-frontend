import React from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import SignIn from "./components/shops/SignIn";

function App() {
  return (
    <div>
      <Router> 
            <Switch>
              <Route exact path = "/" component ={SignIn}/>
            </Switch>
     </Router>
    </div>
  );
}

export default App;
