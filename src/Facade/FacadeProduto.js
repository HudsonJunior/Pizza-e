const axios = require("axios");

export default class FacadeProduto {
    getProdutos = async (nomeProduto, setProdutos) => {
        try {
            if (nomeProduto != null) {
                const response = await axios.get(
                    `http://localhost:8080/produtos-finais?nome=${nomeProduto}`
                );
                const produtosResponse = await response.data;
                setProdutos(produtosResponse);
            } else {
                const response = await axios.get(
                    `http://localhost:8080/produtos-finais`
                );
                const produtosResponse = await response.data;
                setProdutos(produtosResponse);
            }
        } catch (error) {
            setProdutos([]);
        }
    };
}