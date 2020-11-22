import React from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FiPlus, FiMinus } from "react-icons/fi";
import TextField from "@material-ui/core/TextField";

const data = [
  {
    nome: "Pizza 1",
    codigo: "1",
    valor: 30.00,
  },
  {
    nome: "Pizza 2",
    codigo: "2",
    valor: 34.00,
  },
  {
    nome: "Pizza 3",
    codigo: "3",
    valor: 36.00,
  },

  {
    nome: "Pizza 4",
    codigo: "4",
    valor: 35.00,
  },
  {
    nome: "Pizza 5",
    codigo: "5",
    valor: 40.00,
  },
  {
    nome: "Pizza 6",
    codigo: "6",
    valor: 30.00,
  },
  {
    nome: "Pizza 7",
    codigo: "7",
    valor: 26.00,
  },
  {
    nome: "Pizza 8",
    codigo: "2",
    valor: 30.00,
  },
];

//   const [quantProd, setQuantProd] = React.useState(0);

//   const handleChangeIncrementa = () => {
//     setQuantProd((quantProd += 1));
//   };

//   const handleChangeDecrementa = () => {
//     setQuantProd((quantProd -= 1));
//   };

const TabelaProdutoPedido = () => {
    
  return (
    <Table striped bordered hover className="tableProdutosPedido">
      <thead>
        <tr>
          <td>Código</td>
          <td>Nome</td>
          <td>Valor</td>
          <td>Ação</td>
        </tr>
      </thead>
      {data.map((item) => (
        <tbody>
          <tr>
            <td>{item.codigo}</td>
            <td>{item.nome}</td>
            <td>{item.valor}</td>
            <td>
              <Button
                variant="danger"
                style={{
                  marginRight: 7,
                  borderWidth: 1,
                  borderColor: "black",
                }}
              >
                <FiMinus size={10} color="#black" />
              </Button>
              <TextField style={{ width: 25 }} id="quantidade" value={0} />
              <Button
                variant="success"
                style={{
                  marginRight: 7,
                  borderWidth: 1,
                  borderColor: "black",
                }}
              >
                <FiPlus size={10} color="#black" />
              </Button>
            </td>
          </tr>
        </tbody>
      ))}
    </Table>
  );
};

export default TabelaProdutoPedido;
