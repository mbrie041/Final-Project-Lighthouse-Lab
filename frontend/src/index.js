import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import Nav from "./components/Nav/Nav.jsx";
import LevelFourScene from "./phaser/levelfour-scene";
import LevelThreeScene from "./phaser/levelthree-scene";
import LevelTwoScene from "./phaser/leveltwo-scene";
import LevelOneScene from "./phaser/levelone-scene";
import IntroScene from "./phaser/_intro-scene";
import StoryScene from "./phaser/story-scene";
import TransitionL1Scene from "./phaser/L1-transition-scene";
import TransitionL2Scene from "./phaser/L2-transition-scene";
import TransitionL3Scene from "./phaser/L3-transition-scene";
import TransitionL4Scene from "./phaser/L4-transition-scene";
import "./styles/index.scss";
import GameOverScene from "./phaser/gameover-scene";
import GameWinScene from "./phaser/gamewin-scene";

//game config that's passed through the game.
export const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 260,
  parent: "phaser",
  pixelArt: true,
  roundPixels: true,
  Audio: {
    noAudio: true,
  },
  backgroundColor: "#1d212d",
  dom: {
    createContainer: true,
  },
  scene: [
    //the first scene will be the one that loads unless otherwise called.
    IntroScene,
    StoryScene,
    TransitionL1Scene,
    LevelOneScene,
    TransitionL2Scene,
    LevelTwoScene,
    TransitionL3Scene,
    LevelThreeScene,
    TransitionL4Scene,
    LevelFourScene,
    GameOverScene,
    GameWinScene,
  ],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 1000 },
    },
  },
};
//disables the use of keys and the mouse when you've clicked off that game box.
//allows the chat box to work properly.
const game = new Phaser.Game(config);
$(document).ready(function () {
  game.input.keyboard.enabled = false;

  $("#phaser").mouseenter(function () {
    game.input.keyboard.enabled = true;
  });

  $("#phaser").mouseleave(function () {
    game.input.keyboard.enabled = false;
  });
});

ReactDOM.render(
  <Nav />,
  document.getElementById("nav") || document.createElement("div")
);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
