import React, {useState, useEffect } from 'react';

import Menubar from "../components/MenubarComponent";

import GenericTable from "../components/GenericTable";
import {InputGroup, FormControl } from "react-bootstrap";
import { Button, Modal } from 'react-bootstrap';

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from '@material-ui/core/TextField';
import FacadeEstoque from "../Facade/FacadeEstoque";
import { Dialog } from "@material-ui/core";

import DialogActions from "@material-ui/core/DialogActions";

import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogContent, DialogContentText, MenuItem } from '@material-ui/core';

import "../components/styles/Estoque.css"

const facadeEstoque = new FacadeEstoque();


const Estoque = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);
  const [estoque, setEstoque] = React.useState([]);
  const [id, setId] = React.useState("");
  const [value, setValue] = React.useState("id");
  const [showDialog, setShowDialog] = useState(false);

  const handleChange = (event) => {
    if(event.target.value == "id"){
      facadeEstoque.getEstoque(null, setEstoque);
      setValue(event.target.value);
    }else{
      setValue(event.target.value);
    }
  };


  useEffect(() => {
    if (id === "") {
      facadeEstoque.getEstoque(null, setEstoque);
    }else facadeEstoque.getEstoque(id, setEstoque);
  }, [id]);

  const showDialogAjuda = () => {
    setShowDialog(true)
}

  function CarregaTabela (){
        if (value === "id"){
            return (
              <>
              <InputGroup className="mb-3" style={{ width: 300, paddingLeft: 10 }}>
                <FormControl
                placeholder="Digitar id do item"
                aria-describedby="basic-addon2"
                value={id}
                onChange={(event) => setId(event.target.value)} 
                />
              </InputGroup>
              <GenericTable data={estoque} title="Estoque" />
              </>
            )
        }else if (value === "venc"){
           facadeEstoque.getVencidos(true, setEstoque);
            return (  
              <>
              <GenericTable data={estoque} title="Estoque" />
              </>
            )
        }
  } 
  
  
  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="estoque">
        <h2>Estoque:</h2>
        <FormLabel >Pesquisar por</FormLabel>
        <RadioGroup value={value} onChange={handleChange}>
          <FormControlLabel
            control={<Radio />}
            value="id"
            label="Id do item"
          />
          <FormControlLabel
            control={<Radio />}
            value="venc"
            label="Produtos vencidos"
          />
        </RadioGroup>
        {CarregaTabela()}
        <div className="botaoAjuda">
        <Button variant="primary" style={{ alignItems: 'center', textAlign: "center" }} onClick={showDialogAjuda}>Precisa de ajuda?</Button>
        </div>
      </div>
      <Dialog
                    open={showDialog}
                    onClose={() => setShowDialog(false)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Ajuda online de contexto
                  </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Você está na tela do controle do estoque
                        </DialogContentText>
                        <DialogContentText>
                            A tabela ao centro mostra todos os itens registrados no estoque por padrão.
                        </DialogContentText>
                        <DialogContentText>
                            Caso queira checar os produtos que estão vencidos, ou prestes a vencer nos próximos 7 dias basta selecionar a opção "Produtos vencidos" no menu radial.
                        </DialogContentText>
                        <DialogContentText>
                            Para pesquisar um item pelo seu id, basta selecionar a opção "Id do item" no menu radial, e utilizar o campo de busca informando o Id do item desejado.
                        </DialogContentText>
                        <DialogContentText>
                            Se quiser adicionar um novo item ao estoque, basta clicar no botão verde abaixo da tabela, e informar os dados necessários.
                        </DialogContentText>
                        <DialogContentText>
                            Já para editar um item existente, basta clicar no botão branco com o símbolo de um lápis na linha do item na tabela.
                        </DialogContentText>
                        <DialogContentText>
                            Para apagar um item do estoque, apenas clique no botão vermelho da linha do item na tabela.
                        </DialogContentText>
                        <DialogContentText>
                            Para voltar para a página anterior, clique no botão "Voltar"
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className="botao"
                            onClick={() => setShowDialog(false)}
                            color="primary"
                        >
                            Ok
                        </Button>

                    </DialogActions>
                </Dialog>
    </>
  );
};

export default Estoque;
