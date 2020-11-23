import React from "react";
import { Table } from "react-bootstrap";

const data = [
  {
    data: "10-02-2020",
    hora: "10:10",
    id: 112,
    descricao: "Pizza Calabresa P",
    expedicao: "Entrega",
    endereco: "Rua Dez de maio, 90",
    observacoes: "nenhuma",
    valor: 30.0,
    status: "Finalizado",
  },
  {
    data: "10-03-2020",
    hora: "10:10",
    id: 1234,
    descricao: "Pizza Calabresa P",
    expedicao: "Entrega",
    endereco: "Rua Dez de maio, 90",
    observacoes: "nenhuma",
    valor: 30.0,
    status: "Finalizado",
  },
  {
    data: "10-04-2020",
    hora: "10:10",
    id: 1342,
    descricao: "Pizza Calabresa P",
    expedicao: "Entrega",
    endereco: "Rua Dez de maio, 90",
    observacoes: "nenhuma",
    valor: 30.0,
    status: "Em preparo",
  },
];

const TabelaMinhaConta = () => {
  return (
    <>
        <p>Meus Pedidos:</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Data</td>
            <td>Hora</td>
            <td>ID</td>
            <td>Descrição</td>
            <td>Expedição</td>
            <td>Endereço</td>
            <td>Observações</td>
            <td>Valor</td>
            <td>Status</td>
          </tr>
        </thead>
        {data.map((item) => (
          <tbody>
            <tr>
              <td>{item.data}</td>
              <td>{item.hora}</td>
              <td>{item.id}</td>
              <td>{item.descricao}</td>
              <td>{item.expedicao}</td>
              <td>{item.endereco}</td>
              <td>{item.observacoes}</td>
              <td>R$ {item.valor}</td>
              <td>{item.status}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </>
  );
};

export default TabelaMinhaConta
