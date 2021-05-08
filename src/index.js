import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import PlatformerScene from "./phaser/platformer-scene";

//console.log(App);

export const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  pixelArt: false,
  backgroundColor: "#1d212d",
  scene: PlatformerScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 }
    }
  }
};

const game = new Phaser.Game(config);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
