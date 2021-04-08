import React, { useEffect } from "react";

import Menubar from "../components/MenubarComponent";
import GenericTable from "../components/GenericTable";

const axios = require('axios');

const Produtos = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);
  const [produtos, setProdutos] = React.useState([]);


  useEffect(() => {
    getProdutos()
  }, [])

  const getProdutos = async () => {
    const response = await axios.get(
      `http://localhost:8080/produtos-finais`
    );
    const produtosArray = response.data;
    setProdutos(produtosArray);
    console.log(produtosArray)
  }

  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="produtos">
        <h2>Produtos:</h2>
        <GenericTable data={produtos} title="Produtos" />
      </div>
    </>
  );
};

export default Produtos;
