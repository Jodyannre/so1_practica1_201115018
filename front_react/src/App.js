import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from './components/Navigation'
import GetCarros from './components/GetCarros'
import CreateCar from './components/CreateCar'
/*
import NotesList from './components/NotesList'
import CreateNote from './components/CreateNote'

*/
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route path="/" exact component={GetCarros} />
        <Route path="/create" exact component={CreateCar} />
        {/*<Route path="/edit/:id" component={CreateNote} />
        <Route path="/create" component={CreateNote} />
  */}
      </div>
    </Router>
  );
}

export default App;