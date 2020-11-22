import React from "react";
import Menubar from "../components/MenubarComponent";
import "../components/styles/HomeStyle.css";

const Home = (props) => {
  const user = localStorage.getItem("user");
  const convertedUser = JSON.parse(user);

  return (
    <>
      <Menubar currentUser={convertedUser} />
      <div className="containerHome">
        <h2>Bem vindo, {convertedUser ? convertedUser.name : "Visitante"}</h2>
        <div classname="textGroup">
          <h3>Nossa história</h3>
          <p className="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel
            ligula eget massa porttitor lacinia sed non diam. Integer arcu
            velit, viverra vel porttitor ut, vestibulum eget tortor. Aliquam
            dictum placerat arcu, id eleifend velit feugiat at. Ut volutpat
            maximus tempus. Phasellus tempor ultrices ultrices. Maecenas id enim
            at magna vulputate rhoncus. Maecenas enim purus, aliquet eu purus
            ac, efficitur tempus massa.
          </p>
          <h3>Quem somos</h3>
          <p className="text">
            Morbi convallis luctus ex vel eleifend. Ut eu ipsum varius, blandit
            lacus ac, accumsan nulla. Vivamus vehicula, nisl fringilla dictum
            ultrices, ante orci mollis mauris, a facilisis metus ex in ante.
            Cras eget ex at augue gravida commodo. Fusce interdum odio a quam
            bibendum fermentum.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
