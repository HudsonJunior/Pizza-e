import React from "react";
import Menubar from "../components/MenubarComponent";
import Assistente from "../components/AssistentComponent";
import "../components/styles/EstoqueStyle.css";
const EditarEstoque = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);
  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="flexEstoque containerEstoque">
        <div className="contentEstoque">
          <h2>Editar produto no estoque</h2>
          <Assistente />
        </div>
      </div>
    </>
  );
};

export default EditarEstoque;
