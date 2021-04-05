import React, { useEffect, useState } from 'react'
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
  

const FormProduto = props => {
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
    const {tipo} = props
    const {item} = props

    let tipoProduto = null
    let isPizza = null

    if(item){
        tipoProduto = item.tipo
        isPizza = tipoProduto === "Pizza"
    }
        
    else {
        tipoProduto = props.tipoProduto
        isPizza = tipoProduto === "Pizza"
    }
        

    const user = localStorage.getItem("user");
    const convertedUser = JSON.parse(user);
    const [voltar,setVoltar] = useState(false)
    const [valorPromo, setValorPromo] = useState("")
    const [data1Promo, setData1Promo] = useState("2020-11-24T09:30")
    const [data2Promo, setData2Promo] = useState("2020-11-24T09:30")
    
    const [nome, setNome] = useState("")
    const [valor, setValor] = useState("")
    const [ingredientes, setIngredientes] = useState("")
    const [adicionais, setAdicionais] = useState("")
    const [peso, setPeso] = useState("")
    const [status, setStatus] = useState("")

    useEffect(() => {
        if(item){
            setNome(item.nome)
            setValor(parseFloat(item.valor))
            setValorPromo(parseFloat(item.valorPromocional))
            setData1Promo(item.inicioPromo)
            setData2Promo(item.fimPromo)
            if(tipo === 'Editar' && isPizza){
                setIngredientes(item.ingredientes)
                setAdicionais(item.adicionais)
            }
            else if(tipo === 'Editar' && !isPizza){
                setPeso(item.peso)
                setStatus(item.status)
            }
        }
        
    }, [])
    const [addPromo, setAddPromo] = useState(false)

    const [showModal,setShowModal] = useState(false)
    
    const classes = useStyles();

    const getButtonsPromo = () => {
        return ( addPromo ?
                <div className="contentProdutos">
                    <div style={{flexDirection: "row", textAlign:"center"}}>
                        <TextField id="datetime-local" value={data1Promo} onChange={event => setData1Promo(event.target.value)} type="datetime-local" label="Data início promoção" className={classes.textField} InputLabelProps={{shrink: true}}/>
                        <TextField id="datetime-local" value={data2Promo} onChange={event => setData2Promo(event.target.value)} type="datetime-local" label="Data final promoção" className={classes.textField} InputLabelProps={{shrink: true}}/>

                    </div>
                    <TextField style={{width:"42%"}}id="standard-basic" value={valorPromo} onChange={event => setValorPromo(event.target.value)} type="number" label="Valor promocional" className={classes.textField}/>

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
        history.push("/produtos")


    const getFields = () => {
        return (!isPizza ?
                    <div className="contentProdutos" style={{margin:20}}>
                        <TextField  className={classes.textField} onChange={event => setPeso(event.target.value)} value={peso} id="standard-basic" label="Peso" required/>
                        <TextField  className={classes.textField} onChange={event => setStatus(event.target.value)} value={status} select id="standard-select-currency" label="Status" required>
                            <MenuItem value={1}>Ativado</MenuItem>
                            <MenuItem value={2}>Desativado</MenuItem>
                        </TextField>
                    </div>
                    
                :

                    <div className="contentProdutos">
                        <TextField className={classes.textField} onChange={event => setIngredientes(event.target.value)} value={ingredientes} id="standard-basic" label="Ingredientes" multiline required/>
                        <TextField className={classes.textField} onChange={event => setAdicionais(event.target.value)} value={adicionais} id="standard-basic" label="Adicionais" multiline/>
                    </div>
                
            )
    }

    const getHeaderText = () => {
        console.log("isPizza", isPizza, 'tipo', tipo)
        if(isPizza){
            if(tipo === 'Cadastrar')
                return "Cadastrar nova pizza"
            else
                return "Editar pizza"
        }
        else {
            if(tipo === 'Cadastrar')
                return "Cadastrar novo produto"
            else
                return "Editar produto"
        }
    }

    const getSubHeaderText = () => {
        if(isPizza){
            if(tipo === 'Cadastrar')
                return "Informe os dados necessários para o cadastro da pizza"
            else
                return "Informe os dados para a alteração da pizza"
            }
        else{
            if(tipo === 'Cadastrar')
                return "Informe os dados necessários para o cadastro do produto"
            else
                return "Informe os dados para a alteração do produto"
        }
    }


    const renderLayoutCadastro = () => {
        return( 
                <form className={classes.root} onSubmit={handleSubmit}> 
                    <div className="contentProdutos">
                        <div style={{flexDirection: "row", textAlign:"center"}}>
                        {tipo === 'Editar' ? 
                            <TextField style={{width:"42%"}} className={classes.textField} value={nome} id="standard-basic" label="Nome" disabled/>
                            :
                            <TextField style={{width:"42%"}} className={classes.textField} onChange={event => setNome(event.target.value)} value={nome} id="standard-basic" label="Nome" required/>

                        }
                        <div style={{flexDirection: "row", textAlign:"center"}}>
                            <TextField className={classes.textField} type="Number" onChange={event => setValor(event.target.value)} value={valor} id="standard-basic" label="Valor" required/>
                            <TextField className={classes.textField}  disabled id="standard-basic" label="Código" defaultValue="Automático"/>
                        
                        </div>

                        </div>
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
            <h1 style={{textAlign: "center", paddingTop:20}}>{getHeaderText()}</h1>
            <h5 style={{textAlign: "center", paddingTop:40}}>{getSubHeaderText()}</h5>
            {renderLayoutCadastro()}
        </div>
        
        <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            backdrop="static"
            keyboard={false}
            >
            <Modal.Header closeButton>
            <Modal.Title>{tipo === "Cadastrar" ? "Confirmar cadastro" : "Confirmar alterações"}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{display:"flex"}}>  
                {tipo === "Cadastrar" ? "Tem certeza que deseja continuar com o cadastro?" : "Tem certeza que deseja alterar esse produto?"}
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
                    history.push("/produtos")
                }, 1500);
            }}>Continuar</Button>
            </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
    )
}

export default FormProduto