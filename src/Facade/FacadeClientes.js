import { toast } from "react-toastify";
const axios = require("axios");

export default class FacadeClientes {

    patchClientes = async (body, messageSuccess, cancelar = false, history, toastStyle) => {
        axios
          .patch("http://localhost:8080/clientes", {
            ...body,
          })
          .then(function (response) {
            toast.success(messageSuccess,
              toastStyle,
            );
            if (cancelar) {
              history.go(0)
            }
            else {
              setTimeout(() => {
                history.push("/clientes");
              }, 2000);
            }
          })
          .catch(function (error) {
            toast.error(error.response?.data.message,
              toastStyle,
            );
            toast.error(error.response?.data.details,
              toastStyle,
            );
          });
    }


}