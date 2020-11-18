import React, { useState } from "react";

import Menubar from "../components/MenubarComponent";
import GenericTable from "../components/GenericTable";

const Pedidos = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);

  const [id_pedido] = useState("");

  const BuscarPedido = (id_pedido) => {};

  const data = [
    {
      id: 1,
      descrição: "Pizza P calabresa, refrigerante",
      pagamento: "dinheiro",
      expedição: "retirado no balcao",
      data: "12-09-2020",
      CPF: "não cadastrado",
      observacoes: "nenhuma",
    },
    {
      id: 2,
      descrição: "Pizza P calabresa, refrigerante",
      pagamento: "dinheiro",
      expedição: "retirado no balcao",
      data: "12-09-2020",
      CPF: "não cadastrado",
      observacoes: "nenhuma",
    },
    {
      id: 3,
      descrição: "Pizza P calabresa, refrigerante",
      pagamento: "dinheiro",
      expedição: "retirado no balcao",
      data: "12-09-2020",
      CPF: "não cadastrado",
      observacoes: "nenhuma",
    },
    {
      id: 4,
      descrição: "Pizza P calabresa, refrigerante",
      pagamento: "dinheiro",
      expedição: "retirado no balcao",
      data: "12-09-2020",
      CPF: "não cadastrado",
      observacoes: "nenhuma",
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
