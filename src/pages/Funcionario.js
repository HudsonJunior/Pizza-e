import React, {useState, useEffect } from 'react';

import Menubar from "../components/MenubarComponent";
import GenericTable from "../components/GenericTable";

const axios = require('axios');

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
      endereco: "Rua da paixao 41",
      complemento: "perto da padaria do ze",
    },
    {
      nome: "Leticia Barbosa",
      senha: "",
      cpf: "164789135",
      rg: "156356",
      carteira_trabalho: "2865",
      cep: "86600878",
      endereco: "Rua da amorindas 22",
      complemento: "",
    },
    {
      nome: "Eduardo Bonito",
      senha: "",
      cpf: "753963125",
      rg: "125412",
      carteira_trabalho: "7526",
      cep: "75003333",
      endereco: "Avenida Maracana 31",
      complemento: "atras do colegio",
    },
    {
      nome: "Marcos Caetano",
      senha: "",
      cpf: "912673256",
      rg: "456951",
      carteira_trabalho: "3025",
      cep: "85003695",
      endereco: "Rua Marechal Novo 55",
      complemento: "em frente a prefeitura",
    },
  ];


  const [func, setFunc] = React.useState([]);
  useEffect(() => {
      getFuncs()
    }, []);

  const getFuncs = async () => {
    const response = await axios.get(
      `http://localhost:8080/funcionarios`
    );
    const funcResponse = await response;
    const funcArray = funcResponse.data;

    setFunc(funcArray);
    };


  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="funcionario">
        <h2>Funcionários:</h2>
        <GenericTable data={func} title="Funcionarios" />
      </div>
    </>
  );
};

export default Funcionarios;
