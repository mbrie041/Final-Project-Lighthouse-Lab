import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import PlatformerScene from "./phaser/platformer-scene";
import LevelThreeScene from "./phaser/levelthree-scene";
import LevelTwoScene from "./phaser/leveltwo-scene";
import LevelOneScene from "./phaser/levelone-scene";
import InformationScene from "./phaser/information-scene";
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
    LevelThreeScene,
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

const game = new Phaser.Game(config);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    if (!position.coords || !position.coords.longitude) {
      position.coords.latitude = 0;
      position.coords.longitude = 0;
    }
    global.latitude = parseFloat(position.coords.longitude.toFixed(1));
    global.longitude = parseFloat(position.coords.latitude.toFixed(1));
    //   game.scene.start("PlatformerScene", {
    //     location: {
    //       type: "Point",
    //       coordinates: [
    //         parseFloat(position.coords.longitude.toFixed(1)),
    //         parseFloat(position.coords.latitude.toFixed(1))
    //       ]
    //     }
    //   })
  });
} else {
  console.error("Geolocation is not supported by this browser!");
}

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);

