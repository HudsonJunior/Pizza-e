import "./styles/MenuStyle.css"
import React from 'react'
import {Link} from 'react-router-dom'


const menu = () => {
    return (
        <div className="boxMenu">
            <Link to="/">Home</Link>
            <Link to="/cardapio">Cardápio</Link>
            <Link to="/conta">Minha Conta</Link>
            <div class="dropdown">
                <button class="dropbtn">Área de Funcionários
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    <a href="#">Pedidos</a>
                    <a href="#">Clientes</a>
                    <a href="#">Produtos</a>
                    <a href="#">Estoque</a>
                    <a href="#">Relatório</a>
                </div>
            </div>
        </div>
    )
}

export default menu