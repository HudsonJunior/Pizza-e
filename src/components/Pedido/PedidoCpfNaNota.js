import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";


const NotaFiscalCpf = () => {
  const [value, setValue] = React.useState("semCpf");
  const handleChangeNF = (event) => {
    setValue(event.target.value);
  };

  const [outroCpf, setOutroCpf] = React.useState(false);

  const criaCampoCpf = () => {
    return outroCpf ? (
      <TextField required id="CampoCpf" label="CPF" type="number" />
    ) : (
      <div></div>
    );
  };

  const handleChangeSemCpf = () => {
    setOutroCpf(false);
  };

  const handleChangeCpfCadastrado = () => {
    setOutroCpf(false);
  };

  const handleChangeOutroCpf = () => {
    setOutroCpf(true);
  };

  return (
    <div className="RPNota">
      <FormControl required component="RadioBtnNota">
        <FormLabel component="legend">Emissão de Nota Fiscal</FormLabel>
        <RadioGroup
          aria-label="notaFiscal"
          name="notaFiscal1"
          value={value}
          onChange={handleChangeNF}
        >
          <FormControlLabel
            value="semCpf"
            control={<Radio />}
            label="Sem CPF"
            onChange={handleChangeSemCpf}
          />
          {/* <FormControlLabel value="cpfCadastrado" control={<Radio />} label="CPF do cliente cadastrado " onChange={handleChangeCpfCadastrado} /> */}
          <FormControlLabel
            value="outro"
            control={<Radio />}
            label="Com CPF"
            onChange={handleChangeOutroCpf}
          />
          {criaCampoCpf()}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default NotaFiscalCpf;
