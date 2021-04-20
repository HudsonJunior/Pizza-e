import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import FacadeRelatorioEstoque from "../../Facade/FacadeRelatorioEstoque";

const facadeRelatorio = new FacadeRelatorioEstoque();

const QuantidadeBaixa = () => {
  const [relatorio, setRelatorio] = React.useState([]);

  useEffect(() => {
    facadeRelatorio.getQuantidadeProduto(setRelatorio);
  }, []);

  return (
    <div id="relatorio">
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
    </div>
  );
};

export default QuantidadeBaixa;
