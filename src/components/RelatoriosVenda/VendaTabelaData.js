import React from "react";
import { Table } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import "./styles/TabelaData.css";


const data = [
  {
    codigo: "1",
    quantidade: 23,
  },
  {
    codigo: "2",
    quantidade: 13,
  },
  {
    codigo: "3",
    quantidade: 66,
  },
  {
    codigo: "4",
    quantidade: 224,
  },
  {
    codigo: "5",
    quantidade: 95,
  },
  {
    codigo: "6",
    quantidade: 135,
  },
];

const TabelaData = () => {
  return (
    <div>
      <TextField
        id="dateI"
        label="Data de início"
        type="date"
        defaultValue="2020-05-24"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="dateF"
        label="Data final"
        type="date"
        defaultValue="2020-06-24"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Código do produto</td>
            <td>Quantidade Vendida</td>
          </tr>
        </thead>
        {data.map((item) => (
          <tbody>
            <tr>
              <td>{item.codigo}</td>
              <td>{item.quantidade}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};
export default TabelaData;
