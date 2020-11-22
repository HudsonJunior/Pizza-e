import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl1: {
    margin: theme.spacing(1),
    minWidth: 150,
    width: "22ch",
  },
}));

const Pagamento = () => {
  const classes = useStyles();

  const [formaPagamento, setFormaPagamento] = React.useState("");
  const handleChangePag = (event) => {
    setFormaPagamento(event.target.value);
  };

  return (
    <div className="RPCampos">
      <TextField
        style={{ width: 100 }}
        id="valorPedido"
        value={"R$ 00,00"}
        label="Valor Total"
      />
      <FormControl required className={classes.formControl1}>
        <InputLabel id="inputPagamento">Forma de Pagamento</InputLabel>
        <Select
          labelId="labelFormaPagamento"
          id="selecaoPagamento"
          value={formaPagamento}
          onChange={handleChangePag}
        >
          <MenuItem value={"din"}>Dinheiro</MenuItem>
          <MenuItem value={"cd"}>Cartão de Débito</MenuItem>
          <MenuItem value={"cc"}>Cartão de Crédito</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
export default Pagamento;
