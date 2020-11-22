import React from "react";

import Menubar from "../components/MenubarComponent";
import GenericTable from "../components/GenericTable";

const Clientes = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);

  const data = [
    {
      id: 1,
      cpf: "123456798",
      nome: "Gabriel Maeda",
      endereco: "Rua das palmeiras 7015",
      email: "maeda@yahoo.com",
      telefone: "30159963",
    },
    {
      id: 2,
      cpf: "321965156",
      nome: "Michely Tamessawa",
      endereco: "Avenida do sorvete 123",
      email: "michely@hotmail.com",
      telefone: "99192658",
    },
    {
      id: 3,
      cpf: "987632541",
      nome: "Maicon Qister",
      endereco: "Rua dos famosos 40",
      email: "maicao@gmail.com",
      telefone: "9881452635",
    },
    {
      id: 4,
      cpf: "456951236",
      nome: "Edson Rogerio",
      endereco: "Rua das salamandras 78",
      email: "Edson_junior@hotmail.com",
      telefone: "99185623",
    },
  ];

  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="clientes">
        <h2>Clientes:</h2>
        <GenericTable data={data} title="Clientes" />
      </div>
    </>
  );
};

export default Clientes;
