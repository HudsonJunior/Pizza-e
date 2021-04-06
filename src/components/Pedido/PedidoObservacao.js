import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  formControl1: {
    margin: theme.spacing(1),
    minWidth: 150,
    width: "22ch",
  },
}));

const Observacoes = (props) => {
  console.log(props);
  const classes = useStyles();

  useEffect(() => {
    if (props.observacoes) {
      props.setObs(props.observacoes);
    }
  }, []);
  return (
    <div className="RPCampos">
      <TextField
        id="txtFieldObs"
        label="Observações"
        multiline
        value={props.observacoes}
        onChange={(event) => props.setObs(event.target.value)}
        rows={2}
      />
    </div>
  );
};

export default Observacoes;
