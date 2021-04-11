import React from "react";
import Menubar from "../components/MenubarComponent";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Movimentacoes from "../components/RelatoriosEstoque/Movimentacoes";
import Vencimentos from "../components/RelatoriosEstoque/Vencimentos";
import QuantidadeBaixa from "../components/RelatoriosEstoque/QuantidadeBaixa";
import GetAppIcon from "@material-ui/icons/GetApp";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "react-bootstrap";

const RelatoriosVenda = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);

  const [value, setValue] = React.useState("mov");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function CarregaTabela() {
    if (value === "mov") {
      return <Movimentacoes />;
    } else if (value === "venc") {
      return <Vencimentos />;
    } else if (value === "baixa") {
      return <QuantidadeBaixa />;
    }
  }

  const salvar = () => {
    var titulo = "";
    if (value === "mov") {
      titulo = "Relatorio_Estoque_Movimentacoes.pdf";
    } else if (value === "venc") {
      titulo = "Relatorio_Estoque_Vencimento.pdf";
    } else {
      titulo = "Relatorio_Estoque_Quantidade.pdf";
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
      <h2>Relatórios de Estoque:</h2>
      <FormControl component="RadioBtnRelatorioEstoque">
        <FormLabel>Filtrar por</FormLabel>
        <RadioGroup
          aria-label="RelatorioEstoque"
          name="RelatorioEstoque"
          value={value}
          onChange={handleChange}
        >
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
            label="Quantidade de cada produto"
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
