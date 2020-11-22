import "./styles/MenuStyle.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import btnCadastrar from "../components/ButtonCadastrar";
import { FiLogOut } from "react-icons/fi";

import { useHistory } from "react-router-dom";

const Menu = ({ currentUser }) => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("user");
    history.push("/");
  };

  return (
    <div className="boxMenu">
      <div
        className="dropdownContainer"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="left">
          <Link to="/">🍕 Home</Link>
          <Link to="/cardapio">Cardápio</Link>
          <Link to="/conta">Minha Conta</Link>
          {currentUser && currentUser.type !== "C" && (
            <div className="dropdown1">
              <button className="dropbtn">
                Área de Funcionários
                <i class="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-content">
                <a href="/pedidos">Pedidos</a>
                <a href="/clientes">Clientes</a>
                <a href="/produtos">Produtos</a>
                <a href="/estoque">Estoque</a>
              </div>
            </div>
          )}
          {currentUser && currentUser.type === "G" && (
            <div className="dropdown2">
              <button className="dropbtn2">
                {" "}
                Área do Gerente
                <i class="fa fa-caret-down"></i>
              </button>
              <div className="dropdown2-content">
                <a href="/funcionarios">Gerenciar Funcionários</a>
                <a href="/relatorios-venda">Relatórios de Venda</a>
                <a href="/relatorios-satisfacao">Relatórios de Satisfação</a>
                <a href="/relatorios-estoque">Relatórios de Estoque</a>
              </div>
            </div>
          )}
        </div>

        {currentUser && (
          <div className="btnLogout">
            <button
              onClick={handleLogout}
              style={{
                margin: 8,
                backgroundColor: "transparent",
                border: "none",
              }}
            >
              <FiLogOut className="icon" size={22} color="white" />
            </button>
          </div>
        )}
        {!currentUser && <a href="/login">Login</a>}
      </div>
    </div>
  );
};

export default Menu;
