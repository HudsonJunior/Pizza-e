import React from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';

const data = [
  {
    data: "10-02-2020",
    codigoProd: 1,
    acao: "adição",
    quantidade: 2,
    usuario: "gerente",
  },
  {
    data: "10-02-2020",
    codigoProd: 2,
    acao: "remoção",
    quantidade: 4,
    usuario: "funcionário",
  },
  {
    data: "10-02-2020",
    codigoProd: 3,
    acao: "adição",
    quantidade: 9,
    usuario: "gerente",
  },
  {
    data: "10-02-2020",
    codigoProd: 4,
    acao: "cadastro",
    quantidade: 1,
    usuario: "gerente",
  },
];

const Movimentacoes = () => {
  return (
    <div>
      <TextField
        id="dateI"
        label="Data"
        type="date"
        defaultValue="2020-02-10"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Data</td>
            <td>Código do Produto</td>
            <td>Ação</td>
            <td>Quantidade</td>
            <td>Usuário</td>
          </tr>
        </thead>
        {data.map((item) => (
          <tbody>
            <tr>
              <td>{item.data}</td>
              <td>{item.codigoProd}</td>
              <td>{item.acao}</td>
              <td>{item.quantidade}</td>
              <td>{item.usuario}</td>
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

export default Movimentacoes;
