import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialogAjuda() {
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
          Ajuda online de contexto
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            A qualquer momento da realização do pedido, você pode voltar à
            consulta de pedidos clicando no botão "Voltar".
          </DialogContentText>
          <DialogContentText>
            Siga esses passos para registrar um pedido:
          </DialogContentText>
          <DialogContentText>
            1- Adicione os produtos do pedido, você pode buscar um produto
            digitando seu nome, e então clicar no botão "+".
          </DialogContentText>
          <DialogContentText>
            2- Ajuste a quantidade de cada produto utilizando os botões "+" e
            "-".
          </DialogContentText>
          <DialogContentText>
            3- Observe que o valor total do pedido é atualizado quando um
            produto é adicionado ou removido do pedido.
          </DialogContentText>
          <DialogContentText>
            4- Preencha os campos a seguir conforme o cliente responde a forma
            de pagamento, observacoes, expedição.
          </DialogContentText>
          <DialogContentText>
            5- Se o cliente decidir a entrega do pedido, ele deve ser um cliente
            cadastrado então valide o CPF dele para buscar seu cadastro ou faça
            um novo cadastro. E ainda, verifique o endereço de entrega.
          </DialogContentText>
          <DialogContentText>
            6- Se o cliente desejar o CPF na nota fiscal, selecione a opção "com
            CPF" e preencha o CPF. Caso contrário, selecione a opção "Sem CPF".
          </DialogContentText>
          <DialogContentText>
            7- Se o cliente já realizar o pagamento do pedido, selecione a opção
            "Sim", caso contrário, selecione a opção "Não".
          </DialogContentText>
          <DialogContentText>
            Finalize o pedido clicando no botão "Realizar Pedido".
          </DialogContentText>
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
