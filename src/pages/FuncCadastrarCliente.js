import React from "react";
import FuncCadastrarClienteComponents from "../components/FuncCadastrarClienteComponent";
import Menubar from "../components/MenubarComponent";

const FuncCadastrarCliente = (props) => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);
  var tipo = props.location.state ? props.location.state.tipo : "";

  return (
    <>
      <Menubar currentUser={convertedUser} />
      <FuncCadastrarClienteComponents
        type={tipo}
      ></FuncCadastrarClienteComponents>
      ;
    </>
  );
};

export default FuncCadastrarCliente;
