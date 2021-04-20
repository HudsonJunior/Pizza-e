import React from "react";
import { Switch, Route } from "react-router-dom";
import "./components/styles/App.css";

import Login from "../src/pages/Login";
import Header from "./components/HeaderComponent";
import Footer from "./components/FooterComponent";

import Chatbot from "./pages/Chatbot"
import Cardapio from "./pages/Cardapio";
import Home from "./pages/HomePage";
import minhaConta from "./pages/minhaConta";
import Pedidos from "./pages/Pedidos";
import GerenciaPedido from "./pages/GerenciarPedido";
import Clientes from "./pages/Clientes";
import Produtos from "./pages/Produtos";
import Estoque from "./pages/Estoque";
import Funcionarios from "./pages/Funcionario";
import CadastrarEstoque from "./pages/CadastrarEstoque";
import EditarEstoque from "./pages/EditarEstoque";
import CadastrarFuncionario from "./pages/CadastrarFuncionario";
import EditarFuncionario from "./pages/EditarFuncionario";
import RelatoriosVenda from "./pages/RelatoriosVenda";
import EditarClientes from "./pages/EditarClientes";
import RelatoriosEstoque from "./pages/RelatoriosEstoque";
import GerenciarProduto from "./pages/GerenciarProduto";
import CadastrarCliente from "./pages/CadastrarCliente";
import FuncCadastrarCliente from "./pages/FuncCadastrarCliente";
import RelatoriosSatisfacao from "./pages/RelatorioSatisfacao";
import RevisarPedidoCliente from "./pages/RevisarPedidoCliente";
import ConcluirPedidoCliente from "./pages/ConcluirPedidoCliente";


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
            <Route path="/gerenciar-pedido" component={GerenciaPedido} />
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
            <Route path="/editar-clientes" component={EditarClientes}/>
            
            <Route path="/relatorios-venda" component={RelatoriosVenda} />
            <Route
              path="/relatorios-satisfacao"
              component={RelatoriosSatisfacao}
            />
            <Route path="/relatorios-estoque" component={RelatoriosEstoque} />
            <Route path="/gerenciar-produto" component={GerenciarProduto} />
            <Route path="/cadastrar-cliente" component={CadastrarCliente} />
            <Route
              path="/funcionario-cadastrar-cliente"
              component={FuncCadastrarCliente}
            />
            <Route path="/revisar-pedido" component={RevisarPedidoCliente} />
            <Route path="/concluir-pedido" component={ConcluirPedidoCliente} />
          </Switch>
          <div className="push"></div>
          <Chatbot/>
        </div>
        <Footer className="footer" />
      </div>
    </body>
  );
};

export default App;
