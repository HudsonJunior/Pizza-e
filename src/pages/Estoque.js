import React, {useState, useEffect } from 'react';

import Menubar from "../components/MenubarComponent";

import GenericTable from "../components/GenericTable";
import {InputGroup, FormControl } from "react-bootstrap";

import FacadeEstoque from "../Facade/FacadeEstoque";

const facadeEstoque = new FacadeEstoque();


const axios = require('axios');


const Estoque = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);

  const [estoque, setEstoque] = React.useState([]);
  const [id, setId] = React.useState("");

  useEffect(() => {
    if (id === "") {
      facadeEstoque.getEstoque(null, setEstoque);
    } else facadeEstoque.getEstoque(id, setEstoque);
  }, [id]);
  
  
  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="estoque">
        <h2>Estoque:</h2>
        <InputGroup className="mb-3" style={{ width: 300, paddingLeft: 10 }}>
          <FormControl
            placeholder="Estoque"
            aria-describedby="basic-addon2"
            value={id}
            onChange={(event) => setId(event.target.value)} 
          />
        </InputGroup>
        <GenericTable data={estoque} title="Estoque" />
      </div>
    </>
  );
};

export default Estoque;
