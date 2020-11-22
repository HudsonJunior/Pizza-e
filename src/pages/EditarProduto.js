import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import Menubar from "../components/MenubarComponent";
import "./../components/styles/CadastroProduto.css"
import {useHistory} from  "react-router-dom"
import { FiCheckCircle, FiChevronLeft } from "react-icons/fi";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ReactTooltip from 'react-tooltip';

import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
    root: {
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      width: "30ch",
    },
  }));
  

const CadastroProduto = props => {
    const toastStyle = {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      };

      
    const history = useHistory()

    const {tipo} = "Pizza"
    const isPizza = tipo === "Pizza"
    const user = localStorage.getItem("user");
    const convertedUser = JSON.parse(user);
    const [voltar,setVoltar] = useState(false)
    const [valorPromo, setValorPromo] = useState("")
    const [data1Promo, setData1Promo] = useState("2020-11-24T09:30")
    const [data2Promo, setData2Promo] = useState("2020-11-24T09:30")
    

    const [addPromo, setAddPromo] = useState(false)

    const [showModal,setShowModal] = useState(false)
    
    const classes = useStyles();

    const getButtonsPromo = () => {
        return ( addPromo ?
                <div className="contentProdutos">
                    <TextField id="standard-basic" value={valorPromo} onChange={event => setValorPromo(event.target.value)} label="Valor promocional" className={classes.textField}/>
                    <TextField id="datetime-local" value={data1Promo} onChange={event => setData1Promo(event.target.value)} type="datetime-local" label="Data início promoção" className={classes.textField} InputLabelProps={{shrink: true}}/>
                    <TextField id="datetime-local" value={data2Promo} onChange={event => setData2Promo(event.target.value)} type="datetime-local" label="Data final promoção" className={classes.textField} InputLabelProps={{shrink: true}}/>
                </div>
            :
                <div></div>
        )
    }
      
    const handleSubmit = event => {
        event.preventDefault();
        setShowModal(true)
    }

    if(voltar)
        history.push("/func/produtos")


    const getFields = () => {
        return (!isPizza ?
                    <div className="contentProdutos" style={{margin:20}}>
                        <TextField  className={classes.textField} id="standard-basic" label="Peso" required/>
                        <TextField  className={classes.textField} select id="standard-select-currency" label="Status" required>
                            <MenuItem value={1}>Ativado</MenuItem>
                            <MenuItem value={2}>Desativado</MenuItem>
                        </TextField>
                    </div>
                    
                :

                    <div className="contentProdutos">
                        <TextField className={classes.textField} id="standard-basic" label="Ingredientes" multiline required/>
                        <TextField className={classes.textField} id="standard-basic" label="Quantidade" required/>
                        <TextField className={classes.textField} id="standard-basic" label="Adicionais" multiline/>
                    </div>
                
            )
    }
    const renderLayoutCadastro = () => {
        return( 
                <form className={classes.root} onSubmit={handleSubmit}> 
                    <div className="contentProdutos">
                        <TextField className={classes.textField} id="standard-basic" label="Nome" required/>
                        <TextField className={classes.textField}  id="standard-basic" label="Valor" required/>
                        <TextField className={classes.textField}  disabled id="standard-basic" label="Código" defaultValue="Automático"/>
                        {getFields()}
                        <Button style={{margin:20}} variant="light" onClick={value => setAddPromo(!addPromo)} data-tip="Lançar uma promoção do produto">Adicionar promoção</Button>
                        <ReactTooltip />
                        {getButtonsPromo()}
                        <text>* obrigatório</text>
                        <div className="disButtonsCadastro">
                        <Button
                            className="botao"
                            variant="ligth"
                            style={{ marginRight: 7, borderWidth: 1, borderColor: "black" }}
                            onClick={value => setVoltar(true)}
                            >
                            <FiChevronLeft /> Voltar
                        </Button>                            
                        <Button
                            className="botao"
                            style={{borderWidth: 1, borderColor: "black" }}
                            type="submit"
                            variant="success"
                            >
                            <FiCheckCircle /> Confirmar
                        </Button>
                        </div>
                    </div>
                </form>                      
        )
    }

    return (
    <>
        <Menubar currentUser={convertedUser} />
        <div className="containerCadastroProduto">
            <h1 style={{textAlign: "center", paddingTop:20}}>{tipo === "Pizza"? "Cadastrar nova pizza": "Cadastrar novo produto"}</h1>
            <h5 style={{textAlign: "center", paddingTop:40}}>Informe os dados necessários para o cadastro {isPizza ? "da pizza" : "do produto"}</h5>
            {renderLayoutCadastro()}
        </div>
        
        <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            backdrop="static"
            keyboard={false}
            >
            <Modal.Header closeButton>
            <Modal.Title>Confirmar cadastro</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{display:"flex"}}>  
                Tem certeza que deseja continuar com o cadastro?
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
                Voltar
            </Button>
            <Button variant="primary" onClick={() => {
                setShowModal(false)
                toast.success("🍕 Produto cadastrado com sucesso!", {
                    toastStyle,
                })
                setTimeout(() => {
                    history.push("/func/produtos")
                }, 1500);
            }}>Continuar</Button>
            </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
    )
}

export default CadastroProduto