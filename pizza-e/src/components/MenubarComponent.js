import "./styles/MenuStyle.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import btnCadastrar from "../components/ButtonCadastrar";
import { FiLogOut } from "react-icons/fi";

const Menu = ({ currentUser }) => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
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
          <Link to="/">Home</Link>
          <Link to="/cardapio">Cardápio</Link>
          <Link to="/conta">Minha Conta</Link>
          {currentUser && currentUser.type !== "C" && (
            <div className="dropdown">
              <button className="dropbtn">
                Área de Funcionários
                <i class="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-content">
                <Link to="/func/pedidos">Pedidos</Link>
                <Link to="/func/clientes">Clientes</Link>
                <Link to="/func/produtos">Produtos</Link>
                <Link to="/func/estoque">Estoque</Link>
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
                <Link to="/gerente/funcionarios">Gerenciar Funcionários</Link>
                <Link to="/gerente/relatorios">Relatórios</Link>
              </div>
            </div>
          )}
        </div>

        {currentUser && (
          <button
            onClick={handleLogout}
            style={{
              marginRight: 10,
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <FiLogOut size={22} color="white" />
          </button>
        )}
        {!currentUser && <Link to="/login">Login</Link>}
      </div>
    </div>
  );
};

export default Menu;
