import React from "react";
import { Switch, Route } from "react-router-dom";
import "./components/styles/App.css";

import Login from "../src/pages/Login";
import Header from "./components/HeaderComponent";
import Menubar from "./components/MenubarComponent";
import Footer from "./components/FooterComponent";

import Cardapio from "./pages/Cardapio";
import Home from "./pages/HomePage";
import minhaConta from "./pages/minhaConta";
import Pedidos from "./pages/Pedidos";
import Clientes from "./pages/Clientes";
import Produtos from "./pages/Produtos";
import Estoque from "./pages/Estoque";
import Funcionarios from "./pages/Funcionarios";
import Relatorios from "./pages/Relatorio";
import CadastrarCliente from "./pages/CadastrarCliente";
import FuncCadastrarCliente from "./pages/FuncCadastrarCliente";
import RelatorioSatisfacao from "./pages/RelatorioSatisfacao";
const App = () => {
  return (
    <body>
      <div className="wrapper">
        <div className="containerApp">
          <Header />
          {/* <Menubar/> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/cardapio" component={Cardapio} />
            <Route path="/minhaConta" component={minhaConta} />
            <Route path="/func/pedidos" component={Pedidos} />
            <Route path="/func/clientes" component={Clientes} />
            <Route path="/func/produtos" component={Produtos} />
            <Route path="/func/estoque" component={Estoque} />
            <Route path="/clientes/cadastrarCliente" component={CadastrarCliente} />
            <Route path="/func/cadastrarCliente" component={FuncCadastrarCliente} />
            <Route path="/gerente/funcionarios" component={Funcionarios} />
            <Route path="/gerente/relatorios" component={RelatorioSatisfacao} />
          </Switch>
        </div>
        <Footer className="footer" />
      </div>
    </body>
  );
};

export default App;
