import React from 'react';
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default () => {
  return (
    <>
      <Popup trigger={<button> Trigger</button>} position="right center">
        <div>Pedido Realizado com sucesso !!!</div>
      </Popup>
    </>
  );
};
