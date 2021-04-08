import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import { useEffect } from "react";

const NotaFiscalCpf = (props) => {
  const [value, setValue] = React.useState("semCpf");

  useEffect(() => {
    if (props.cpfNF) {
      props.setCpfNF(props.cpfNF);
    }
  });

  const criaCampoCpf = () => {
    return value === "comCpf" ? (
      <TextField
        required
        id="CampoCpf"
        label="CPF na Nota Fiscal"
        value={props.cpfNF}
        onChange={(event) => props.setCpfNF(event.target.value)}
      />
    ) : (
      <></>
    );
  };

  return (
    <div className="RPNota">
      <FormControl required component="RadioBtnNota">
        <FormLabel component="legend">Emissão de Nota Fiscal</FormLabel>
        <RadioGroup
          value={value}
          aria-label="notaFiscal"
          name="notaFiscal1"
          onChange={(event) => setValue(event.target.value)}
        >
          <FormControlLabel
            value="semCpf"
            control={<Radio />}
            label="Sem CPF"
          />
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
