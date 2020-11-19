import React from "react";

import {useHistory} from  "react-router-dom"

import { Table, Button, InputGroup, FormControl } from "react-bootstrap";

import { FiEdit3, FiXCircle, FiPlus,  FiSearch } from "react-icons/fi";

import "bootstrap/dist/css/bootstrap.min.css";


const url = window.location.href.replace("http://localhost:3000/func/", "");

const GenericTable = ({ data, title }) => {
  const history = useHistory()

  const direcionarCadastro = () => {
    {url === "pedidos" && (history.push("/RegistrarPedidos"))

    }
    {url === "clientes" && (history.push("/"))
    
    }
    {url === "produtos" && (history.push("/"))
    
    }
    {url === "estoque" && (history.push("/"))
  
    }

  }

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
                    <Button variant="light" style={{marginRight:7, borderWidth:1, borderColor:"black"}}>
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
                  <td>{item.id}</td>
                  <td>{item.cpf}</td>
                  <td>{item.nome}</td>
                  <td>{item.endereco}</td>
                  <td>{item.email}</td>
                  <td>{item.telefone}</td>
                  <td>
                    <Button variant="light" style={{marginRight:7, borderWidth:1, borderColor:"black"}}>
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
      </Table>
      <Button variant="success" onClick={direcionarCadastro}>
        <FiPlus size={26} color="fff"/>
        Adicionar
      </Button>
    </>
  );
};

export default GenericTable;
