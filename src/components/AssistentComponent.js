import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Form } from "react-bootstrap";

import { FiEdit3, FiXCircle, FiPlus, FiSearch } from "react-icons/fi";

import TextField from "@material-ui/core/TextField";

import "bootstrap/dist/css/bootstrap.min.css";

import FormularioEstoque from "./FormEstoque";

import FormularioFuncionario from "./FormFuncionario";

import "./styles/AssistenteStyle.css";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const url = window.location.href.replace(
  "http://localhost:3000/cadastrar-",
  ""
);

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ffd449",
      main: "#ffa300",
      dark: "#c67400",
      contrastText: "#fff",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Informar dados do produto", "Finalizar cadastro"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
        <div className="contentForm">
          {url === "estoque" && (
            <>
              <p>Informe os dados necessários...</p>
              <FormularioEstoque />
            </>
          )}
          {url === "funcionario" && (
            <>
              <p>Informe os dados necessários...</p>
              <FormularioFuncionario />
            </>
          )}
          {/* {url === "funcionario" && <FormularioFuncionario />} */}
        </div>
      );
    case 1:
      return "Verifique os dados e finalize o cadastro...";
    default:
      return "Erro";
  }
}

export default function Assistente() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className="boxConteudo">
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>Encerrar</Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Finalizar" : "Próximo"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
