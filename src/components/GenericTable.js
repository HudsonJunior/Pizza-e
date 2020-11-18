import React from "react";

import { Table, Button, InputGroup, FormControl } from "react-bootstrap";

import { FiPlus, FiSearch } from "react-icons/fi";

import "bootstrap/dist/css/bootstrap.min.css";

// const Row1 = ({ record }) => {
//   const keys = Object.keys(record);
//   return (
//     <tr key={record.id}>
//       {keys.map((key) => (
//         <td key={key}>{record[key]}</td>
//       ))}
//     </tr>
//   );
// };

// const Table = ({data}) => {
//     const keys = Object.keys(data[0])
//     return(
//         <table>
//             <thead>
//                 <tr>
//                     {
//                         keys.map(key => <th key={key}>{key}</th>)
//                     }
//                 </tr>

//             </thead>
//             <tbody>
//                 {data.map(record => <Row1 record = {record} />)}
//             </tbody>
//         </table>
//     )
// }

const url = window.location.href.replace("http://localhost:3000/func/", "");

const GenericTable = ({ data, title }) => {
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

        {url === "pedidos" && (
          <>
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
                    <Button variant="success">
                      <FiPlus size={26} color="#fff" /> Adicionar
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
                </tr>
              </tbody>
            ))}
          </>
        )}
      </Table>
    </>
  );
};

export default GenericTable;
