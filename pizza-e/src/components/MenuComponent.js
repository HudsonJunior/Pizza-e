import React from 'react'
import "./styles/MenuStyle.css"


const menu = () => {
    return (
        <div className="boxMenu">
            <a href="#home">Home</a>
            <a href="#news">Cardápio</a>
            <a href="#news">Minha Conta</a>
            <div class="dropdown">
                <button class="dropbtn">Área de Funcionário
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