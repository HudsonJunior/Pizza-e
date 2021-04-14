import React,{useState,useEffect} from "react";

import Menubar from "../components/MenubarComponent";
import GenericTable from "../components/GenericTable";


const axios=require('axios')

const Clientes = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);

  const [clientes, setClientes] = React.useState([]);
  useEffect(() => {
      getClientes()
    }, []);

  const getClientes = async () => {
    //console.log("-----------------------------------------------------rola")
    const response = await axios.get(
      `http://localhost:8080/clientes`
    );
    const clientesResponse = await response;
    const clientesArray = clientesResponse.data;
    setClientes(clientesArray);
  };

  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="clientes">
        <h2>Clientes:</h2>
        <GenericTable data={clientes} title="Clientes" />
      </div>
    </>
  );
};

export default Clientes;
