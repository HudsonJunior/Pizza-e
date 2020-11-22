import React from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";

const data = [
  {
    codigoProd: 6,
    quantidade: 0,
  },
  {
    codigoProd: 39,
    quantidade: 1,
  },
  {
    codigoProd: 29,
    quantidade: 0,
  },
  {
    codigoProd: 19,
    quantidade: 1,
  },
];

const QuantidadeBaixa = () => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Código do Produto</td>
            <td>Quantidade</td>
          </tr>
        </thead>
        {data.map((item) => (
          <tbody>
            <tr>
              <td>{item.codigoProd}</td>
              <td>{item.quantidade}</td>
            </tr>
          </tbody>
        ))}
      </Table>
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{
          borderWidth: 1,
          borderColor: "black",
          margin: 20,
          backgroundColor: "lightGray",
        }}
      >
        Baixar
      </Button>
    </div>
  );
};

export default QuantidadeBaixa;