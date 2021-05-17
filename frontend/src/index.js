import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import PlatformerScene from "./phaser/platformer-scene";
import LevelTwoScene from "./phaser/leveltwo-scene";
import LevelOneScene from "./phaser/levelone-scene";
import IntroScene from "./phaser/_intro-scene";
import "./styles/index.scss"
import GameOverScene from "./phaser/gameover-scene";

export const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 260,
  parent: "phaser",
  pixelArt: true,
  roundPixels: true,
  backgroundColor: "#1d212d",
  dom: {
    createContainer: true
  },
  scene: [
    IntroScene,
    PlatformerScene,
    LevelOneScene,
    LevelTwoScene,
    GameOverScene
  ],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 1000 }
    }
  }
};

export const game = new Phaser.Game(config);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);

