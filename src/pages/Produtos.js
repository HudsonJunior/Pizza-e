import React from "react";

import Menubar from "../components/MenubarComponent";
import GenericTable from "../components/GenericTable";

const Produtos = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);

  const data = [
    {
        tipo: 'Pizza',
        nome: '',
        codigo: "1",
        valor: "0,50",
        peso: "30g",
        status: "desativado",
        valorPromocional: "R$0,00",
        inicioPromo: "00/00/00",
        fimPromo: "00/00/00"
    },
    {
        tipo: 'Pizza',
        nome: '',
        codigo: "2",
        valor: "0,50",
        peso: "30g",
        status: "desativado",
        valorPromocional: "R$0,00",
        inicioPromo: "00/00/00",
        fimPromo: "00/00/00"
    },
    {
        tipo: 'Pizza',
        nome: '',
        codigo: "2",
        valor: "0,50",
        peso: "30g",
        status: "desativado",
        valorPromocional: "R$0,00",
        inicioPromo: "00/00/00",
        fimPromo: "00/00/00"
    },

    {
        tipo: 'Pizza',
        nome: '',
        codigo: "2",
        valor: "0,50",
        peso: "30g",
        status: "desativado",
        valorPromocional: "R$0,00",
        inicioPromo: "00/00/00",
        fimPromo: "00/00/00"
    },
    {
        tipo: 'Pizza',
        nome: '',
        codigo: "2",
        valor: "0,50",
        peso: "30g",
        status: "desativado",
        valorPromocional: "R$0,00",
        inicioPromo: "00/00/00",
        fimPromo: "00/00/00"
    },
    {
        tipo: 'Pizza',
        nome: '',
        codigo: "2",
        valor: "0,50",
        peso: "30g",
        status: "desativado",
        valorPromocional: "R$0,00",
        inicioPromo: "00/00/00",
        fimPromo: "00/00/00"
    },
    {
        tipo: 'Pizza',
        nome: '',
        codigo: "2",
        valor: "0,50",
        peso: "30g",
        status: "desativado",
        valorPromocional: "R$0,00",
        inicioPromo: "00/00/00",
        fimPromo: "00/00/00"
    },
    {
        tipo: 'Pizza',
        nome: '',
        codigo: "2",
        valor: "0,50",
        peso: "30g",
        status: "desativado",
        valorPromocional: "R$0,00",
        inicioPromo: "00/00/00",
        fimPromo: "00/00/00"
    },
  ];

  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="produtos">
        <h2>Produtos:</h2>
        <GenericTable data={data} title="Produtos" />
      </div>
    </>
  );
};

export default Produtos;
