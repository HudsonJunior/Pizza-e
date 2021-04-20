import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { FormControl } from "react-bootstrap";
import FacadePedido from "../../Facade/FacadePedido";
const facadePedido = new FacadePedido();

const TabelaCodigo = () => {
  const [nomeProduto, setNomeProduto] = React.useState("");
  const [relatorio, setRelatorio] = React.useState([]);

  useEffect(() => {
    facadePedido.getVendaProduto(nomeProduto, setRelatorio);
  }, [nomeProduto]);

  const getDataFormatada = (data) => {
    const dataInteira = data.split("-");
    return dataInteira[1] + "/" + dataInteira[0];
  };

  return (
    <div id="relatorio">
      <InputGroup className="col-3 mb-3" styles={{ paddingLeft: 0 }}>
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <FiSearch size={18} color="#000" />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder={"Pizza..."}
          aria-label="BuscarProduto"
          aria-describedby="basic-addon1"
          value={nomeProduto}
          onChange={(event) => setNomeProduto(event.target.value)}
        />
      </InputGroup>{" "}
      {nomeProduto && relatorio.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID do produto</th>
              <th>Descrição</th>
              <th>Mês/Ano</th>
              <th>Quantidade Vendida</th>
            </tr>
          </thead>
          {relatorio.reverse().map((item) => (
            <tbody>
              <tr>
                <td>{item._id}</td>
                <td>{item.nome}</td>
                <td>{getDataFormatada(item.data)}</td>
                <td>{item.quantidade}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      ) : (
        <pre>
          <p>Nenhum pedido foi registrado com este produto...</p>
        </pre>
      )}
    </div>
  );
};
export default TabelaCodigo;
