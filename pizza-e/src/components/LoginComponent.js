import React, { useState } from 'react'
import './styles/LoginComponentStyle.css'
import pizza from './../images/pizza.png'

const Login = props => {
    const [user, setUser] = useState("")
    const [senha, setSenha] = useState("")
    const [tipoUser, setTipoUser] = useState(1) //padrão é cliente

    const cadastrarButton = () => {
        // chamar tela de cadastro
    }

    const logarButton = () => {
        if(user === "blablabla") //funcionário
            setTipoUser(0)
        
        // chamar tela home
    }
    
    return(
        <div className= "blockLogin border border-dark loginDiv">
            <img
                src={ pizza } alt="Pizza"
            ></img>
            <h1>Pizza-e</h1>
            <h1 style={{marginBottom: 30}}>Login</h1>
            <input
                className="loginInput"
                type="text"
                name="CPF"
                onChange = {user => setUser(user)}
                placeholder="CPF/CNPJ"
            >
            </input>
            <input
                className="loginInput"
                type="password"
                onChange = {senha => setSenha(senha)}
                name="Senha"
                placeholder="Digite sua senha"
            >
            </input>
            <div
                style={{flexDirection:"row", display:"flex"}}
            >
            <button 
                className="loginButton"
                onClick = {cadastrarButton()}
                
                > Cadastrar</button>
            <button
                name="Login"
                onClick= {logarButton()}
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