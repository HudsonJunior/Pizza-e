import React from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';

const data = [
  {
    data: "10-02-2020",
    codigoProd: 1,
    quantidade: 2,
  },
  {
    data: "10-02-2020",
    codigoProd: 2,
    quantidade: 4,
  },
  {
    data: "10-02-2020",
    codigoProd: 3,
    quantidade: 9,
  },
  {
    data: "10-02-2020",
    codigoProd: 4,
    quantidade: 1,
  },
];

const Vencimentos = () => {
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
            <td>Quantidade</td>
          </tr>
        </thead>
        {data.map((item) => (
          <tbody>
            <tr>
              <td>{item.data}</td>
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

export default Vencimentos;