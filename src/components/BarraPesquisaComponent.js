import React from "react";

import { InputGroup } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { FormControl } from "react-bootstrap";

const BarraPesquisa = () => {
  return (
    <InputGroup className="col-5 mb-3" styles={{paddingLeft:0}}>
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">
          <FiSearch size={18} color="#000" />
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder={"Código do produto"}
        aria-label="BuscarCodigoProduto"
        aria-describedby="basic-addon1"
      />
    </InputGroup>
  );
};

export default BarraPesquisa;
