import React from "react";
import { Switch, Route } from "react-router-dom";
import "./components/styles/App.css";

import Login from "../src/pages/Login";
import Header from "./components/HeaderComponent";
import Footer from "./components/FooterComponent";

import Cardapio from "./pages/Cardapio";
import Home from "./pages/HomePage";
import minhaConta from "./pages/minhaConta";
import Pedidos from "./pages/Pedidos";
import RegistrarPedidos from "./pages/RegistrarPedido";
import Clientes from "./pages/Clientes";
import Produtos from "./pages/Produtos";
import Estoque from "./pages/Estoque";
import Funcionarios from "./pages/Funcionario";
import CadastrarEstoque from "./pages/CadastrarEstoque";
import EditarEstoque from "./pages/EditarEstoque";
import CadastrarFuncionario from "./pages/CadastrarFuncionario";
import EditarFuncionario from "./pages/EditarFuncionario";
import RelatoriosVenda from "./pages/RelatoriosVenda";
import RelatoriosEstoque from "./pages/RelatoriosEstoque";

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
            <Route path="/registrar-pedidos" component={RegistrarPedidos} />
            <Route path="/clientes" component={Clientes} />
            <Route path="/produtos" component={Produtos} />
            <Route path="/estoque" component={Estoque} />
            <Route path="/funcionarios" component={Funcionarios} />
            <Route path="/editar-estoque" component={EditarEstoque} />
            <Route path="/cadastrar-estoque" component={CadastrarEstoque} />
            <Route
              path="/cadastrar-funcionario"
              component={CadastrarFuncionario}
            />
            <Route path="/editar-funcionario" component={EditarFuncionario} />
            <Route path="/relatorios-venda" component={RelatoriosVenda} />
            <Route path="/relatorios-estoque" component={RelatoriosEstoque} />
          </Switch>
          <div className="push"></div>
        </div>
        <Footer className="footer" />
      </div>
    </body>
  );
};

export default App;
