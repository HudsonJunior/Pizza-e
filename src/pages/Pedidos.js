import React, { useEffect } from "react";
import Menubar from "../components/MenubarComponent";
import GenericTable from "../components/GenericTable";
import TextField from "@material-ui/core/TextField";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
const axios = require("axios");

const Pedidos = () => {
  const history = useHistory();
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);
  const [pedidos, setPedidos] = React.useState([]);
  let today = new Date();
  let currentDate =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);

  const [date, setDate] = React.useState(currentDate);

  useEffect(() => {
    if (pedidos) {
      getPedidos(date);
    }
  }, [date]);

  const getPedidos = async (date) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/pedido/data?data=${date}`
      );
      const pedidosResponse = await response.data;
      setPedidos(pedidosResponse);
    } catch (error) {
      setPedidos([]);
    }
  };

  const direcionarCadastro = () => {
    history.push("/gerenciar-pedido", { tipo: "Cadastro" });
  };
  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="pedidos">
        <h2>Pedidos:</h2>
        <TextField
          id="date"
          label="Data"
          type="date"
          defaultValue={date}
          InputLabelProps={{
            shrink: true,
          }}
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <div style={{ margin: 15 }}>
          {pedidos.length > 0 ? (
            <GenericTable data={pedidos} title="Pedidos" />
          ) : (
            <div>
              <pre>
                <h5>Nenhum pedido foi registrado nesta data...</h5>
              </pre>
              <Button variant="success" onClick={direcionarCadastro}>
                <FiPlus size={26} color="fff" />
                Adicionar
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pedidos;
