import React from "react";

import Menubar from "../components/MenubarComponent";

import "../components/styles/FormStyle.css";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import FormularioFuncionario from "../components/FormFuncionario";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ffd449",
      main: "#ffa300",
      dark: "#c67400",
      contrastText: "#fff",
    },
  },
});

const EditarFuncionario = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);
  return (
    <ThemeProvider theme={theme}>
      <Menubar currentUser={convertedUser} />
      <div className="flexForm containerForm">
        <div className="contentForm">
          <h2>Editar dados do funcionário</h2>
          <p>Atualize os campos desejados...</p>
          <FormularioFuncionario type="editar" />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default EditarFuncionario;
