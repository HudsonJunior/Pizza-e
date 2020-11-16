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
                    <Link href="#">Pedidos</Link>
                    <Link href="#">Clientes</Link>
                    <Link href="#">Produtos</Link>
                    <Link href="#">Estoque</Link>
                    <Link href="#">Relatório</Link>
                </div>
            </div>
        </div>
    )
}

export default menu