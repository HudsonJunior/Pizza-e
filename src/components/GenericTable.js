import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useHistory } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl2 from "@material-ui/core/FormControl";

import { Table, Button, InputGroup, FormControl } from "react-bootstrap";

import {
  FiEdit3,
  FiXCircle,
  FiPlus,
  FiSearch,
  FiCheck,
  FiDelete,
} from "react-icons/fi";
import { Dialog } from "@material-ui/core";
import Botao from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ToastContainer, toast } from "react-toastify";

import ReactTooltip from "react-tooltip";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { string } from "yup";
import { TramRounded } from "@material-ui/icons";
import { setPageStateUpdate } from "@material-ui/data-grid";
import FacadeProduto from "../Facade/FacadeProduto";
import FacadePedido from "../Facade/FacadePedido";

const axios = require("axios");
const url = window.location.href.replace("http://localhost:3000/", "");

const GenericTable = ({ data, title }) => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  var itensQuantidade = [];

  const [valueTipoProduto, setTipoProduto] = React.useState("pizza");
  const [valueGeneric, setTipoValueGeneric] = React.useState("pizza");
  const [statusGeneric, setStatusGeneric] = React.useState("ativado");
  const [isAtivado, setIsAtivado] = React.useState('true');
  const [produtoSelecionado, setProdutoSelecionado] = React.useState({});
  const facadeProduto = new FacadeProduto()
  const facadePedido = new FacadePedido()

  const handleChangePizza = () => {
    setTipoProduto("pizza");
  };

  const handleChangeProduto = () => {
    setTipoProduto("normal");
  };

  const handleChange = (event) => {
    setTipoValueGeneric(event.target.value);
  };

  const toastStyle = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [end, setEnd] = React.useState(false);

  const endClose = () => {
    setEnd(false);
  };
  const gerenciarFechar = () => {
    setEnd(false);
    setOpen(false);
  };
  const fim = () => {
    setOpen(false);
    setEnd(true);
  };

  const cancelarPedido = (item) => {
    if (item.statusPedido == "cancelado") {
      toast.error("Pedido já está como cancelado!", toastStyle);
    } else {
      const body = {
        produtos: item.produtos,
        formaPagamento: item.formaPagamento,
        formaExpedicao: item.formaExpedicao,
        endereco: item.endereco,
        data: item.data,
        hora: item.hora,
        cpfCliente: item.cpfCliente,
        cpfNF: item.cpfNF,
        observacoes: item.observacoes,
        statusPedido: item.statusPedido,
        valor: parseFloat(item.valor),
        statusPagamento: item.statusPagamento,
        id: item._id,
        cancelar: true,
      }

      facadePedido.patchPedidos(body, '🍕 Pedido cancelado com sucesso!', true, history, toastStyle)
    }
  };

  const desativarProduto = (item) => {
    const body = {}
    if (item.tipo == "Pizza") {
      body = {
        nome: item.nome,
        valor: item.valor,
        ingredientes: item.ingredientes,
        ativado: false,
        adicionais: item.adicionais,
        tipo: "Pizza",
        inicio_promo: item.inicioPromo,
        fim_promo: item.fimPromo,
        valor_promocional: item.valorPromocional ?? "",
      }

    } else {
      body = {
        nome: item.nome,
        valor: item.valor,
        ativado: false,
        peso: item.peso,
        inicio_promo: item.inicioPromo,
        fim_promo: item.fimPromo,
        valor_promocional: item.valorPromocional ?? "",
        tipo: "Normal",
      }
    }

    facadeProduto.patchProdutos(body, '🍕 Produto desativado com sucesso!', 'Ocorrou um erro ao desativar o produto, tente novamente!', true, history)

  };

  const handleClose = (url) => {
    setOpen(false);

    if (url === "funcionarios") {
      toast.success("🍕 Registro deletado com sucesso!", {
        toastStyle,
      });
    } else if (url === "estoque") {
      toast.success("🍕 Produto removido do estoque com sucesso!", {
        toastStyle,
      });
    } else if (url === "pedidos") {
      toast.success("🍕 Pedido removido com sucesso!", {
        toastStyle,
      });
    }
  };

  const handleError = () => {
    toast.error("🍕 Produto não pode ser removido: Quantidade maior que zero!");
  };

  const handleEdit = (item) => {
    console.log(item);
    {
      if (url === "pedidos") {
        if (item.statusPedido == "cancelado") {
          toast.error(
            "Não é possivel editar um pedido que já foi cancelado",
            toastStyle
          );
        } else {
          history.push("/gerenciar-pedido", { tipo: "Editar", item: item });
        }
      }
    }
    {
      url === "clientes" && history.push("/");
    }
    {
      url === "produtos" &&
        history.push("/gerenciar-produto", { tipo: "Editar", item: item });
    }
    {
      url === "estoque" && history.push("/editar-estoque", { item: item });
    }
    {
      url === "funcionarios" &&
        history.push("/editar-funcionario", { item: item });
    }
  };

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

  const getProdutosPedido = (produtosArray) => {
    let stringProdutos = "";
    for (var i = 0; i < produtosArray.length; i++) {
      stringProdutos += produtosArray[i].quantidade;
      stringProdutos += " ";
      stringProdutos += produtosArray[i].nome;
      if (i < produtosArray.length - 1) stringProdutos += ",\n";
    }
    return stringProdutos;
  };

  const direcionarCadastro = () => {
    {
      url === "pedidos" &&
        history.push("/gerenciar-pedido", { tipo: "Cadastro" });
    }
    {
      url === "clientes" && history.push("/funcionario-cadastrar-cliente");
    }
    {
      url === "produtos" &&
        confirmAlert({
          title: "Escolher tipo",
          message: "Selecione o tipo de produto que deseja cadastrar",
          buttons: [
            {
              label: "Pizza",
              onClick: () =>
                history.push("/gerenciar-produto", {
                  tipo: "Cadastro",
                  tipoProduto: "Pizza",
                }),
            },
            {
              label: "Normal",
              onClick: () =>
                history.push("/gerenciar-produto", {
                  tipo: "Cadastro",
                  tipoProduto: "Normal",
                }),
            },
          ],
        });
    }
    {
      url === "estoque" && history.push("/cadastrar-estoque");
    }
    {
      url === "funcionarios" && history.push("/cadastrar-funcionario");
    }
  };

  return (
    <>
      {/* <InputGroup className="col-3 mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <FiSearch size={18} color="#000" />
          </InputGroup.Text>
        </InputGroup.Prepend>

        <FormControl
          placeholder={`Buscar ${title}`}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup> */}

      {url === "produtos" && (
        <>
          <FormControl2 style={{ margin: 10 }} component="RadioTipoProduto">
            <FormLabel>Escolha o tipo do produto</FormLabel>
            <RadioGroup
              aria-label="TipoProduto"
              name="TipoProduto"
              value={valueGeneric}
              onChange={handleChange}
            >
              <FormControlLabel
                control={<Radio />}
                value="pizza"
                label="Pizza"
                onChange={handleChangePizza}
              />
              <FormControlLabel
                control={<Radio />}
                value="normal"
                label="Normal"
                onChange={handleChangeProduto}
              />
            </RadioGroup>
          </FormControl2>
          <FormControl2 style={{ margin: 10 }} component="RadioStatusProduto">
            <FormLabel>Status do Produto</FormLabel>
            <RadioGroup
              aria-label="StatusProduto"
              name="StatusProduto"
              value={statusGeneric}
              onChange={(event) => setStatusGeneric(event.target.value)}
            >
              <FormControlLabel
                control={<Radio />}
                value="ativado"
                label="Ativado"
                onChange={() => setIsAtivado('true')}
              />
              <FormControlLabel
                control={<Radio />}
                value="desativado"
                label="Desativado"
                onChange={() => setIsAtivado('false')}
              />
            </RadioGroup>
          </FormControl2>
        </>

      )}
      <Table striped bordered hover>
        {url === "pedidos" && (
          <>
            <thead>
              <tr>
                <th>Data</th>
                <th>Hora</th>
                <th>ID</th>
                <th>Status</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Observações</th>
                <th>Pagamento</th>
                <th>Pago</th>
                <th>Expedição</th>
                <th>Endereço</th>
                <th>CPF Cliente</th>
                <th>CPF NF</th>
                <th>Ações</th>
              </tr>
            </thead>
            {data.map((item) => (
              <tbody>
                <tr>
                  <td>{formataData(item.data)}</td>
                  <td>{item.hora}</td>
                  <td style={{ width: 150, wordBreak: "break-word" }}>
                    {item._id}
                  </td>
                  <td>{item.statusPedido}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>
                    {getProdutosPedido(item.produtos)}
                  </td>
                  <td>R${item.valor}</td>
                  <td>{item.observacoes}</td>
                  <td>{item.formaPagamento}</td>
                  <td>{item.statusPagamento}</td>
                  <td>{item.formaExpedicao}</td>
                  <td>{item.endereco}</td>
                  <td>{item.cpfCliente}</td>
                  <td>{item.cpfNF}</td>
                  <td>
                    <Button
                      variant="light"
                      style={{
                        marginRight: 7,
                        borderWidth: 1,
                        borderColor: "black",
                      }}
                      onClick={(value) => handleEdit(item)}
                    >
                      <FiEdit3 size={20} color="#black" />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => cancelarPedido(item)}
                    >
                      <FiXCircle size={20} color="#black" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle id="alert-dialog-apagar">
                {"Deseja cancelar o pedido?"}
              </DialogTitle>
              <DialogActions>
                <Button
                  variant="danger"
                  className="botao"
                  color="primary"
                  onClick={() => setOpen(false)}
                >
                  Não
                </Button>

                <Button
                  className="botao"
                  variant="success"
                  onClick={() => handleClose("pedidos")}
                  color="primary"
                  autoFocus
                >
                  Sim
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
        {console.log(url)}
        {url === "clientes" && (
          <>
            <thead>
              <tr>
                <td>ID</td>
                <td>CPF</td>
                <td>Nome</td>
                <td>Endereco</td>
                <td>Email</td>
                <td>Telefone</td>
                <td>Ações</td>
              </tr>
            </thead>
            {data.map((item) => (
              <tbody>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.cpf}</td>
                  <td>{item.nome}</td>
                  <td>{item.endereco}</td>
                  <td>{item.email}</td>
                  <td>{item.telefone}</td>

                  <td>
                    <Button
                      variant="light"
                      style={{
                        marginRight: 7,
                        borderWidth: 1,
                        borderColor: "black",
                      }}
                      onClick={handleClickOpen}
                    >
                      <FiEdit3 size={20} color="#black" />
                    </Button>
                    <Button
                      variant="danger"
                      data-tip="Desativar"
                      onClick={(value) => { }}
                    >
                      <ReactTooltip />
                      <FiXCircle size={20} color="#black" />
                    </Button>
                  </td>
                </tr>
                <Dialog
                  open={open}
                  onClose={gerenciarFechar}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    Editar as informações do cliente
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Nome"
                      type="name"
                      fullWidth
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Endereço"
                      type="name"
                      fullWidth
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Email"
                      type="email"
                      fullWidth
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Telefone"
                      type="name"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Botao onClick={gerenciarFechar} color="primary">
                      Cancel
                    </Botao>
                    <Botao onClick={fim} color="primary">
                      Alterar
                    </Botao>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={end}
                  onClose={endClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Os dados foram alterados com sucesso!  "}
                    <FiCheck size={35} color={"green"}></FiCheck>
                  </DialogTitle>

                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Dados alterados com sucesso.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={endClose} color="primary" autoFocus>
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
              </tbody>
            ))}
          </>
        )}

        {url === "produtos" && (
          <>
            {valueTipoProduto === "pizza" && (
              <>
                <thead>
                  <tr>
                    <td>Tipo</td>
                    <td>Código</td>
                    <td>Nome</td>
                    <td>Valor</td>
                    <td>Ingredientes</td>
                    <td>Adicionais</td>
                    <td>Ativado</td>
                    <td>Valor promocional</td>
                    <td>Início da promoção</td>
                    <td>Fim da promoção</td>
                    <td>Ações</td>
                  </tr>
                </thead>
                {data.map((item) => {
                  if (item.tipo === "Pizza" && item.ativado == isAtivado) {
                    return (
                      <tbody>
                        <tr>
                          <td>{item.tipo}</td>
                          <td>{item._id}</td>
                          <td>{item.nome}</td>
                          <td>{item.valor}</td>
                          <td>{item.ingredientes}</td>
                          <td>{item.adicionais}</td>
                          <td>{item.ativado == 'true' ? 'Sim' : 'Não'}</td>
                          <td>{item.valor_promocional || 0}</td>
                          <td>{formataData(item.inicio_promo)}</td>
                          <td>{formataData(item.fim_promo)}</td>
                          <td>
                            <Button
                              onClick={(value) => handleEdit(item)}
                              variant="light"
                              data-tip="Editar"
                              style={{
                                marginBottom: 10,
                                marginRight: 7,
                                borderWidth: 1,
                                borderColor: "black",
                              }}
                            >
                              <ReactTooltip />
                              <FiEdit3 size={20} color="#black" />
                            </Button>
                            <Button
                              variant="danger"
                              data-tip="Desativar"
                              onClick={(value) => desativarProduto(item)}
                            >
                              <ReactTooltip />
                              <FiXCircle size={20} color="#black" />
                            </Button>
                            <Dialog open={open} onClose={handleClose}>
                              <DialogTitle id="alert-dialog-apagar">
                                {"Deseja desativar o produto?"}
                              </DialogTitle>
                              <DialogActions>
                                <Button
                                  variant="danger"
                                  className="botao"
                                  onClick={() => setOpen(false)}
                                  color="primary"
                                >
                                  Não
                                </Button>

                                <Button
                                  className="botao"
                                  variant="success"
                                  onClick={() => handleClose("produtos")}
                                  color="primary"
                                  autoFocus
                                >
                                  Sim
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </td>
                        </tr>
                      </tbody>
                    );
                  }
                })}
              </>
            )}
            {valueTipoProduto === "normal" && (
              <>
                <thead>
                  <tr>
                    <td>Tipo</td>
                    <td>Código</td>
                    <td>Nome</td>
                    <td>Valor</td>
                    <td>Peso</td>
                    <td>Ativado</td>
                    <td>Valor promocional</td>
                    <td>Início da promoção</td>
                    <td>Fim da promoção</td>
                    <td>Ações</td>
                  </tr>
                </thead>
                {data.map((item) => {
                  if (item.tipo === "Normal" && item.ativado == isAtivado) {
                    return (
                      <tbody>
                        <tr>
                          <td>{item.tipo}</td>
                          <td>{item.codigo}</td>
                          <td>{item.nome}</td>
                          <td>{item.valor}</td>
                          <td>{item.peso}</td>
                          <td>{item.ativado == 'true' ? 'Sim' : 'Não'}</td>
                          <td>{item.valor_promocional || 0}</td>
                          <td>{formataData(item.inicio_promo)}</td>
                          <td>{formataData(item.fim_promo)}</td>
                          <td>
                            <Button
                              onClick={(value) => handleEdit(item)}
                              variant="light"
                              data-tip="Editar"
                              style={{
                                marginRight: 7,
                                borderWidth: 1,
                                borderColor: "black",
                              }}
                            >
                              <ReactTooltip />
                              <FiEdit3 size={20} color="#black" />
                            </Button>
                            <Button
                              variant="danger"
                              data-tip="Desativar"
                              onClick={(value) => desativarProduto(item)}
                            >
                              <ReactTooltip />
                              <FiXCircle size={20} color="#black" />
                            </Button>
                            <Dialog open={open} onClose={handleClose}>
                              <DialogTitle id="alert-dialog-apagar">
                                {"Deseja desativar o produto?"}
                              </DialogTitle>
                              <DialogActions>
                                <Button
                                  variant="danger"
                                  className="botao"
                                  onClick={() => setOpen(false)}
                                  color="primary"
                                >
                                  Não
                                </Button>

                                <Button
                                  className="botao"
                                  variant="success"
                                  onClick={() => handleClose("produtos")}
                                  color="primary"
                                  autoFocus
                                >
                                  Sim
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </td>
                        </tr>
                      </tbody>
                    );
                  }
                })}
              </>
            )}
          </>
        )}
        <FiPlus size={26} color="fff" />
        {url === "estoque" && (
          <>
            <thead>
              <tr>
                <td>Cod</td>
                <td>Nome</td>
                <td>Valor do item</td>
                <td>Peso do item</td>
                <td>Data de validade</td>
                <td>Data de fabricação</td>
                <td>Ações</td>
              </tr>
            </thead>
            {data.map((item) => (
              <tbody>
                <tr>
                  <td>{item._id}</td>
                  <td>{item.nome}</td>
                  <td>{item.valor}</td>
                  <td>{item.peso}</td>
                  <td>{item.validade.split("T")[0]}</td>
                  <td>{item.fabricacao}</td>
                  <td>
                    <Button
                      variant="light"
                      style={{
                        marginRight: 7,
                        borderWidth: 1,
                        borderColor: "black",
                      }}
                      onClick={(value) => handleEdit(item)}
                    >
                      <FiEdit3 size={20} color="#black" />
                    </Button>
                    <Button variant="danger" onClick={handleClickOpen}>
                      <FiXCircle size={20} color="#black" />
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle id="alert-dialog-apagar">
                        {"Deseja realmente remover o produto do estoque?"}
                      </DialogTitle>
                      <DialogActions>
                        <Button
                          variant="danger"
                          className="botao"
                          onClick={() => setOpen(false)}
                          onClick={handleClose}
                          color="primary"
                        >
                          Não
                        </Button>
                        <Button
                          className="botao"
                          variant="success"
                          onClick={() => handleClose("estoque")}
                          color="primary"
                          autoFocus
                        >
                          Sim
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </td>
                </tr>
              </tbody>
            ))}
          </>
        )}
        {url === "funcionarios" && (
          <>
            <thead>
              <tr>
                <td>Nome</td>
                <td>CPF</td>
                <td>RG</td>
                <td>Carteira de trabalho</td>
                <td>CEP</td>
                <td>Rua</td>
                <td>Numero</td>
                <td>Complemento</td>
                <td>Ações</td>
              </tr>
            </thead>
            {data.map((item) => (
              <tbody>
                <tr>
                  <td>{item.nome}</td>
                  <td>{item.cpf}</td>
                  <td>{item.rg}</td>
                  <td>{item.carteira}</td>
                  <td>{item.cep}</td>
                  <td>{item.rua}</td>
                  <td>{item.numero}</td>
                  <td>{item.complemento}</td>
                  <td>
                    <Button
                      variant="light"
                      style={{
                        marginRight: 7,
                        borderWidth: 1,
                        borderColor: "black",
                      }}
                      onClick={(value) => handleEdit(item)}
                    >
                      <FiEdit3 size={20} color="#black" />
                    </Button>
                    <Button variant="danger" onClick={handleClickOpen}>
                      <FiXCircle
                        size={20}
                        color="#black"
                      // onclick={deleteItem(item.quantidade)}
                      />
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle id="alert-dialog-apagar">
                        {
                          "Deseja realmente deletar os registros do funcionário?"
                        }
                      </DialogTitle>
                      <DialogActions>
                        <Button
                          variant="danger"
                          className="botao"
                          onClick={() => setOpen(false)}
                          onClick={handleClose}
                          color="primary"
                        >
                          Não
                        </Button>

                        <Button
                          className="botao"
                          variant="success"
                          onClick={() => handleClose("funcionarios")}
                          color="primary"
                          autoFocus
                        >
                          Sim
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </td>
                </tr>
              </tbody>
            ))}
          </>
        )}
      </Table>
      <Button variant="success" onClick={direcionarCadastro}>
        <FiPlus size={26} color="fff" />
        Adicionar
      </Button>
      <ToastContainer />
    </>
  );
};

export default GenericTable;
