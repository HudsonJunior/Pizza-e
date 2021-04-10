import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { green, red } from "@material-ui/core/colors";
import FacadeProduto from "../../Facade/FacadeProduto";

const TabelaProdutoPedido = (props) => {
  const [nomeProduto, setNomeProduto] = React.useState("");
  const [produtos, setProdutos] = React.useState([]);
  const facadeProdutos = new FacadeProduto();

  useEffect(() => {
    if (nomeProduto === "") {
      facadeProdutos.getProdutos(null, setProdutos);
    } else facadeProdutos.getProdutos(nomeProduto, setProdutos);
  }, [nomeProduto]);

  const getValor = () => {
    let valor = 0;
    for (let produto of props.produtosPedido) {
      valor += parseFloat(produto.valor) * parseInt(produto.quantidade);
    }
    props.setValor(valor);
  };

  const handleAdd = (id, nome, valor) => {
    let existeProduto = false;
    for (var i = 0; i < props.produtosPedido.length; i++) {
      if (id === props.produtosPedido[i]._id) {
        existeProduto = true;
        props.produtosPedido[i].quantidade += 1;
        break;
      }
    }
    if (!existeProduto) {
      let obj = new Object();
      obj._id = id;
      obj.nome = nome;
      obj.quantidade = 1;
      obj.valor = valor;
      props.produtosPedido.push(obj);
    }
    props.setProdutosPedido(props.produtosPedido);
    facadeProdutos.getProdutos(null, setProdutos);
    getValor();
  };

  const handleSub = (id) => {
    let existeProduto = false;
    var i = 0;
    for (i = 0; i < props.produtosPedido.length; i++) {
      if (id === props.produtosPedido[i]._id) {
        existeProduto = true;
        props.produtosPedido[i].quantidade -= 1;
        break;
      }
    }
    if (existeProduto && props.produtosPedido[i].quantidade === 0) {
      props.produtosPedido.splice(i, 1);
    }
    props.setProdutosPedido(props.produtosPedido);
    facadeProdutos.getProdutos(null, setProdutos);
    getValor();
  };

  const getValorItem = (item) => {
    let fimPromo = item.fim_promo.split("T")[0];
    let inicioPromo = item.inicio_promo.split("T")[0];

    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2);

    if (
      item.valor_promocial !== "" &&
      fimPromo.localeCompare(date) === 1 &&
      inicioPromo.localeCompare(date === -1)
    )
      return item.valor_promocial;
    else return item.valor;
  };

  const getQtdeProdutos = (id) => {
    for (var produto of props.produtosPedido) {
      if (id === produto._id) {
        return produto.quantidade;
      }
    }
    return 0;
  };

  return (
    <div style={{ margin: 15 }}>
      <InputGroup className="mb-3" style={{ width: 300 }}>
        <FormControl
          placeholder="Nome do produto"
          aria-describedby="basic-addon2"
          value={nomeProduto}
          onChange={(event) => setNomeProduto(event.target.value)}
        />
      </InputGroup>
      {produtos.length > 0 ? (
        <Table striped bordered hover className="tableProdutosPedido">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor Unitário</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          {produtos.map((item) => (
            <tbody>
              <tr>
                <td>{item.nome}</td>
                <td>{getValorItem(item)}</td>
                <td>
                  <div style={{ textAlign: "center" }}>
                    <Fab
                      size="small"
                      aria-label="remove"
                      style={{ backgroundColor: red[500] }}
                      onClick={() => handleSub(item._id)}
                    >
                      <RemoveIcon />
                    </Fab>
                    <TextField
                      style={{ width: 17 }}
                      id="quantidade"
                      value={getQtdeProdutos(item._id)}
                      disabled
                    />
                    <Fab
                      size="small"
                      aria-label="add"
                      style={{ backgroundColor: green[500] }}
                      onClick={() =>
                        handleAdd(item._id, item.nome, getValorItem(item))
                      }
                    >
                      <AddIcon />
                    </Fab>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      ) : (
        <div>
          <pre>
            <p>Nenhum produto está disponível...</p>
          </pre>
        </div>
      )}
    </div>
  );
};

export default TabelaProdutoPedido;
