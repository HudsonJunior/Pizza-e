import React, {useState, useEffect } from 'react';

import Menubar from "../components/MenubarComponent";
import GenericTable from "../components/GenericTable";

import FacadeFuncionario from "../Facade/FacadeFuncionario"

import {InputGroup, FormControl } from "react-bootstrap";

import {
  FiSearch,
} from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";

const facadeFunc = new FacadeFuncionario()

const axios = require('axios');

const Funcionarios = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);



  const [func, setFunc] = React.useState([]);
  const [cpfFunc, setCpf] = React.useState("");


  useEffect(() => {
    if (cpfFunc === "") {
      facadeFunc.getFuncionario(null, setFunc);
      console.log('func', func)
    } else facadeFunc.getFuncionario(cpfFunc, setFunc);
  }, [cpfFunc]);

  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="funcionario">
        <h2>Funcionários:</h2>
        <InputGroup className="mb-3" style={{ width: 300, paddingLeft: 10 }}>
          <FormControl
            placeholder="Cpf do funcionario"
            aria-describedby="basic-addon2"
            value={cpfFunc}
            onChange={(event) => setCpf(event.target.value)}
          />
        </InputGroup>
        {func.length > 0 ? (<GenericTable data={func} title="Funcionarios" />) : 
              (<pre>
                <p>Não foi possível encontrar um funcionario...</p>
              </pre>)}
      </div>
    </>
  );
};

export default Funcionarios;
