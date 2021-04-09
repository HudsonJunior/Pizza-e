import React from "react";
import { Table } from "react-bootstrap";

const formataData = (data) => {
  const novaData = new Date(data);
  return (
    ("0" + (novaData.getDate() + 1)).slice(-2) +
    "/" +
    ("0" + (novaData.getMonth() + 1)).slice(-2) +
    "/" +
    novaData.getFullYear()
  );
};

const getProdutosPedido = (produtosArray) => {
  let stringProdutos = "";
  for (var i = 0; i < produtosArray.length; i++) {
    stringProdutos += produtosArray[i].quantidade;
    stringProdutos += " ";
    stringProdutos += produtosArray[i].nome;
    if (i < produtosArray.length - 1) stringProdutos += ",\n";
  }
  return stringProdutos;
};

const TabelaMinhaConta = (props) => {
  return (
    <>
      <p>Meus Pedidos:</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Data</th>
            <th>Hora</th>
            <th>ID</th>
            <th>Status</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Observações</th>
            <th>Pagamento</th>
            <th>Pago</th>
            <th>Expedição</th>
            <th>Endereço</th>
          </tr>
        </thead>
        {props.meusPedidos.map((item) => (
          <tbody>
            <tr>
              <td>{formataData(item.data)}</td>
              <td>{item.hora}</td>
              <td style={{ width: 150, wordBreak: "break-word" }}>
                {item._id}
              </td>
              <td>{item.statusPedido}</td>
              <td style={{ whiteSpace: "pre-wrap" }}>
                {getProdutosPedido(item.produtos)}
              </td>
              <td>R${item.valor}</td>
              <td>{item.observacoes}</td>
              <td>{item.formaPagamento}</td>
              <td>{item.statusPagamento}</td>
              <td>{item.formaExpedicao}</td>
              <td>{item.endereco}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </>
  );
};

export default TabelaMinhaConta;
