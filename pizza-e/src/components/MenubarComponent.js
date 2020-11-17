import "./styles/MenuStyle.css"
import React from 'react'
import {Link} from 'react-router-dom'


const menu = () => {
    return (
        <div className="boxMenu">
            <Link to="/">Home</Link>
            <Link to="/cardapio">Cardápio</Link>
            <Link to="/conta">Minha Conta</Link>
            <div className="dropdown">
                <button className="dropbtn">Área de Funcionários
                    <i class="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                    <Link to="/func/pedidos">Pedidos</Link>
                    <Link to="/func/clientes">Clientes</Link>
                    <Link to="/func/produtos">Produtos</Link>
                    <Link to="/func/estoque">Estoque</Link>
                </div>
            </div>
            <div className = "dropdown2">
                <button className = "dropbtn2"> Área do Gerente
                    <i class="fa fa-caret-down"></i>
                </button>
                <div className="dropdown2-content">
                    <Link to="/gerente/funcionarios">Gerenciar Funcionários</Link>
                    <Link to="/gerente/relatorios">Relatórios</Link>
                </div>
            </div>
        </div>
    )
}

export default menu