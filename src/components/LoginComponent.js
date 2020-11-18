import React, { useState } from "react";
import "./styles/LoginComponentStyle.css";
import pizza from "./../images/pizza.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();

  const toastStyle = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");

  const cadastrarButton = () => {
    // chamar tela de cadastro
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const users = [
      {
        id: Math.random(String()),
        name: "cliente",
        type: "C",
        password: "123senha",
      },
      {
        id: Math.random(String()),
        name: "funcionario",
        type: "F",
        password: "123senha",
      },
      {
        id: Math.random(String()),
        name: "gerente",
        type: "G",
        password: "123senha",
      },
    ];

    const currentUser = users.find((elemento) => elemento.name === user);
    if (currentUser.password === senha) {
      toast.success("🍕 Login feito!", {
        toastStyle,
      });
      localStorage.setItem("user", JSON.stringify(currentUser));
      setTimeout(() => {
        history.push("/");
      }, 1500);
    } else {
      return toast.error("🍕 Credenciais incorretas", {
        toastStyle,
      });
    }
  };

  return (
    <div className="blockLogin border border-dark loginDiv">
      <img src={pizza} alt="Pizza"></img>
      <h1>Pizza-e</h1>
      <h1 style={{ marginBottom: 30 }}>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          className="loginInput"
          value={user}
          type="text"
          name="CPF"
          onChange={(event) => setUser(event.target.value)}
          placeholder="CPF/CNPJ"
        ></input>
        <input
          className="loginInput"
          value={senha}
          type="password"
          onChange={(event) => setSenha(event.target.value)}
          name="Senha"
          placeholder="Digite sua senha"
        ></input>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <button className="loginButton" onClick={cadastrarButton()}>
            {" "}
            Cadastrar
          </button>
          <button name="Login" type="submit" className="loginButton">
            Entrar
          </button>
        </div>
        <a href="url"> Esqueci minha senha</a>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
