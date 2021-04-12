import React, { useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "react-bootstrap";
import { FiUser, FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";
import FormDialogCliente from "./DialogCliente";

const useStyles = makeStyles((theme) => ({
  formControl2: {
    margin: theme.spacing(1),
    minWidth: 150,
    width: "35ch",
  },
}));

const Expedicao = (props) => {
  const history = useHistory();
  const classes = useStyles();
  var tipo = props.type;

  useEffect(() => {
    if (props.formaExpedicao && props.formaExpedicao === "entrega")
      props.setExpedicao("entrega");
    else if (props.formaExpedicao && props.formaExpedicao === "balcao")
      props.setExpedicao("balcao");
  }, []);

  const handleLogin = () => {
    history.push("/login", { tipo: "pedido" });
  };

  const handleCadastrar = () => {
    history.push("/cadastrar-cliente", { tipo: "pedido" });
  };

  const handleBuscarCliente = () => {
    history.push("/clientes", { tipo: "pedidoFunc" });
  };

  const handleNovoCliente = () => {
    history.push("/funcionario-cadastrar-cliente", { tipo: "pedido" });
  };

  const chamaClienteFunc = () => {
    return props.formaExpedicao === "entrega" ? (
      <div className="RPCliente">
        <FormControl style={{ alignItems: "center" }}>
          <div>
            <FormDialogCliente
              setCliente={props.setCliente}
              cpfCliente={props.cpfCliente}
              setEndereco={props.setEndereco}
              endereco={props.endereco}
            />
            <div>
              <p style={{ marginBottom: 0, padding: 5 }}>Ou</p>
              <Button variant="success" onClick={handleNovoCliente}>
                <FiPlus size={15} color="fff" />
                Novo Cliente
              </Button>
            </div>
          </div>
          <TextField
            className={classes.textField}
            onChange={(event) => props.setEndereco(event.target.value)}
            value={props.endereco}
            id="standard-basic"
            label="Endereço de entrega"
            required
          />
        </FormControl>
      </div>
    ) : (
      <div></div>
    );
  };

  const chamaClienteVisitante = () => {
    return props.formaExpedicao === "entrega" ? (
      <div className="RPCliente">
        <FormControl style={{ alignItems: "center" }}>
          <Button
            variant="light"
            onClick={handleLogin}
            style={{ borderWidth: 1, borderColor: "black" }}
          >
            <FiUser size={15} color="black" />
            Login
          </Button>
          <p style={{ marginBottom: 0 }}>Ou</p>
          <Button variant="success" onClick={handleCadastrar}>
            <FiPlus size={15} color="fff" />
            Cadastrar
          </Button>
        </FormControl>
      </div>
    ) : (
      <div></div>
    );
  };

  const chamaClienteLogado = () => {
    return props.formaExpedicao === "entrega" ? (
      <div className="RPCliente">
        <TextField
          className={classes.textField}
          onChange={(event) => props.setEndereco(event.target.value)}
          value={props.endereco}
          id="standard-basic"
          label="Endereço de entrega"
          required
        />
      </div>
    ) : (
      <div></div>
    );
  };

  return (
    <div className="RPCampos">
      <FormControl required className={classes.formControl2}>
        <InputLabel id="formaExpedicao" style={{ marginTop: 0 }}>
          Forma de Expedição
        </InputLabel>
        <Select
          labelId="labelFormaExpedicao"
          id="selecaoExpedicao"
          value={props.formaExpedicao}
          onChange={(event) => props.setExpedicao(event.target.value)}
        >
          <MenuItem value={"balcao"}>Retirar no Balcão</MenuItem>
          <MenuItem value={"entrega"}>Entrega</MenuItem>
        </Select>
        {tipo === "funcionario" && chamaClienteFunc()}
        {tipo === "cliente" && chamaClienteLogado()}
        {tipo === "visitante" && chamaClienteVisitante()}
      </FormControl>
    </div>
  );
};

export default Expedicao;
