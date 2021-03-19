import React from "react";
import Menubar from "../components/MenubarComponent";
import TabelaCodigo from "../components/RelatoriosVenda/VendaTabelaCodigo";
import TabelaData from "../components/RelatoriosVenda/VendaTabelaData"
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";


const RelatoriosVenda = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);

  const [value, setValue] = React.useState("data");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const CarregaTabela = () => {
    return value === "data" ? (
      (console.log(1), (<TabelaData />))
    ) : (
      <TabelaCodigo/>
    );
  };
  
  return (
    <>
      <Menubar currentUser={convertedUser} />
      <h2>Relatórios de Vendas:</h2>
      <FormControl component="RadioBtnRelatorioVenda">
      <FormLabel >Filtrar por</FormLabel>
        <RadioGroup aria-label="RelatorioVenda" name="RelatorioVenda1" value={value} onChange={handleChange}>
          <FormControlLabel
            control={<Radio />}
            value="data"
            label="Período de tempo"
          />
          <FormControlLabel
            control={<Radio />}
            value="codigo"
            label="Código do produto"
          />
        </RadioGroup>
      </FormControl>
      {CarregaTabela()}
    </>
  );
};
export default RelatoriosVenda;
