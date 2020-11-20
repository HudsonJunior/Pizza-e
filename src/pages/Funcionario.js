import React, { useState } from "react";

import Menubar from "../components/MenubarComponent";
import GenericTable from "../components/GenericTable";

const Funcionarios = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);

  const [id_pedido] = useState("");

  const BuscarEstoque = (cod) => {};

  const funcionarios = [
    {
      nome: "Hudson Cizeski",
      senha: "",
      cpf: "123987456",
      rg: "159753",
      carteira_trabalho: "2086",
      cep: "86600895",
      endereco: "Rua da paixao",
      complemento: "41",
    },
    {
      nome: "Leticia Barbosa",
      senha: "",
      cpf: "164789135",
      rg: "156356",
      carteira_trabalho: "2865",
      cep: "86600878",
      endereco: "Rua da amorindas",
      complemento: "10",
    },
    {
      nome: "Eduardo Bonito",
      senha: "",
      cpf: "753963125",
      rg: "125412",
      carteira_trabalho: "7526",
      cep: "75003333",
      endereco: "Avenida Maracana",
      complemento: "25",
    },
    {
      nome: "Marcos Caetano",
      senha: "",
      cpf: "912673256",
      rg: "456951",
      carteira_trabalho: "3025",
      cep: "85003695",
      endereco: "Rua Marechal Novo",
      complemento: "963",
    },
  ];

  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="funcionario">
        <h2>Funcionários:</h2>
        <GenericTable data={funcionarios} title="Funcionarios" />
      </div>
    </>
  );
};

export default Funcionarios;
