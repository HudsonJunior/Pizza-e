import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  formControl1: {
    margin: theme.spacing(1),
    minWidth: 150,
    width: "35ch",
  },
}));

const Pagamento = (props) => {
  const classes = useStyles();

  useEffect(() => {
    if (props.formaPagamento) {
      if (props.formaPagamento === "dinheiro") {
        props.setPagamento("dinheiro");
      } else if (props.formaPagamento === "cartão de debito") {
        props.setPagamento("cartao de debito");
      } else {
        props.setPagamento("cartao de credito");
      }
    }
  }, []);

  return (
    <div className="RPCampos">
      <FormControl required className={classes.formControl1}>
        <InputLabel id="inputPagamento">Forma de Pagamento</InputLabel>
        <Select
          labelId="labelFormaPagamento"
          id="selecaoPagamento"
          value={props.formaPag}
          onChange={(event) => props.setPagamento(event.target.value)}
        >
          <MenuItem value={"dinheiro"}>Dinheiro</MenuItem>
          <MenuItem value={"cartão de debito"}>Cartão de Débito</MenuItem>
          <MenuItem value={"cartão de credito"}>Cartão de Crédito</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
export default Pagamento;
