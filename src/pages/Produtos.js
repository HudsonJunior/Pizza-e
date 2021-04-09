import React, { useEffect } from "react";

import Menubar from "../components/MenubarComponent";
import GenericTable from "../components/GenericTable";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import FacadeProduto from "../Facade/FacadeProduto";


const Produtos = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);
  const [produtos, setProdutos] = React.useState([]);
  const [nomeProduto, setNomeProduto] = React.useState("");
  const facadeProdutos = new FacadeProduto()


  useEffect(() => {
    if (nomeProduto === "") {
      facadeProdutos.getProdutos(null, setProdutos);
    } else facadeProdutos.getProdutos(nomeProduto, setProdutos);
  }, [nomeProduto]);


  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="produtos">
        <h2>Produtos:</h2>
        <InputGroup className="mb-3" style={{ width: 300, paddingLeft: 10 }}>
          <FormControl
            placeholder="Nome do produto"
            aria-describedby="basic-addon2"
            value={nomeProduto}
            onChange={(event) => setNomeProduto(event.target.value)}
          />
        </InputGroup>
        <GenericTable data={produtos} title="Produtos" />
      </div>
    </>
  );
};

export default Produtos;
