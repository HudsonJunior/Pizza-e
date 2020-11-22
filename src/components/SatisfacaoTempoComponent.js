import React from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';

const SatisfacaoTempoComponent= () => {
  
  const dados = [
    {id:1,probEntrega: 'Entrega demorou mais que o previsto', insatisfacoes:'entrega', reclamacaoAtend:'Nenhuma',reclamacaoProd:'Nenhuma',data:'20/11/2020'},  
    {id:2,probEntrega: 'Nenhuma', insatisfacoes:'Mal atendido', reclamacaoAtend:'Atendente não sabe nada',reclamacaoProd:'Pizza murcha',data:'20/11/2020'},
    {id:3,probEntrega: 'Entrega rapida', insatisfacoes:'Pizza ruim', reclamacaoAtend:'Nenhuma',reclamacaoProd:'Pizza ruim',data:'20/09/2020'},
    {id:4,probEntrega: 'Nenhuma', insatisfacoes:'Pior pizza do mundo', reclamacaoAtend:'Nenhuma',reclamacaoProd:'pizza fria',data:'12/09/2020'},
    {id:5,probEntrega: 'Demorou mais que o previsto', insatisfacoes:'Nenhuma', reclamacaoAtend:'entrega',reclamacaoProd:'Nenhuma',data:'10/05/2020'},
  ];


    return (
      <div>
        <TextField
          id="dateI"
          label="Data"
          type="date"
          defaultValue="2020-02-10"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>Id</td>
              <td>Data</td>
              <td>Insatisfações</td>
            </tr>
          </thead>
          {dados.map((item) => (
            <tbody>
              <tr>
                <td>{item.id}</td>
                <td>{item.data}</td>
                <td>{item.insatisfacoes}</td>
              </tr>
            </tbody>
          ))}
        </Table>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{
            borderWidth: 1,
            borderColor: "black",
            margin: 20,
            backgroundColor: "lightGray",
          }}
        >
          Baixar
        </Button>
      </div>
    );
  };
  


export default SatisfacaoTempoComponent;