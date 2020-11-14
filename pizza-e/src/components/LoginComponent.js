import React from 'react'
import './styles/LoginComponentStyle.css'

const Login = () => {
    
    return(
        <div className= "blockLogin border border-dark loginDiv">
            <h1 style={{marginBottom: 50}}>Login</h1>
            <input
                className="loginInput"
                type="text"
                name="CPF"
                placeholder="CPF/CNPJ"
            >
            </input>
            <input
                className="loginInput"
                type="password"
                name="Senha"
                placeholder="Digite sua senha"
            >
            </input>
            <div
                style={{flexDirection:"row", display:"flex"}}
            >
            <button className="loginButton"> Cadastrar</button>
            <button
                name="Login"
                onClick= {() => {}}
                className="loginButton"
            >
            Entrar 
            </button>
            </div>
            <a href="url"> Esqueci minha senha</a>
        </div>
    );

}

export default Login