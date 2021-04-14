import React from "react";
import RelatorioSatisfacaoComponent from "../components/SatisfacaoTempoComponent";
import Menubar from "../components/MenubarComponent";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import SatisfacaoTempoComponent from "../components/SatisfacaoTempoComponent";
import SatisfacaoProdutoComponent from "../components/SatisfacaoProdutoComponent";

const RelatorioSatisfacao = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);

  const [value, setValue] = React.useState("tempo");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function CarregaTabela() {
    if (value === "tempo") {
      return <SatisfacaoTempoComponent />;
    } else if (value === "produto") {
      return <SatisfacaoProdutoComponent />;
    }
  }

  return (
    <>
      <Menubar currentUser={convertedUser} />
      <h2>Relatórios de Satisfação:</h2>
      <FormControl>
        <FormLabel>Filtrar por</FormLabel>
        <RadioGroup
          aria-label="RelatorioSatisfacao"
          name="RelatorioSatisfacao"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel control={<Radio />} value="tempo" label="Data" />
          <FormControlLabel
            control={<Radio />}
            value="produto"
            label="produtos"
          />
        </RadioGroup>
      </FormControl>
      {CarregaTabela()}
    </>
  );
};
export default RelatorioSatisfacao;
