import React from "react";
import {Switch, Route} from 'react-router-dom'
import './components/styles/App.css'
import Login from "../src/pages/Login";
import Cardapio from "./pages/Cardapio";
import Home from "./pages/HomePage";
import Header from './components/HeaderComponent';
import Menubar from './components/MenubarComponent';
import Footer from './components/FooterComponent';
import minhaConta from "./pages/minhaConta";

const App = () => {
    return (
      <div className="containerPage">
      <div className ="contentWrap">
          <Header/>
          <Menubar/>
          <Switch>
            <Route exact path="/" component = {Home}/>
            <Route path="/cardapio" component = {Cardapio}/>
            <Route path="/minhaConta" component = {minhaConta}/>
          </Switch>
      </div>
      <Footer/>
    </div>
    )
  }
  

export default App;