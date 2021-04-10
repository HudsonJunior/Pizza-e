import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import FacadeRelatorioEstoque from "../../Facade/FacadeRelatorioEstoque";

const facadeRelatorio = new FacadeRelatorioEstoque();

const Movimentacoes = () => {
  let today = new Date();
  let currentDate =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);

  const [relatorio, setRelatorio] = React.useState([]);
  const [data, setData] = React.useState(currentDate);

  useEffect(() => {
    if (relatorio) {
      facadeRelatorio.getMovimentacoes(data, setRelatorio);
    }
  }, [data]);

  return (
    <div>
      <TextField
        id="dateI"
        label="Data"
        type="date"
        defaultValue={currentDate}
        InputLabelProps={{
          shrink: true,
        }}
        value={data}
        onChange={(event) => setData(event.target.value)}
      />
      {relatorio.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID do Produto</th>
              <th>Nome do Produto</th>
              <th>Ação</th>
            </tr>
          </thead>
          {relatorio.map((item) => (
            <tbody>
              <tr>
                <td>{item.idProduto}</td>
                <td>{item.nomeProduto}</td>
                <td>{item.acao}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      ) : (
        <pre>
          <p>Nenhuma movimentação no estoque foi registrada nesta data...</p>
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

export default Movimentacoes;
