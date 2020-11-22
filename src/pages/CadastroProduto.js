import React, { useRef, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import Menubar from "../components/MenubarComponent";
import "./../components/styles/CadastroProduto.css"
import {useHistory} from  "react-router-dom"
import { confirmAlert } from 'react-confirm-alert'; // Import

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ReactTooltip from 'react-tooltip';

import {Formik} from 'formik'
import * as yup from 'yup'
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(2),
        width: '35ch',
      },
    },
    promo: {
        '& > *': {
            margin: theme.spacing(2),
            width: '35ch',
          },
    }
    
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

    const {tipo} = props.location.state
    const isPizza = tipo === "Pizza"
    const user = localStorage.getItem("user");
    const convertedUser = JSON.parse(user);
    const [voltar,setVoltar] = useState(false)
    const [confirmar,setConfirmar] = useState(false)
    const [nome, setNome] = useState("")
    const [codigo, setCodigo] = useState("")
    const [valor, setvalor] = useState("")
    const [peso, setPeso] = useState("")
    const [valorPromo, setValorPromo] = useState("")
    const [data1Promo, setData1Promo] = useState("2020-11-24T09:30")
    const [data2Promo, setData2Promo] = useState("2020-11-24T09:30")
    
    const [ingredientes,setIngredientes] = useState("")
    const [quantidade,setQuantidade] = useState("")
    const [adicionais,setAdicionais] = useState("")

    const [addPromo, setAddPromo] = useState(false)
    const [status,setStatus] = useState("")

    const [showModal,setShowModal] = useState(false)
    
    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const nomeValidate = useRef(null)
    const valorValidate = useRef(null)
    const pesoValidate = useRef(null)
    const quantidadeValidate = useRef(null)
    const ingredientesValidate = useRef(null)


    const classes = useStyles();

    const getButtonsPromo = () => {
        return ( addPromo ?
            <form className={classes.promo} noValidate autoComplete="off"> 
            <TextField id="standard-basic" value={valorPromo} onChange={event => setValorPromo(event.target.value)} label="Valor promocional" />
            <TextField id="datetime-local" value={data1Promo} onChange={event => setData1Promo(event.target.value)} type="datetime-local" label="Data início promoção" className={classes.textField} InputLabelProps={{shrink: true}}/>
            <TextField id="datetime-local" value={data2Promo} onChange={event => setData2Promo(event.target.value)} type="datetime-local" label="Data final promoção" className={classes.textField} InputLabelProps={{shrink: true}}/>

            </form>
            :
                <div></div>
        )
    }
      
    
    if(voltar)
        history.push("/func/produtos")

    if(confirmar){
        confirmAlert({
            title: "Revisar cadastro",
            message: isPizza? `Tipo: Pizza\tNome: ${nome}\nCódigo: ${codigo}\nValor: ${valor}\nIngredientes: ${ingredientes}\n` : "", 
            buttons: [
              {
                label: "Voltar",
                onClick: () => history.push("/func/cadastro-produto", {tipo: "Pizza"})
              },
              {
                label: "Confirmar",
                onClick: () => history.push("/func/cadastro-produto", {tipo: "Normal"})
              }
            ]
          })
    }

    const resetForm = e => {
        console.log(e)
        e.preventDefault();
        e.target.reset();
    }

    const cleanTextFields = () => {
        setNome("")
        setCodigo("")
        setvalor("")
        setPeso("")
        setAdicionais("")
        setIngredientes("")
        setData1Promo("")
        setData2Promo("")
        setValorPromo("")
        setStatus("")
    }

    const contactSchema = yup.object().shape({
        campoObrigatorio: yup.string()
            .required('Campo obrigatório'),
      });

    const renderLayoutCadastro = () => {
        return( !isPizza ?  

            <Formik 
                initialValues={{
                    nomeValidate: '',
                    valorValidate:'',
                    pesoValidate:'',
                }}
                onSubmit={values => {
                    console.log(values)
                }}
                validationSchema={contactSchema}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                    setFieldTouched
                }) => (
                    <div className="contentProdutos">
                        <form className={classes.root} noValidate autoComplete="off"> 
                            <div className="teste" style={{display:"flex",flexDirection:"column", width:"100%", alignItems:"center"}}>
                                <TextField style={{width:"50%"}} ref={nomeValidate} id="standard-basic" label="Nome *" value={values.nomeValidate} onBlur={() => setFieldTouched('nomeValidate', true)} onChange={handleChange('nomeValidate')}/>
                                {errors.campoObrigatorio && touched.nomeValidate && <text style={{color:"red", fontSize:"12px"}}>{errors.campoObrigatorio}</text>}
                            </div>

                            <div style={{width:"100%", justifyContent:"center", display:"flex"}}>
                                <div className="teste" style={{display:"flex",width:"50%", justifyContent:"center"}}>
                                    <div style={{flexDirection:"column", display:"flex", alignItems:"center", width:"50%"}}>
                                        <TextField style={{width:"100%"}} ref={valorValidate} id="standard-basic" label="Valor *" value={values.valorValidate} onBlur={() => setFieldTouched('valorValidate', true)} onChange={handleChange('valorValidate')}/>
                                        {errors.campoObrigatorio && touched.valorValidate && <text style={{color:"red", fontSize:"12px"}}>{errors.campoObrigatorio}</text>}
                                    </div>
                                    <TextField style={{marginLeft:15, width:"50%"}} disabled id="standard-basic" label="Código *" defaultValue="Automático" />
                                </div>
                            </div>

                            <div style={{width:"100%", justifyContent:"center", display:"flex"}}>
                                <div className="teste" style={{display:"flex", width:"50%", justifyContent:"center"}}>
                                    <div style={{flexDirection:"column", display:"flex", alignItems:"center", width:"50%"}}>
                                        <TextField style={{width:"100%"}} ref={pesoValidate} id="standard-basic" label="Peso *" value={values.pesoValidate} onBlur={() => setFieldTouched('pesoValidate', true)} onChange={handleChange('pesoValidate')}/>
                                        {errors.campoObrigatorio && touched.pesoValidate && <text style={{color:"red", fontSize:"12px"}}>{errors.campoObrigatorio}</text>}  
                                    </div>
                                        <TextField style={{marginLeft:15, width:"50%"}} select id="standard-select-currency" value={values.status} onChange={handleChange} label="Status *">
                                            <MenuItem value={1}>Ativado</MenuItem>
                                            <MenuItem value={2}>Desativado</MenuItem>
                                        </TextField>
                                </div> 
                            </div>

                            <Button variant="light" onClick={handleSubmit} data-tip="Lançar uma promoção do produto">Adicionar promoção</Button>
                            <ReactTooltip />

                        </form>
                        {getButtonsPromo()}
                        <text>* obrigatório</text>
                    </div>
                )}
                
            </Formik>

            :
            
            <Formik 
                initialValues={{
                    nomeValidate: '',
                    valorValidate:'',
                    ingredientesValidate:'',
                    adicionaisValidate:'',
                }}
                onSubmit={values => {
                    console.log(values)
                }}
                validationSchema={contactSchema}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                    setFieldTouched
                }) => (
                    <div className="contentProdutos">
                        <form onSubmit={resetForm} className={classes.root} noValidate autoComplete="off"> 
                            
                            <div className="teste" style={{display:"flex",flexDirection:"column", width:"100%", alignItems:"center"}}>
                                <TextField style={{width:"50%"}} ref={nomeValidate} id="standard-basic" label="Nome *" value={values.nomeValidate}  onBlur={() => setFieldTouched('nomeValidate', true)} onChange={handleChange('nomeValidate')} />
                                {errors.campoObrigatorio && touched.nomeValidate && <text style={{color:"red", fontSize:"12px"}}>{errors.campoObrigatorio}</text>}

                            </div>

                            <div style={{width:"100%", justifyContent:"center", display:"flex"}}>
                                <div className="teste" style={{display:"flex",width:"50%", justifyContent:"center"}}>
                                    <div style={{flexDirection:"column", display:"flex", alignItems:"center", width:"50%"}}>
                                        <TextField style={{width:"100%"}} ref={valorValidate} id="standard-basic" label="Valor *" value={values.valorValidate} onChange={handleChange('valorValidate')}  onBlur={() => setFieldTouched('valorValidate', true)} />
                                        {errors.campoObrigatorio && touched.valorValidate && <text style={{color:"red", fontSize:"12px"}}>{errors.campoObrigatorio}</text>}
                                    </div>
                                        <TextField style={{marginLeft:15, width:"50%"}} disabled id="standard-basic" label="Código" value={codigo} defaultValue="Automático"/>
                                </div>
                            </div>

                            <div style={{width:"100%", justifyContent:"center", display:"flex"}}>
                                <div className="teste" style={{display:"flex",width:"50%", justifyContent:"center"}}>
                                    <div style={{flexDirection:"column", display:"flex", alignItems:"center", width:"50%"}}>
                                        <TextField style={{width:"100%"}} ref={ingredientesValidate} id="standard-basic" label="Ingredientes *" value={values.ingredientesValidate} multiline onChange={handleChange('ingredientesValidate')} onBlur={() => setFieldTouched('ingredientesValidate', true)}/>
                                        {errors.campoObrigatorio && touched.ingredientesValidate && <text style={{color:"red", fontSize:"12px"}}>{errors.campoObrigatorio}</text>}
                                    </div>
                                    <div style={{flexDirection:"column", display:"flex", alignItems:"center", width:"50%"}}>
                                        <TextField style={{marginLeft:15, width:"100%"}} ref={quantidadeValidate} id="standard-basic" label="Quantidade *" value={values.quantidadeValidate} onChange={handleChange('quantidadeValidate')} onBlur={() => setFieldTouched('quantidadeValidate', true)}/>
                                        {errors.campoObrigatorio && touched.quantidadeValidate && <text style={{color:"red", fontSize:"12px"}}>{errors.campoObrigatorio}</text>}
                                    </div>
                                </div>
                            </div>

                            <div className="teste" style={{display:"flex",flexDirection:"column", width:"100%", alignItems:"center"}}>
                                <TextField style={{width:'50%'}}id="standard-basic" label="Adicionais" value={adicionais} multiline onChange={event => setAdicionais(event.target.value)}/>
                            </div>

                            <div style={{width:"100%", justifyContent:"center", display:"flex"}}>
                                <div className="teste" style={{display:"flex",width:"50%", justifyContent:"center"}}>
                                    <div style={{flexDirection:"column", display:"flex", alignItems:"center", width:"50%"}}>
                                    <TextField style={{width:"100%"}} select id="standard-select-currency" value={status} onChange={handleChange} label="Status *">
                                        <MenuItem value={1}>Ativado</MenuItem>
                                        <MenuItem value={2}>Desativado</MenuItem>
                                    </TextField>
                                    </div>
                                    <Button style={{marginLeft:15, width:"50%"}} variant="light" onClick={value => setAddPromo(!addPromo)} data-tip="Lançar uma promoção do produto">Adicionar promoção</Button>
                                    <ReactTooltip />
                                </div>
                            </div>
                            
                        
                        </form>
                        {getButtonsPromo()}
                        <text >* obrigatório</text>
                        <div className="disButtonsCadastro">
                            <Button className="buttonVoltar" variant="light" onClick={value => setVoltar(true)}>Voltar</Button>
                            <Button  className="buttonConfirmar" variant="light" onClick={handleSubmit}>Confirmar</Button>
                        </div>
                    </div>

                
                )}
            </Formik>
            
            
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
                cleanTextFields()
            }}>Continuar</Button>
            </Modal.Footer>
      </Modal>

      <ToastContainer />

        </>
    )
}

export default CadastroProduto