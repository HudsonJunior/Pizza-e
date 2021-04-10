import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import FacadeRelatorioEstoque from "../../Facade/FacadeRelatorioEstoque";

const facadeRelatorio = new FacadeRelatorioEstoque();

const QuantidadeBaixa = () => {
  const [relatorio, setRelatorio] = React.useState([]);

  useEffect(() => {
    if (relatorio) {
      facadeRelatorio.getQuantidadeProduto(setRelatorio);
    }
  });

  return (
    <div>
      {relatorio.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome do Produto</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          {relatorio.map((item) => (
            <tbody>
              <tr>
                <td>{item.nome}</td>
                <td>{item.quantidade}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      ) : (
        <pre>
          <p>Não foi encontrado nenhum produto no estoque...</p>
        </pre>
      )}
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
