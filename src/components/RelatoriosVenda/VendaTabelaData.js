import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import "./styles/TabelaData.css";
import FacadePedido from "../../Facade/FacadePedido";
const facadePedido = new FacadePedido();

const TabelaData = () => {
  let today = new Date();
  let currentDate =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);
  let lastMonth = new Date(new Date(currentDate) - 31 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const [relatorio, setRelatorio] = React.useState([]);
  const [dataI, setDataI] = React.useState(lastMonth);
  const [dataF, setDataF] = React.useState(currentDate);

  useEffect(() => {
    facadePedido.getVendaData(dataI, dataF, setRelatorio);
  }, [dataI, dataF]);

  return (
    <div id="relatorio">
      <TextField
        id="dateI"
        label="Data de início"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        defaultValue={lastMonth}
        value={dataI}
        onChange={(event) => setDataI(event.target.value)}
      />
      <TextField
        id="dateF"
        label="Data final"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        defaultValue={currentDate}
        value={dataF}
        onChange={(event) => setDataF(event.target.value)}
      />

      {relatorio.length > 0 ? (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID do Produto</th>
                <th>Nome do Produto</th>
                <th>Quantidade Vendida</th>
              </tr>
            </thead>
            {relatorio.map((item) => {
              return (
                <tbody>
                  <tr>
                    <td>{item._id}</td>
                    <td>{item.nome}</td>
                    <td>{item.quantidade}</td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </div>
      ) : (
        <pre>
          <p>Nenhum pedido foi registrado nesta data...</p>
        </pre>
      )}
    </div>
  );
};
export default TabelaData;
