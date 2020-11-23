import React, { useState } from "react";
import Search from "./BarraPesquisaComponent";
import { DataGrid } from "@material-ui/data-grid";
import { FiArrowRight } from "react-icons/fi";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const columnsPizza = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nome", headerName: "Nome", width: 150 },
  { field: "valor", headerName: "Valor", type: "Number", width: 100 },
  {
    field: "valorPromocional",
    headerName: "Valor Promoção",
    type: "Number",
    width: 170,
  },
  {
    field: "descricao",
    headerName: "Descrição",
    sortable: false,
    width: 450,
  },
];
const columnsNormal = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nome", headerName: "Nome", width: 150 },
  { field: "valor", headerName: "Valor", type: "Number", width: 100 },
  {
    field: "valorPromocional",
    headerName: "Valor Promoção",
    type: "Number",
    width: 170,
  },
];

const rowsNormal = [
  {
    id: 10,
    nome: "Água 500ml",
    valor: 5.9,
    valorPromocional: 1.0,
  },
  {
    id: 11,
    nome: "Refrigerante Bald-Cola 2L",
    valor: 6.9,
    valorPromocional: 4.85,
  },
  {
    id: 12,
    nome: "Chopp Stinky",
    valor: 12.9,
    valorPromocional: null,
  },
];

const rowsPizza = [
  {
    id: 1,
    nome: "Frango G",
    valor: 32.9,
    valorPromocional: null,
    descricao: "Pizza de frango com catupiry, tamanho grande.",
  },
  {
    id: 2,
    nome: "Atum G",
    valor: 32.9,
    valorPromocional: null,
    descricao: "Pizza de atum e queijo, tamanho grande.",
  },
  {
    id: 3,
    nome: "Calabresa G",
    valor: 32.9,
    valorPromocional: null,
    descricao: "Pizza de calabresa com cebola, tamanho grande.",
  },
  {
    id: 4,
    nome: "Catupiresa P",
    valor: 22.9,
    valorPromocional: null,
    descricao: "Pizza de catupiry com calabresa, tamanho pequeno.",
  },
  {
    id: 5,
    nome: "Quatro queijos P",
    valor: 22.9,
    valorPromocional: null,
    descricao: "Pizza de quatro jeitos, tamanho pequena.",
  },
  {
    id: 6,
    nome: "Chocolate M",
    valor: 26.9,
    valorPromocional: 20.2,
    descricao: "Pizza doce de chocolate, média.",
  },
  {
    id: 7,
    nome: "Milhocon M",
    valor: 26.9,
    valorPromocional: 26.0,
    descricao: "Pizza de milho com bacon, tamanho média",
  },
  {
    id: 8,
    nome: "Moda do chefe GG",
    valor: 35.9,
    valorPromocional: null,
    descricao: "Pizza calabresa, bacon, frango, carne, tamanho extra grande.",
  },
  {
    id: 9,
    nome: "Moda da casa GG",
    valor: 35.9,
    valorPromocional: null,
    descricao:
      "Pizza de brocólis, ervilha, queijo, milho e cebola, tamanho extra grande.",
  },
];
const Cardapio = () => {
  const history = useHistory();
  const [next, setNext] = useState(false);

  const toastStyle = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleNext = () => {
    if (next) {
      history.push("/revisar-pedido");
    } else {
      toast.error("🍕 Por favor, selecione um item!", {
        toastStyle,
      });
    }
  };

  const handleSelect = (ids) => {
    if (ids.length > 0) {
      setNext(true);
    } else {
      setNext(false);
    }
  };
  return (
    <>
      <h1>Cardápio</h1>
      <p>Primeiro, selecione os itens desejados do cardápio...</p>
      <Search />
      <div className="dataPizza" style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rowsPizza}
          columns={columnsPizza}
          pageSize={5}
          checkboxSelection
          onSelectionChange={(newSelection) => {
            handleSelect(newSelection.rowIds);
          }}
        />
      </div>
      <div className="dataProdNormal" style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={rowsNormal}
          columns={columnsNormal}
          pageSize={3}
          checkboxSelection
          onSelectionChange={(newSelection) => {
            handleSelect(newSelection.rowIds);
          }}
        />
      </div>
      <Button
        className="botao"
        style={{
          marginRight: 7,
          borderWidth: 1,
          borderColor: "black",
        }}
        type="submit"
        variant="success"
        onClick={handleNext}
      >
        <FiArrowRight /> Próximo
      </Button>
      <ToastContainer />
    </>
  );
};

export default Cardapio;
