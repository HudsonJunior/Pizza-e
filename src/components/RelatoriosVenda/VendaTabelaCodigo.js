import React from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { FormControl } from "react-bootstrap";

const data = [
  {
    codigo: "3",
    quantidade: 23,
    dataInicio: "01-07-2020",
    dataFinal: "31-07-2020",
  },
  {
    codigo: "3",
    quantidade: 13,
    dataInicio: "01-08-2020",
    dataFinal: "31-08-2020",
  },
  {
    codigo: "3",
    quantidade: 66,
    dataInicio: "01-09-2020",
    dataFinal: "31-09-2020",
  },
  {
    codigo: "3",
    quantidade: 224,
    dataInicio: "01-10-2020",
    dataFinal: "31-10-2020",
  },
];

const TabelaCodigo = () => {
  return (
    <>
      <InputGroup className="col-2 mb-3" styles={{ paddingLeft: 0 }}>
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <FiSearch size={18} color="#000" />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder={"3"}
          aria-label="BuscarCodigoProduto"
          aria-describedby="basic-addon1"
        />
      </InputGroup>{" "}
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Código do produto</td>
            <td>Quantidade Vendida</td>
            <td>Data início</td>
            <td>Data final</td>
          </tr>
        </thead>
        {data.map((item) => (
          <tbody>
            <tr>
              <td>{item.codigo}</td>
              <td>{item.quantidade}</td>
              <td>{item.dataInicio}</td>
              <td>{item.dataFinal}</td>
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
    </>
  );
};
export default TabelaCodigo;
