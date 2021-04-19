import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import "../components/styles/ChatbotStyle.css"
import FacadeProduto from "../Facade/FacadeProduto"
import FacadePedido from "../Facade/FacadePedido"
import React, {useState, useEffect } from 'react';

const facadeProduto = new FacadeProduto();
const facadePedido = new FacadePedido();


const Chatbot = () => {
    const [cpf, setCpf] = React.useState("");
    const [cont, setCont] = React.useState(0);
    const [produtos, setProdutos] = React.useState([]);
    const [listaProdutos, setLista] = React.useState([]);
    const [pagamento, setPagamento] = React.useState("");
    const [valorTotal, setValor] = React.useState(0);
    var stringGigante = ""
    var index = 0

    useEffect(() => {
          facadeProduto.getProdutos(null, setProdutos, true);
        }, []);
    
    
    const salvarProduto = (index, quantidade) => {
        let obj = new Object();
        obj.nome = produtos[index-1].nome;
        obj._id = produtos[index-1]._id;
        obj.quantidade = quantidade;
        let valor = parseFloat(produtos[index-1].valor * quantidade);
        valor += valorTotal
        setValor(valor)
        listaProdutos.push(obj)
        setLista(listaProdutos)
    }

    const printProdutos = () => {
        for(var produto of produtos){
            stringGigante +=  (index+1) + " - " + produto.nome;
            stringGigante += "  \n";
            index = index + 1;
        }
        index = 0;
    }

    const concluirPedido = () => {
        var today = new Date();

        var date =
          today.getFullYear() +
          "-" +
          ("0" + (today.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + today.getDate()).slice(-2);
    
        var time =
          ("0" + today.getHours()).slice(-2) +
          ":" +
          ("0" + today.getMinutes()).slice(-2) +
          ":" +
          ("0" + today.getSeconds()).slice(-2);
    
        facadePedido.postPedido(listaProdutos, pagamento, "balcao", "", date, time, cpf, "", "", valorTotal, "nao") 
    }

    const definirPagamento = (index) =>   {
        if(index === '1'){
            setPagamento("dinheiro")
        }if(index === '2'){
            setPagamento("debito")
        }if(index === '3'){
            setPagamento("credito")
        }
    }
    

    const handleNewUserMessage = (newMessage) => {
        if(cont == 0){
            addResponseMessage("Seja bem-vindo! Por favor, informe seu cpf.");
            setCont(cont+1);
        }else if(cont == 1){
            setCpf(newMessage)
            addResponseMessage("Agora, prossiga escolhendo os produtos do seu pedido.")
            addResponseMessage("Se quiser sair dessa opção, digite 0. Ou 1 para continuar.")
            setCont(cont+1);
        }
        if(newMessage != "0" && cont == 2){
            printProdutos()
            setCont(cont+1)
            addResponseMessage(stringGigante);
            stringGigante = ""
            addResponseMessage("Escolha digitando o numero correspondente ao produto desejado. E seguido de um espaço, a quantidade desejada do mesmo.")
        }else if(newMessage == "0" && cont == 2){
            addResponseMessage("Ate mais!")
        }
        if(newMessage != '0' && cont == 3){
            var string = newMessage.split(" ")
            salvarProduto(string[0], string[1])
            printProdutos()
            addResponseMessage(stringGigante);
            stringGigante = ""
            addResponseMessage("Escolha digitando o numero correspondente ao produto desejado. E seguido de um espaço, a quantidade desejada do mesmo.")
        }else if(newMessage == '0' && cont == 3){
            setCont(cont+1)
            addResponseMessage("Prosseguindo com o pedido. Digite algo para continuar.")
        }
        if(cont == 4){ 
           //forma de expedicao
           addResponseMessage("No momento, nosso serviço via chat atende apenas a pedidos retirados no balcão. Portanto, caso queira pedir para entrega, acesse a opção Cardápio no menu.")
           addResponseMessage("Digite algo para prosseguir, e escolher a forma de pagamento.")
           setCont(cont+1)
        }
        if(cont == 5){
            addResponseMessage("Qual a forma de pagamento?  \n 1- Dinheiro  \n 2- Cartão de Débito  \n 3- Cartão de Crédito  \n")
            setCont(cont+1)
        }
        if(cont == 6){
            definirPagamento(newMessage)
            addResponseMessage("Concluindo pedido. Digite algo para confirmar")
            setCont(cont+1)
        }if (cont == 7){
            concluirPedido()
            setCont(0)
            setCpf("")
            setProdutos([])
            setLista([])
            setPagamento("")
            setValor(0)
        }
    };
return(
    <Widget
    title="Chat de Atendimento"
    subtitle="Faça seu pedido com mais facilidade :)"
    handleNewUserMessage={handleNewUserMessage}
    />
    );
}

export default Chatbot;