import React, { useState } from "react";

import Menubar from "../components/MenubarComponent";
import GenericTable from "../components/GenericTable";

const Estoque = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);

  const [id_pedido] = useState("");

  const BuscarEstoque = (cod) => {};

  const produtos_estoque = [
    {
      nome: "Molho tomate",
      codigo: "1063",
      marca: "Arcol",
      quantidade: "3",
      valor: "0,50",
      peso: "30g",
      validade: "30/11/2020",
      fabricacao: "30/05/2019",
      status: "desativado",
      data_registro: "02/06/2020",
      data_remocao: "05/10/2020",
    },
    {
      nome: "Cebola",
      codigo: "1067",
      marca: "Chimizu",
      quantidade: "5",
      valor: "3,25",
      peso: "10g",
      validade: "30/12/2020",
      fabricacao: "30/07/2020",
      status: "desativado",
      data_registro: "02/06/2020",
      data_remocao: "02/10/2020",
    },
    {
      nome: "Papel higiênico",
      codigo: "1010",
      marca: "Neve",
      quantidade: "0",
      valor: "2,10",
      peso: "100g",
      validade: "",
      fabricacao: "",
      status: "desativado",
      data_registro: "02/06/2020",
      data_remocao: "02/10/2020",
    },
  ];

  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="estoque">
        <h2>Estoque:</h2>
        <GenericTable data={produtos_estoque} title="Estoque" />
      </div>
    </>
  );
};

export default Estoque;
