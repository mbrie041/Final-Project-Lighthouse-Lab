import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import PlatformerScene from "./phaser/platformer-scene";
import LevelTwoScene from "./phaser/leveltwo-scene"
import LevelOneScene from "./phaser/levelone-scene"
//console.log(App);

export const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 260,
  parent: "game-container",
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

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
