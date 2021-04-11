import React, {useState, useEffect } from 'react';

import Menubar from "../components/MenubarComponent";

import GenericTable from "../components/GenericTable";
import {InputGroup, FormControl } from "react-bootstrap";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from '@material-ui/core/TextField';
import FacadeEstoque from "../Facade/FacadeEstoque";
const facadeEstoque = new FacadeEstoque();


const Estoque = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);
  const [estoque, setEstoque] = React.useState([]);
  const [id, setId] = React.useState("");
  const [value, setValue] = React.useState("id");

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
              {estoque.length > 0 ? (<GenericTable data={estoque} title="Estoque" />) 
              : 
              (<pre>
                <p>Não foi possível encontrar item com esta id...</p>
              </pre>)}
              </>
            )
        }else if (value === "venc"){
           facadeEstoque.getVencidos(true, setEstoque);
            return (  
              <>
              {estoque.length > 0 ? (<GenericTable data={estoque} title="Estoque" />)
              
              : (
                <pre>
                  <p> Não foi possível encontrar itens próximos do vencimento...</p>
                </pre>

              )}
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
      </div>
    </>
  );
};

export default Estoque;
