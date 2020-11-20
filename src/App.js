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
import Funcionarios from "./pages/Funcionario";
import Relatorios from "./pages/Relatorio";
import CadastrarEstoque from "./pages/CadastrarEstoque";
import EditarEstoque from "./pages/EditarEstoque";
import CadastrarFuncionario from "./pages/CadastrarFuncionario";
const App = () => {
  return (
    <body>
      <div className="wrapper">
        <div className="containerApp">
          {/* <Menubar/> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/cardapio" component={Cardapio} />
            <Route path="/minhaConta" component={minhaConta} />
            <Route path="/pedidos" component={Pedidos} />
            <Route path="/clientes" component={Clientes} />
            <Route path="/produtos" component={Produtos} />
            <Route path="/estoque" component={Estoque} />
            <Route path="/funcionarios" component={Funcionarios} />
            <Route path="/relatorios" component={Relatorios} />
            <Route path="/editar-estoque" component={EditarEstoque} />
            <Route path="/cadastrar-estoque" component={CadastrarEstoque} />
            <Route
              path="/cadastrar-funcionario"
              component={CadastrarFuncionario}
            />
          </Switch>
        </div>
        <Footer className="footer" />
      </div>
    </body>
  );
};

export default App;
