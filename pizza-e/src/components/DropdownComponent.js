import React from 'react'
import './styles/DropdownStyles.css'
const options = () => {
    return(
    <div class="dropdown">
        <button class="dropbtn">Área do Funcionário
            <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
            <a href="#">Pedidos</a>
            <a href="#">Produtos</a>
            <a href="#">Clientes</a>
            <a href="#">Estoque</a>
            <a href="#">Relatório</a>
        </div>
    </div>
    )
}

export default options