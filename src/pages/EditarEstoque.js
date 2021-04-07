import React from "react";
import Menubar from "../components/MenubarComponent";
import FormEstoque from "../components/FormEstoque";
import "../components/styles/FormStyle.css";


const EditarEstoque = (props) => {
  console.log('flag')
  const { item } = props
  console.log(item)
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);
  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="flexForm containerForm">
        <div className="contentForm">
          <h2>Editar produto no estoque</h2>
          <p>Atualize os dados desejados...</p>
          <FormEstoque type="editar" item={item}/>
        </div>
      </div>
    </>
  );
};

export default EditarEstoque;
