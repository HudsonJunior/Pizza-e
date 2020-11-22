import React from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {useHistory} from  "react-router-dom"

import { Table, Button, InputGroup, FormControl } from "react-bootstrap";

import { FiEdit3, FiXCircle, FiPlus,  FiSearch } from "react-icons/fi";

import "bootstrap/dist/css/bootstrap.min.css";

import ReactTooltip from 'react-tooltip';


const url = window.location.href.replace("http://localhost:3000/func/", "");

const GenericTable = ({ data, title }) => {
  const history = useHistory()

  const direcionarCadastro = () => {
    {url === "pedidos" && (history.push("/"))

    }
    {url === "clientes" && (history.push("/"))
    
    }
    {url === "produtos" && (
        confirmAlert({
          title: "Escolher tipo",
          message: "Selecione o tipo de produto que deseja cadastrar",
          buttons: [
            {
              label: "Pizza",
              onClick: () => history.push("/func/cadastro-produto", {tipo: "Pizza"})
            },
            {
              label: "Normal",
              onClick: () => history.push("/func/cadastro-produto", {tipo: "Normal"})
            }
          ]
        })
      )

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

        {url === "produtos" && (
          <>
          <thead>
            <tr>
              <td>Tipo</td>
              <td>Código</td>
              <td>Nome</td>
              <td>Valor</td>
              <td>Peso</td>
              <td>Status</td>
              <td>Valor promocional</td>
              <td>Início da promoção</td>
              <td>Fim da promoção</td>
              <td>Ações</td>
            </tr>
            </thead>  
            {data.map((item) => (
              <tbody>
                <tr>
                  <td>{item.tipo}</td>
                  <td>{item.codigo}</td>
                  <td>{item.nome}</td>
                  <td>{item.valor}</td>
                  <td>{item.peso}</td>
                  <td>{item.status}</td>
                  <td>{item.valorPromicional}</td>
                  <td>{item.inicioPromo}</td>
                  <td>{item.fimPromo}</td>
                  <td>
                    <Button variant="light" data-tip="Editar" style={{marginRight:7, borderWidth:1, borderColor:"black"}}>
                    <ReactTooltip />
                      <FiEdit3 size={20} color="#black" />
                    </Button>
                    <Button variant="danger" data-tip="Desativar">
                    <ReactTooltip />
                      <FiXCircle size={20} color="#black" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </>
        )}
      </Table>
      <Button variant="success" data-tip="Adicionar produto" onClick={direcionarCadastro} style={{alignItems:"center", marginLeft:5}}>
      <ReactTooltip />
        <FiPlus size={26} color="fff"/>
        Adicionar
      </Button>
    </>
  );
};

export default GenericTable;
