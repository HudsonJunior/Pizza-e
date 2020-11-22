import React, { useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "react-bootstrap";
import { FiUser, FiPlus } from "react-icons/fi";

const useStyles = makeStyles((theme) => ({
  formControl2: {
    margin: theme.spacing(1),
    minWidth: 150,
    width: "35ch",
  },
}));

const Expedicao = props => {
  const classes = useStyles();

  const [formaExpedicao, setFormaExpedicao] = React.useState("");
  const handleChangeExp = (event) => {
    setFormaExpedicao(event.target.value);
  };
  const handleChangeBalcao = () => {
    setFormaExpedicao("balcao");
  };

  useEffect(() => {
    if(props.formaExpedicao && props.formaExpedicao == "entrega")
      setFormaExpedicao("entrega")
    else
      setFormaExpedicao("balcao")

  }, [])

  const handleChangeEntrega = () => {
    setFormaExpedicao("entrega");
  };

  const chamaCliente = () => {
    return formaExpedicao === "entrega" ? (
      <div className="RPCliente">
        <FormControl style={{ alignItems: "center" }}>
          <Button
            variant="light"
            style={{ borderWidth: 1, borderColor: "black" }}
          >
            <FiUser size={15} color="black" />
            Buscar Cliente
          </Button>
          <p style={{ marginBottom: 0 }}>Ou</p>
          <Button variant="success">
            <FiPlus size={15} color="fff" />
            Novo Cliente
          </Button>
        </FormControl>
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
          value={formaExpedicao}
          onChange={handleChangeExp}
        >
          <MenuItem value={"balcao"} onChange={handleChangeBalcao}>
            Retirar no Balcão
          </MenuItem>
          <MenuItem value={"entrega"} onChange={handleChangeEntrega}>
            Entrega
          </MenuItem>
        </Select>
        {chamaCliente()}
      </FormControl>
    </div>
  );
};

export default Expedicao;
