import React from 'react';
import './App.css';
import VCB from './VCB/VCB';
import VCB1 from './VCB/Refactor/VCB';
import {BrowserRouter,Switch, Route} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <VCB /> */}
        <Route exact path='/' component={VCB} />
        <Route exact path='/vcb' component={VCB1} />
      </Switch>
    </BrowserRouter>
  );
}


export default App;
