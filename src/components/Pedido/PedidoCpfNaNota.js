import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";


const NotaFiscalCpf = () => {

  const [value, setValue] = React.useState("semCpf");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const criaCampoCpf = () => {
    return (value==="comCpf") ? (
      <TextField required id="CampoCpf" label="CPF" type="number" />
    ) : (
      <></>
    );
  };

  return (
    <div className="RPNota">
      <FormControl required component="RadioBtnNota">
        <FormLabel component="legend">Emissão de Nota Fiscal</FormLabel>
        <RadioGroup
          aria-label="notaFiscal"
          name="notaFiscal1"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="semCpf"
            control={<Radio />}
            label="Sem CPF"
          />
          {/* <FormControlLabel value="cpfCadastrado" control={<Radio />} label="CPF do cliente cadastrado " onChange={handleChangeCpfCadastrado} /> */}
          <FormControlLabel
            value="comCpf"
            control={<Radio />}
            label="Com CPF"
          />
          {criaCampoCpf()}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default NotaFiscalCpf;
