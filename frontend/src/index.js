import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import PlatformerScene from "./phaser/platformer-scene";
import LevelTwoScene from "./phaser/leveltwo-scene"
import LevelOneScene from "./phaser/levelone-scene"
import "./styles/index.scss"
//console.log(App);

let canvas = document.querySelector('canvas')

export const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  parent: "phaser",
  pixelArt: true,
  backgroundColor: "#1d212d",
  scene: [
    PlatformerScene,
    LevelOneScene,
    LevelTwoScene
  ],
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 1000 }
    }
  }
};

const game = new Phaser.Game(config);
console.log(config)

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
