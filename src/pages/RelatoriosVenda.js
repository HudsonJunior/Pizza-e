import React from "react";
import Menubar from "../components/MenubarComponent";
import TabelaCodigo from "../components/RelatoriosVenda/VendaTabelaCodigo";
import TabelaData from "../components/RelatoriosVenda/VendaTabelaData";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { Button } from "react-bootstrap";
import GetAppIcon from "@material-ui/icons/GetApp";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const RelatoriosVenda = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);

  const [value, setValue] = React.useState("data");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const CarregaTabela = () => {
    return value === "data" ? <TabelaData /> : <TabelaCodigo />;
  };

  const salvar = () => {
    var titulo = "";
    if (value === "data") {
      titulo = "Relatorio_Venda_Intervalo_Datas.pdf";
    } else {
      titulo = "Relatorio_Venda_Nome_Produto.pdf";
    }
    const input = document.querySelector("#relatorio");
    html2canvas(input).then((canvas) => {
      document.body.appendChild(canvas);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(canvas);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(titulo);
    });
  };

  return (
    <>
      <Menubar currentUser={convertedUser} />
      <h2>Relatórios de Vendas:</h2>
      <FormControl component="RadioBtnRelatorioVenda">
        <FormLabel>Filtrar por</FormLabel>
        <RadioGroup
          aria-label="RelatorioVenda"
          name="RelatorioVenda1"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            control={<Radio />}
            value="data"
            label="Período de tempo"
          />
          <FormControlLabel
            control={<Radio />}
            value="codigo"
            label="Nome do produto"
          />
        </RadioGroup>
      </FormControl>
      {CarregaTabela()}
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{
          borderWidth: 1,
          borderColor: "black",
          margin: 20,
          backgroundColor: "lightGray",
        }}
        onClick={() => salvar()}
      >
        <GetAppIcon />
        Salvar
      </Button>
    </>
  );
};
export default RelatoriosVenda;
