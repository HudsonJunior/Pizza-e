import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import { Table, Button, InputGroup, FormControl } from "react-bootstrap";

import { FiEdit3, FiXCircle, FiPlus, FiSearch } from "react-icons/fi";

import "bootstrap/dist/css/bootstrap.min.css";

const url = window.location.href.replace("http://localhost:3000/", "");

const GenericTable = ({ data, title }) => {
  const history = useHistory();

  const [count, setCount] = useState(1);

  const [table, setTable] = useState({});

  const [value, setValue] = useState(0);

  const [redirect, setRedirect] = useState("");

  const deleteItem = (index) => {
    let quantidadeItem = Number(data[index].quantidade) - count;
    setCount(count + 1);
    setValue(quantidadeItem);
  };

  const handleEdit = () => {
    {
      url === "pedidos" && history.push("/registrar-pedidos");
    }
    {
      url === "clientes" && history.push("/");
    }
    {
      url === "produtos" && history.push("/");
    }
    {
      url === "estoque" && history.push("/editar-estoque");
    }
  };
  const direcionarCadastro = () => {
    {
      url === "pedidos" && setRedirect("cadastrar-pedidos");
    }
    {
      url === "clientes" && setRedirect("cadastrar-clientes");
    }
    {
      url === "produtos" && setRedirect("cadastrar-produtos");
    }
    {
      url === "estoque" && setRedirect("cadastrar-estoque");
    }
    {
      url === "funcionarios" && setRedirect("cadastrar-funcionario");
    }
  };

  useEffect(() => {
    setTable(data);
    direcionarCadastro();
  }, []);

  const handleDelete = (index) => {
    //setTable(table[index].quantidade + 1);
    let quantidadeItem = Number(data[index].quantidade) - count;
    setCount(count + 1);
    setTable(table[index].quantidade, quantidadeItem);
    console.log(table[index].quantidade);
  };

  return (
    <>
      <InputGroup className="col-3 mb-3">
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
      </InputGroup>

      <Table striped bordered hover>
        {url === "pedidos" && (
          <>
            <thead>
              <tr>
                <td>Data</td>
                <td>ID</td>
                <td>Descrição</td>
                <td>Pagamento</td>
                <td>Observações</td>
                <td>Expedição</td>
                <td>CPF</td>
                <td>Valor</td>
                <td>Status</td>
                <td>Ações</td>
              </tr>
            </thead>
            {data.map((item) => (
              <tbody>
                <tr>
                  <td>{item.data}</td>
                  <td>{item.id}</td>
                  <td>{item.descricao}</td>
                  <td>{item.pagamento}</td>
                  <td>{item.observacoes}</td>
                  <td>{item.expedicao}</td>
                  <td>{item.CPF}</td>
                  <td>R$ {item.valor}</td>
                  <td>{item.status}</td>
                  <td>
                    <Button
                      variant="light"
                      style={{
                        marginRight: 7,
                        borderWidth: 1,
                        borderColor: "black",
                      }}
                    >
                      <FiEdit3 size={20} color="#black" />
                    </Button>
                    <Button variant="danger">
                      <FiXCircle size={20} color="#black" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </>
        )}

        {url === "clientes" && (
          <>
            {data.map((item) => (
              <tbody>
                <tr>
                  <td>{item.cod}</td>
                  <td>{item.nome}</td>
                  <td>{item.marca}</td>
                  <td>{item.quantidade}</td>
                  <td>{item.itens}</td>
                  <td>{item.qntMinima}</td>
                  <td>
                    <Button
                      variant="light"
                      style={{
                        marginRight: 7,
                        borderWidth: 1,
                        borderColor: "black",
                      }}
                    >
                      <FiEdit3 size={20} color="#black" />
                    </Button>
                    <Button variant="danger">
                      <FiXCircle size={20} color="#black" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </>
        )}
        {url === "estoque" && (
          <>
            <thead>
              <tr>
                <td>Cod</td>
                <td>Nome</td>
                <td>Marca</td>
                <td>Quantidade</td>
                <td>Valor do item</td>
                <td>Peso do item</td>
                <td>Data de validade</td>
                <td>Data de fabricação</td>
                <td>Ações</td>
              </tr>
            </thead>
            {data.map((item, index) => (
              <tbody>
                <tr>
                  <td>{item.codigo}</td>
                  <td>{item.nome}</td>
                  <td>{item.marca}</td>
                  <td>{item.quantidade}</td>
                  <td>{item.valor}</td>
                  <td>{item.peso}</td>
                  <td>{item.validade}</td>
                  <td>{item.fabricacao}</td>
                  <td>
                    <Button
                      variant="light"
                      style={{
                        marginRight: 7,
                        borderWidth: 1,
                        borderColor: "black",
                      }}
                    >
                      <FiEdit3 size={20} color="#black" onclick={handleEdit} />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(index)}
                    >
                      <FiXCircle size={20} color="#black" />
                    </Button>
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
                <td>Endereço</td>
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
                  <td>{item.carteira_trabalho}</td>
                  <td>{item.cep}</td>
                  <td>{item.endereco}</td>
                  <td>{item.complemento}</td>
                  <td>
                    <Button
                      variant="light"
                      style={{
                        marginRight: 7,
                        borderWidth: 1,
                        borderColor: "black",
                      }}
                    >
                      <FiEdit3 size={20} color="#black" onclick={handleEdit} />
                    </Button>
                    <Button variant="danger">
                      <FiXCircle
                        size={20}
                        color="#black"
                        // onclick={deleteItem(item.quantidade)}
                      />
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </>
        )}
      </Table>
      {/* <Button variant="success" onPress={direcionarCadastro}>
        <FiPlus size={26} color="fff" />
        Adicionar
      </Button> */}
      <Button
        variant="success"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a
          href={`/${redirect}`}
          style={{
            color: "white",
            textDecoration: "none",
            textTransform: "uppercase",
          }}
        >
          <FiPlus size={26} color="fff" />
          Adicionar
        </a>
      </Button>
    </>
  );
};

export default GenericTable;
