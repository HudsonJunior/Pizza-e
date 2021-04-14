import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import Menubar from "../components/MenubarComponent";
import "./../components/styles/CadastroProduto.css"
import { useHistory } from "react-router-dom"
import { FiCheckCircle, FiChevronLeft } from "react-icons/fi";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ReactTooltip from 'react-tooltip';

import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import { DialogContent, DialogContentText, MenuItem } from '@material-ui/core';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FacadeProduto from '../Facade/FacadeProduto';
import { Dialog } from "@material-ui/core";

import DialogActions from "@material-ui/core/DialogActions";

import DialogTitle from "@material-ui/core/DialogTitle";
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
    const { tipo } = props
    const { item } = props

    let tipoProduto = null
    let isPizza = null

    if (item) {
        tipoProduto = item.tipo
        isPizza = tipoProduto === "Pizza"
    }

    else {
        tipoProduto = props.tipoProduto
        isPizza = tipoProduto === "Pizza"
    }

    const facadeProduto = new FacadeProduto()
    const [showDialog, setShowDialog] = useState(false);
    const user = localStorage.getItem("user");
    const convertedUser = JSON.parse(user);
    const [voltar, setVoltar] = useState(false)
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
        if (item && tipo === 'Editar') {
            setNome(item.nome)
            setValor(parseFloat(item.valor))
            setValorPromo(parseFloat(item.valor_promocional))
            setData1Promo(item.inicio_promo)
            setData2Promo(item.fim_promo)
            setAddPromo(true)
            setStatus(item.ativado)

            if (isPizza) {
                setIngredientes(item.ingredientes)
                setAdicionais(item.adicionais)
            }
            else if (!isPizza) {
                setPeso(item.peso)
            }
        }

    }, [])
    const [addPromo, setAddPromo] = useState(false)

    const [showModal, setShowModal] = useState(false)

    const classes = useStyles();

    const getButtonsPromo = () => {
        return (addPromo ?
            <div className="contentProdutos">
                <div style={{ flexDirection: "row", textAlign: "center" }}>
                    <TextField id="datetime-local" value={data1Promo} onChange={event => setData1Promo(event.target.value)} type="datetime-local" label="Data início promoção" className={classes.textField} InputLabelProps={{ shrink: true }} />
                    <TextField id="datetime-local" value={data2Promo} onChange={event => setData2Promo(event.target.value)} type="datetime-local" label="Data final promoção" className={classes.textField} InputLabelProps={{ shrink: true }} />

                </div>
                <TextField style={{ width: "42%" }} id="standard-basic" value={valorPromo} onChange={event => setValorPromo(event.target.value)} type="number" label="Valor promocional" className={classes.textField} />

            </div>
            :
            <div></div>
        )
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (tipo == 'Cadastrar') {
            let body = {}

            if (isPizza) {

                body = {
                    nome,
                    valor,
                    ingredientes,
                    ativado: true,
                    adicionais,
                    tipo: 'Pizza',
                    inicio_promo: data1Promo,
                    fim_promo: data2Promo,
                    valor_promocional: valorPromo ?? '',
                }
            }

            else {

                body = {
                    nome: nome,
                    valor: valor,
                    ativado: true,
                    peso: peso,
                    inicio_promo: data1Promo,
                    fim_promo: data2Promo,
                    valor_promocional: valorPromo ?? '',
                    tipo: 'Normal'
                }
            }

            facadeProduto.postProdutos(body, history)

        }
        else {
            let body = {}

            if (isPizza) {
                body = {
                    nome,
                    valor,
                    ingredientes,
                    ativado: true,
                    adicionais,
                    tipo: 'Pizza',
                    inicio_promo: data1Promo,
                    fim_promo: data2Promo,
                    valor_promocional: valorPromo ?? '',
                }


            }
            else {
                body = {
                    nome: nome,
                    valor: valor,
                    ativado: true,
                    peso: peso,
                    inicio_promo: data1Promo,
                    fim_promo: data2Promo,
                    valor_promocional: valorPromo ?? '',
                    tipo: 'Normal'
                }

            }

            facadeProduto.patchProdutos(body, '🍕 Produto editado com sucesso!', 'Ocorrou um erro ao editar o produto, tente novamente!', false, history)
        }

    }

    if (voltar)
        history.push("/produtos")


    const getFields = () => {
        return (!isPizza ?
            <div className="contentProdutos" style={{ margin: 20 }}>
                <TextField className={classes.textField} onChange={event => setPeso(event.target.value)} value={peso} id="standard-basic" label="Peso" required />
                <TextField className={classes.textField} onChange={event => setStatus(event.target.value)} value={status} select id="standard-select-currency" label="Status" required>
                    <MenuItem value={"true"}>Ativado</MenuItem>
                    <MenuItem value={"false"}>Desativado</MenuItem>
                </TextField>
            </div>

            :
            <>
                <div className="contentProdutos">
                    <TextField className={classes.textField} onChange={event => setIngredientes(event.target.value)} value={ingredientes} id="standard-basic" label="Ingredientes" multiline required />
                    <TextField className={classes.textField} onChange={event => setAdicionais(event.target.value)} value={adicionais} id="standard-basic" label="Adicionais" multiline />

                </div>
                <TextField className={classes.textField} onChange={event => setStatus(event.target.value)} value={status} select id="standard-select-currency" label="Status" required>
                    <MenuItem value={"true"}>Ativado</MenuItem>
                    <MenuItem value={"false"}>Desativado</MenuItem>
                </TextField>
            </>
        )
    }

    const getHeaderText = () => {
        console.log("isPizza", isPizza, 'tipo', tipo)
        if (isPizza) {
            if (tipo === 'Cadastrar')
                return "Cadastrar nova pizza"
            else
                return "Editar pizza"
        }
        else {
            if (tipo === 'Cadastrar')
                return "Cadastrar novo produto"
            else
                return "Editar produto"
        }
    }

    const getSubHeaderText = () => {
        if (isPizza) {
            if (tipo === 'Cadastrar')
                return "Informe os dados necessários para o cadastro da pizza"
            else
                return "Informe os dados para a alteração da pizza"
        }
        else {
            if (tipo === 'Cadastrar')
                return "Informe os dados necessários para o cadastro do produto"
            else
                return "Informe os dados para a alteração do produto"
        }
    }

    const cadastrarProduto = () => {

        setShowModal(false)
        toast.success("🍕 Produto cadastrado com sucesso!", {
            toastStyle,
        })
        setTimeout(() => {
            history.push("/produtos")
        }, 1500);

    }

    const getInfoProdutos = () => {
        return isPizza ? "Uma pizza, contém as seguintes informações: Nome (Calabresa P), valor (50,00), ingredientes, (500 gramas de mussarela, 1 pacote de molho de tomate...), adicionais e status (ativado ou desativado)"
            : "Um produto contém as seguintes informações: Nome (Refrigerante 2l), valor(10,00), peso(2kg), status (ativado ou desativado)"
    }

    const showDialogAjuda = () => {
        setShowDialog(true)
    }
    const renderLayoutCadastro = () => {
        return (
            <form className={classes.root} onSubmit={handleSubmit}>
                <div className="contentProdutos">
                    <Button variant="primary" style={{ alignItems: 'center', textAlign: "center" }} onClick={showDialogAjuda}>Preciso de ajuda</Button>

                    <div style={{ flexDirection: "row", textAlign: "center" }}>
                        {tipo === 'Editar' ?
                            <TextField style={{ width: "42%" }} className={classes.textField} value={nome} id="standard-basic" label="Nome" name="fieldNome" disabled />
                            :
                            <TextField style={{ width: "42%" }} className={classes.textField} onChange={event => setNome(event.target.value)} value={nome} id="standard-basic" label="Nome" required />

                        }
                        <div style={{ flexDirection: "row", textAlign: "center" }}>
                            <TextField className={classes.textField} type="Number" onChange={event => setValor(event.target.value)} value={valor} id="standard-basic" label="Valor" required />
                            <TextField className={classes.textField} disabled id="standard-basic" label="Código" defaultValue="Automático" />

                        </div>

                    </div>
                    {getFields()}

                    <Button style={{ margin: 20 }} variant="light" onClick={value => setAddPromo(!addPromo)} data-tip="Lançar uma promoção do produto">Adicionar promoção</Button>
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
                            style={{ borderWidth: 1, borderColor: "black" }}
                            type="submit"
                            variant="success"
                        >
                            <FiCheckCircle /> Confirmar
                        </Button>
                    </div>
                </div>
                <Dialog
                    open={showDialog}
                    onClose={() => setShowDialog(false)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Ajuda online de contexto
                  </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Você está no cadastro de {isPizza ? 'pizza' : 'produto'}
                        </DialogContentText>
                        <DialogContentText>
                            {getInfoProdutos()}
                        </DialogContentText>
                        <DialogContentText>
                            Para cadastrar um produto basta preencher as informações obrigatórias (com um * na frente)
                        </DialogContentText>
                        <DialogContentText>
                            Para adicionar uma promoção, basta clicar no botão "Adicionar promoção", os campos necessários
                            da promoção seram apresentados para o preenchimento
                        </DialogContentText>
                        <DialogContentText>
                            Data inicial é a data que a promoção irá começar a ser válida
                        </DialogContentText>
                        <DialogContentText>
                            Data final é a data que a promoção irá deixar de ser válida
                        </DialogContentText>
                        <DialogContentText>
                            Valor promocional é o valor que será descontado do valor total para esse produto
                        </DialogContentText>
                        <DialogContentText>
                            Para voltar para a página anterior, clique no botão "Voltar", para confirmar o cadastro clique no botão "Confirmar"
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className="botao"
                            onClick={() => setShowDialog(false)}
                            color="primary"
                        >
                            Ok
                        </Button>

                    </DialogActions>
                </Dialog>
            </form>
        )
    }

    return (
        <>
            <Menubar currentUser={convertedUser} />
            <div className="containerCadastroProduto">
                <h1 style={{ textAlign: "center", paddingTop: 20 }}>{getHeaderText()}</h1>
                <h5 style={{ textAlign: "center", paddingTop: 40 }}>{getSubHeaderText()}</h5>

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
                <Modal.Body style={{ display: "flex" }}>
                    {tipo === "Cadastrar" ? "Tem certeza que deseja continuar com o cadastro?" : "Tem certeza que deseja alterar esse produto?"}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Voltar
            </Button>
                    <Button variant="primary" onClick={cadastrarProduto}>Continuar</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    )
}

export default FormProduto