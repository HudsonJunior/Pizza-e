import React from "react"
import Menubar from "../components/MenubarComponent";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Movimentacoes from "../components/RelatoriosEstoque/Movimentacoes"
import Vencimentos from "../components/RelatoriosEstoque/Vencimentos"
import QuantidadeBaixa from "../components/RelatoriosEstoque/QuantidadeBaixa";


const RelatoriosVenda = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);

  const [value, setValue] = React.useState("mov");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function CarregaTabela (){
        if (value === "mov"){
            return <Movimentacoes/>
        }else if (value === "venc"){
            return <Vencimentos/>
        }
        else if (value === "baixa"){
            return <QuantidadeBaixa/>
        }  
  }

  return (
    <>
      <Menubar currentUser={convertedUser} />
      <h2>Relatórios de Estoque:</h2>
      <FormControl component="RadioBtnRelatorioEstoque">
      <FormLabel >Filtrar por</FormLabel>
        <RadioGroup aria-label="RelatorioEstoque" name="RelatorioEstoque" value={value} onChange={handleChange}>
          <FormControlLabel
            control={<Radio />}
            value="mov"
            label="Movimentações"
          />
          <FormControlLabel
            control={<Radio />}
            value="venc"
            label="Produtos vencidos"
          />
          <FormControlLabel
            control={<Radio />}
            value="baixa"
            label="Produtos com quantidade baixa"
          />
        </RadioGroup>
      </FormControl>
      {CarregaTabela()}
    </>
  );
};
export default RelatoriosVenda;