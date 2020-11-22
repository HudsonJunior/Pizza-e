import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import { Table, Button, InputGroup, FormControl } from "react-bootstrap";

import { FiEdit3, FiXCircle, FiPlus, FiSearch } from "react-icons/fi";

import "bootstrap/dist/css/bootstrap.min.css";

const url = window.location.href.replace("http://localhost:3000/", "");

const GenericTable = ({ data, title }) => {
  const history = useHistory();

  const handleEdit = () => {
    {
      url === "pedidos" && history.push("/");
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
    {
      console.log(1);
      url === "funcionarios" && history.push("/editar-funcionario");
    }
  };
  const direcionarCadastro = () => {
    {
      url === "pedidos" && history.push("/");
    }
    {
      url === "clientes" && history.push("/");
    }
    {
      url === "produtos" && history.push("/");
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
                <td>ID</td>
                <td>Descrição</td>
                <td>Pagamento</td>
                <td>Expedição</td>
                <td>Data</td>
                <td>CPF</td>
                <td>Observações</td>
                <td>Ações</td>
              </tr>
            </thead>
            {data.map((item) => (
              <tbody>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.descrição}</td>
                  <td>{item.pagamento}</td>
                  <td>{item.expedição}</td>
                  <td>{item.data}</td>
                  <td>{item.CPF}</td>
                  <td>{item.observacoes}</td>
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
                      onClick={handleEdit}
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
                      onClick={handleEdit}
                    >
                      <FiEdit3 size={20} color="#black" />
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
      <Button variant="success" onClick={direcionarCadastro}>
        <FiPlus size={26} color="fff" />
        Adicionar
      </Button>
    </>
  );
};

export default GenericTable;
