import React from "react";
import {Switch, Route} from 'react-router-dom'

import Login from "../src/pages/Login"
import Cardapio from "./pages/Cardapio";
import Home from "./pages/HomePage"
import TopNav from './pages/TopNav'

const App = () => {
    return (
      <div className="App">
        <TopNav></TopNav>
        <Switch>
          <Route exact path="/" component = {Home}/>
          <Route path="/cardapio" component = {Cardapio}/>

        </Switch>
      </div>
    )
  }
  

export default App;
