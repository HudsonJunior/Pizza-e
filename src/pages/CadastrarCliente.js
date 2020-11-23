import React from "react";
import CadastrarClienteComponents from "../components/cadastrarClienteComponents";
import Menubar from "../components/MenubarComponent";

const CadastrarCliente = (props) => {
  var tipo = props.location.state ? props.location.state.tipo : "";
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);
  return (
    <>
      <Menubar currentUser={convertedUser} />
      <CadastrarClienteComponents type={tipo}></CadastrarClienteComponents>;
    </>
  );
};

export default CadastrarCliente;
