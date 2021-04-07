import React, { useEffect } from "react";
import Menubar from "../components/MenubarComponent";
import GenericTable from "../components/GenericTable";
import TextField from "@material-ui/core/TextField";

const axios = require("axios");

const Pedidos = () => {
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
        <div style={{ marginTop: 20 }}>
          {pedidos.length > 1 ? (
            <GenericTable data={pedidos} title="Pedidos" />
          ) : (
            <pre>
              <h4>Nenhum pedido foi registrado nesta data...</h4>
            </pre>
          )}
        </div>
      </div>
    </>
  );
};

export default Pedidos;
