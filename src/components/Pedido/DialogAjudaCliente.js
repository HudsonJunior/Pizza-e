import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialogAjuda(props) {
  const [showDialog, setShowDialog] = React.useState(false);

  const showDialogAjuda = () => {
    setShowDialog(true);
  };

  return (
    <div>
      <Button
        style={{ margin: 15 }}
        variant="contained"
        color="primary"
        onClick={showDialogAjuda}
      >
        Preciso de ajuda
      </Button>

      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Ajuda online de contexto para registro de pedido
        </DialogTitle>
        <DialogContent>
          {props.etapa === 1 ? (
            <div>
              <DialogContentText>
                As etapas para fazer um pedido são: selecionar os itens, revisar
                o pedido e preencher alguns dados essenciais para registrar seu
                pedido!
              </DialogContentText>
              <DialogContentText>
                Nesta tela, você deve escolher o que deseja incluir do cardápio
                no pedido. Perceba que seu pedido se encontra listada à direita,
                assim como o valor total do pedido.
              </DialogContentText>
              <DialogContentText>
                Quando finalizar, aperte o botão próximo para seguir para a
                página de revisão.
              </DialogContentText>
            </div>
          ) : (
            <div></div>
          )}
          {props.etapa === 2 ? (
            <div>
              <DialogContentText>
                Revise seu pedido, nesta tela você pode alterar as quantidades
                ou remover os itens.
              </DialogContentText>
              <DialogContentText>
                Quando finalizar, aperte o botão próximo para seguir para a
                página de login. Esta etapa ocorre para podermos identificar o
                pedido na hora da entrega ou na retirada do pedido.
              </DialogContentText>
            </div>
          ) : (
            <div></div>
          )}
          {props.etapa === 3 ? (
            <div>
              <DialogContentText>
                Você pode voltar para a revisão do pedido clicando no botão
                "Voltar".
              </DialogContentText>
              <DialogContentText>
                Para concluir o pedido, verifique o valor total do pedido e
                preencha os campos a seguir.
              </DialogContentText>
              <DialogContentText>
                Forma de expedição, forma de pagamento e caso queira CPF na nota
                fiscal, selecione a opção "Com CPF" e preencha o campo do CPF.
                Caso contrário, escolha a opção "Sem CPF".
              </DialogContentText>
              <DialogContentText>
                Note que se desejar a entrega do pedido, você deve preencher um
                campo do endereço de entrega.
              </DialogContentText>
              <DialogContentText>
                Para finalizar o pedido, clique no botão "Realizar Pedido".
              </DialogContentText>
            </div>
          ) : (
            <div></div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            className="botao"
            onClick={() => setShowDialog(false)}
            variant="contained"
            color="primary"
          >
            Ok, entendi!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
