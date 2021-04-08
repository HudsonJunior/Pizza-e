import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { green, red } from "@material-ui/core/colors";
const axios = require("axios");

const TabelaProdutoPedido = (props) => {
  const [nomeProduto, setNomeProduto] = React.useState("");
  const [produtos, setProdutos] = React.useState([]);

  useEffect(() => {
    if (nomeProduto === "") {
      getProdutos(null);
    } else getProdutos();
  }, [nomeProduto]);

  const getProdutos = async () => {
    try {
      if (nomeProduto != null) {
        const response = await axios.get(
          `http://localhost:8080/produtos-finais?nome=${nomeProduto}`
        );
        const produtosResponse = await response.data;
        setProdutos(produtosResponse);
      } else {
        const response = await axios.get(
          `http://localhost:8080/produtos-finais`
        );
        const produtosResponse = await response.data;
        setProdutos(produtosResponse);
      }
    } catch (error) {
      setProdutos([]);
    }
  };

  const getValor = () => {
    let valor = 0;
    for (let produto of props.produtosPedido) {
      valor += parseFloat(produto.valor) * parseInt(produto.quantidade);
    }
    console.log(valor);
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
    getProdutos();
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
    getProdutos();
    getValor();
  };

  const getValorItem = (item) => {
    let fimPromo = item.fim_promo.split("T")[0];
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2);
    if (item.valor_promocial !== "" && fimPromo.localeCompare(date) === 1)
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

      <Table striped bordered hover className="tableProdutosPedido">
        <thead>
          <tr>
            <td>Nome</td>
            <td>Valor</td>
            <td>Quantidade</td>
          </tr>
        </thead>
        {produtos.map((item) => (
          <tbody>
            <tr>
              <td>{item.nome}</td>
              <td>{getValorItem(item)}</td>
              <td>
                <Fab
                  size="small"
                  aria-label="remove"
                  style={{ backgroundColor: red[500] }}
                  onClick={() => handleSub(item._id)}
                >
                  <RemoveIcon />
                </Fab>
                <TextField
                  style={{ width: 20 }}
                  id="quantidade"
                  value={getQtdeProdutos(item._id)}
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
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default TabelaProdutoPedido;
