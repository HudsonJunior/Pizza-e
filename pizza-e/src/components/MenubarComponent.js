import "./styles/MenuStyle.css";
import React from "react";
import { Link } from "react-router-dom";

const menu = () => {
  return (
    <div className="boxMenu">
      <Link to="/">Home</Link>
      <Link to="/cardapio">Cardápio</Link>
      <Link to="/minhaConta">Minha Conta</Link>
      <div className="dropdown">
        <button className="dropbtn">
          Área de Funcionários
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <a href="#">Pedidos</a>
          <a href="#">Clientes</a>
          <a href="#">Produtos</a>
          <a href="#">Estoque</a>
          <a href="#">Relatório</a>
        </div>
      </div>
    </div>
  );
};

export default menu;
