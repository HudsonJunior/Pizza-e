import React from "react";

import Menubar from "../components/MenubarComponent";
import GenericTable from "../components/GenericTable";

const Produtos = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);

  const data = [
    {
        tipo: 'Pizza',
        nome: 'Pizza P calabresa',
        codigo: "1",
        valor: "24.50",
        peso: "",
        status: "",
        ingredientes: `200 gramas de presunto fatiado.
        200 gramas de mussarela ralada.
        1 Gomo de linguiça calabresa.
        1 xícara de molho de tomate
        4 colheres de sopa de cebola ralada.
        1 Massa de pizza pronta.
        1 pitada de Orégano.
        1 fio de Azeite de oliva.`,
        adicionais: "Azeitonas a gosto",
        valorPromocional: "0.00",
        inicioPromo: "00/00/00",
        fimPromo: "00/00/00"
    },
    {
        tipo: 'Pizza',
        nome: 'Pizza P frango',
        codigo: "1",
        valor: "24.00",
        peso: "",
        status: "",
        ingredientes: `1 Massa de pizza pronta.
        1 pitada de Orégano.
        1 fio de Azeite de oliva.
        1 peito de frango
        1 xícara de molho de tomate
        10 fatias de queijo`,
        adicionais: "",
        valorPromocional: "0.00",
        inicioPromo: "00/00/00",
        fimPromo: "00/00/00"
    },
    {
        tipo: 'Pizza',
        nome: 'Pizza P frango e bacon',
        codigo: "1",
        valor: "29.00",
        peso: "",
        status: "",
        ingredientes: `1 Massa de pizza pronta.
        1 pitada de Orégano.
        1 fio de Azeite de oliva.
        1 peito de frango
        1 xícara de molho de tomate
        10 fatias de queijo
        150g de bacon
        `,
        adicionais: "",
        valorPromocional: "0.00",
        inicioPromo: "00/00/00",
        fimPromo: "00/00/00"
    },

    {
        tipo: 'Pizza',
        nome: 'Pizza P brócolis',
        codigo: "1",
        valor: "34.00",
        peso: "",
        status: "",
        ingredientes: `200 g de brócolis pré-cozido
        2 colheres de azeite
        2 dentes de alho picados
        1 Massa de pizza pronta
        300 g de mussarela ralada
        1 xícara de molho de tomate`,
        adicionais: "",
        valorPromocional: "0.00",
        inicioPromo: "00/00/00",
        fimPromo: "00/00/00"
    },
    {
        tipo: 'Pizza',
        nome: 'Pizza P lombo',
        codigo: "1",
        valor: "39.00",
        peso: "",
        status: "",
        ingredientes: `2 colheres de azeite
        2 dentes de alho picados
        400g de muçarela
        1 Massa de pizza pronta
        1 xícara de molho de tomate
        400g de lombinho canadense fatiado`,
        adicionais: "",
        valorPromocional: "0.00",
        inicioPromo: "00/00/00",
        fimPromo: "00/00/00"  
    },
    {
        tipo: 'Normal',
        nome: 'Refrigerante',
        codigo: "1",
        valor: "6.00",
        peso: "200g",
        status: "ativado",
        ingredientes: "",
        adicionais: "",
        valorPromocional: "0.00",
        inicioPromo: "00/00/00",
        fimPromo: "00/00/00"
    },
    {
        tipo: 'Normal',
        nome: 'Água',
        codigo: "1",
        valor: "3.50",
        peso: "100g",
        status: "ativado",
        ingredientes: "",
        adicionais: "",
        valorPromocional: "0.00",
        inicioPromo: "00/00/00",
        fimPromo: "00/00/00"
    },
    {
        tipo: 'Normal',
        nome: 'Suco',
        codigo: "1",
        valor: "5.00",
        peso: "150g",
        status: "ativado",
        ingredientes: "",
        adicionais: "",
        valorPromocional: "0.00",
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
