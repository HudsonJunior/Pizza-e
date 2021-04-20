import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import FacadeRelatorioEstoque from "../../Facade/FacadeRelatorioEstoque";

const facadeRelatorio = new FacadeRelatorioEstoque();

const Vencimentos = () => {
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
    facadeRelatorio.getEstoqueVencido(data, setRelatorio);
  }, [data]);

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

  return (
    <div id="relatorio">
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
              <th>Valor</th>
              <th>Peso</th>
              <th>Data de validade</th>
            </tr>
          </thead>
          {relatorio.map((item) => (
            <tbody>
              <tr>
                <td>{item._id}</td>
                <td>{item.nome}</td>
                <td>{item.valor}</td>
                <td>{item.peso}</td>
                <td>{formataData(item.validade)}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      ) : (
        <pre>
          <p>
            Não foi encontrado nenhum produto no estoque vencido até esta
            data...
          </p>
        </pre>
      )}
    </div>
  );
};

export default Vencimentos;
