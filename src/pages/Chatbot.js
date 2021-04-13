import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import "../components/styles/ChatbotStyle.css"
import FacadeProduto from "../Facade/FacadeProduto"
import React, {useState, useEffect } from 'react';

const facadeProduto = new FacadeProduto();


const Chatbot = () => {
    const [cpf, setCpf] = React.useState("");
    const [cont, setCont] = React.useState(0);
    const [produtos, setProdutos] = React.useState([]);
    var valorTotal = 0
    var  listaProdutos = []
    var stringGigante = ""
    var index = 0

    useEffect(() => {
          facadeProduto.getProdutos(null, setProdutos, true);
        }, []);
    
    
    const salvarProduto = (index, quantidade) => {
        let obj = new Object();
        obj.nome = produtos[index].nome;
        obj._id = produtos[index]._id;
        obj.quantidade = quantidade;
        valorTotal += produtos[index].valor;
        listaProdutos += obj;
    }

    const printProdutos = () => {
        for(var produto of produtos){
            stringGigante +=  (index+1) + " - " + produto.nome;
            stringGigante += "  \n";
            index = index + 1;
        }
        index = 0;
    }
    

    const handleNewUserMessage = (newMessage) => {
        console.log("nova mensagem", newMessage)
        if(cont == 0){
            addResponseMessage("Seja bem-vindo! Por favor, informe seu cpf.");
            setCont(cont+1);
        }else if(cont == 1){
            setCpf(newMessage)
            addResponseMessage("Agora, prossiga escolhendo os produtos do seu pedido.")
            addResponseMessage("Se quiser sair dessa opção, digite 0. Ou 1 para continuar.")
            setCont(cont+1);
            console.log(produtos);
        }
        if(newMessage != "0" && cont == 2){
            printProdutos()
            setCont(cont+1)
            console.log(stringGigante)
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
            console.log(stringGigante)
            addResponseMessage(stringGigante);
            stringGigante = ""
            addResponseMessage("Escolha digitando o numero correspondente ao produto desejado. E seguido de um espaço, a quantidade desejada do mesmo.")
        }else if(newMessage == '0' && cont == 3){
            setCont(cont+1)
            addResponseMessage("Prosseguindo com o pedido. Digite algo para continuar.")
        }

        if(cont == 4){

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