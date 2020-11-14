import React, { useEffect, useState } from 'react'
import './styles/LoginComponentStyle.css'
const Login = () => {
    
    return(
        <div>
            <input
                type="text"
                name="CPF"
                placeholder="CPF/CNPJ"
            >
            </input>
            <input
                type="password"
                name="Senha"
                placeholder="Digite sua senha"
            >
            </input>
            <button
                name="Enviar"
                placeholder="Enviar 2"
                onClick= {() => {}}
            >
            Enviar 
            </button>
        </div>
    );

}

export default Login