import React, { useState } from "react";

import Menubar from "../components/MenubarComponent";
import GenericTable from "../components/GenericTable";

const Pedidos = () => {

  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);

  const [id_pedido, setIdPedido] = useState("");

  const BuscarPedido = (id_pedido) => {};

  const data = [
    {
      id: 1,
      descricao: "Pizza P calabresa, refrigerante",
      pagamento: "dinheiro",
      expedicao: "retirado no balcao",
      data: "12-09-2020",
      CPF: "não cadastrado",
      observacoes: "nenhuma",
      valor: 4.00,
    },
    {
      id: 2,
      descricao: "Pizza P calabresa, refrigerante",
      pagamento: "dinheiro",
      expedicao: "retirado no balcao",
      data: "12-09-2020",
      CPF: "não cadastrado",
      observacoes: "nenhuma",
      valor: 4.00,

    },
    {
      id: 3,
      descricao: "Pizza P calabresa, refrigerante",
      pagamento: "dinheiro",
      expedicao: "retirado no balcao",
      data: "12-09-2020",
      CPF: "não cadastrado",
      observacoes: "nenhuma",
      valor: 4.00,
    },
    {
      id: 4,
      descricao: "Pizza P calabresa, refrigerante",
      pagamento: "dinheiro",
      expedicao: "retirado no balcao",
      data: "12-09-2020",
      CPF: "não cadastrado",
      observacoes: "nenhuma",
      valor: 4.00,
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
