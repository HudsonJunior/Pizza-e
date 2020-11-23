import React from "react";
import Menubar from "../components/MenubarComponent";
import CardapioComponent from "../components/CardapioComponent";

const Cardapio = () => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);
  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="contentCardapio">
        <CardapioComponent />
      </div>
    </>
  );
};

export default Cardapio;
