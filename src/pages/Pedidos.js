import React, { useState } from "react";

import Menubar from "../components/MenubarComponent";
import GenericTable from "../components/GenericTable";

const Pedidos = () => {

  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);

  // const [id_pedido, setIdPedido] = useState("");

  // const BuscarPedido = (id_pedido) => {};

  const data = [
    {
      id: 1,
      descricao: "Pizza P calabresa, refrigerante",
      pagamento: "dinheiro",
      expedicao: "retirado no balcao",
      data: "12-09-2020",
      CPF: "não cadastrado",
      observacoes: "nenhuma",
      valor: 30.00,
      status: "Pedido Realizado"
    },
    {
      id: 2,
      descricao: "Pizza P frango, refrigerante",
      pagamento: "dinheiro",
      expedicao: "retirado no balcao",
      data: "12-09-2020",
      CPF: "não cadastrado",
      observacoes: "nenhuma",
      valor: 30.00,
      status: "Em preparo"
    },
    {
      id: 3,
      descricao: "Pizza P frango e bacon, refrigerante",
      pagamento: "dinheiro",
      expedicao: "retirado no balcao",
      data: "12-09-2020",
      CPF: "não cadastrado",
      observacoes: "nenhuma",
      valor: 35.00,
      status: "Na viagem"
    },
    {
      id: 4,
      descricao: "Pizza P brócolis, refrigerante",
      pagamento: "dinheiro",
      expedicao: "retirado no balcao",
      data: "12-09-2020",
      CPF: "não cadastrado",
      observacoes: "nenhuma",
      valor: 40.00,
      status: "Entregue"
    },
    {
      id: 5,
      descricao: "Pizza P lombo, refrigerante",
      pagamento: "dinheiro",
      expedicao: "retirado no balcao",
      data: "12-09-2020",
      CPF: "não cadastrado",
      observacoes: "nenhuma",
      valor: 45.00,
      status: "Cancelado"
    },
  ];

  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="pedidos">
        <h2>Pedidos:</h2>
        <GenericTable data={data} title="Pedidos" />
      </div>
    </>
  );
};

export default Pedidos;
