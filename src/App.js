import React from 'react';
import './App.css';
import routes from './routes';
import {withRouter} from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Header from './Components/Header/Header'


function App(props) {
  return (
    <div className="App">
        <Header />
        <Nav />
        {props.location.pathname === '/' ? null: <Nav history={props.location}/>}
        {routes}
    </div>
  );
}

export default withRouter(App);
