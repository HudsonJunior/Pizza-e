import React from "react";

import Menubar from "../components/MenubarComponent";

import Assistente from "../components/AssistentComponent";

import "../components/styles/EstoqueStyle.css";

import FormularioEstoque from "../components/FormEstoque";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

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

const CadastrarEstoque = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);
  return (
    <ThemeProvider theme={theme}>
      <Menubar currentUser={convertedUser} />
      <div className="flexEstoque containerEstoque">
        <div className="contentEstoque">
          <h2>Cadastrar novo produto no estoque</h2>
          <p>Informe os dados necessários...</p>
          <FormularioEstoque />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CadastrarEstoque;
