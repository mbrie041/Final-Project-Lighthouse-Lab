import Phaser from "phaser";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import Nav from "./components/Nav.jsx";
import PlatformerScene from "./phaser/platformer-scene";
import LevelFourScene from "./phaser/levelfour-scene";
import LevelThreeScene from "./phaser/levelthree-scene";
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
    GameOverScene,
    IntroScene,
    PlatformerScene,
    LevelOneScene,
    LevelTwoScene,
    LevelThreeScene,
    LevelFourScene
  ],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 1000 }
    }
  }
};

const game = new Phaser.Game(config);

$("#phaser").mouseenter(function () {
  game.input.keyboard.enabled = true;
});

$("#phaser").mouseleave(function () {
  game.input.keyboard.enabled = false;
});

ReactDOM.render(
  <Nav />,
  document.getElementById("nav") || document.createElement("div")
);

ReactDOM.render(

  <App />,
  document.getElementById("root") || document.createElement("div")

);

