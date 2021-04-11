import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import "../components/styles/ChatbotStyle.css"
import FacadeProduto from "../Facade/FacadeProduto"
import React, {useState, useEffect } from 'react';

const facadeProduto = new FacadeProduto();


const Chatbot = () => {
    const [cpf, setCpf] = React.useState("");
    const [cont, setCont] = React.useState(0);
    const handleNewUserMessage = (newMessage) => {
        console.log("nova mensagem", newMessage)
        if(cont == 0){
            addResponseMessage("Seja bem-vindo! Por favor, informe seu cpf.");
        }else if(cont == 1){
            setCpf(newMessage)
            addResponseMessage("Agora, prossiga escolhendo os produtos do seu pedido.")
            addResponseMessage("Escolha digitando o numero correspondente ao produto desejado.")
            addResponseMessage("Se quiser sair dessa opção, digite 0.")
            
        }
        setCont(cont+1);
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