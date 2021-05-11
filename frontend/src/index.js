import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import PlatformerScene from "./phaser/platformer-scene";
import LevelTwoScene from "./phaser/leveltwo-scene"
import LevelOneScene from "./phaser/levelone-scene"
import InformationScene from "./phaser/information-scene";
//console.log(App);

export const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 1000,
  parent: "game-container",
  pixelArt: true,
  backgroundColor: "#1d212d",
  dom: {
    createContainer: true
  },
  scene: [
    // PlatformerScene,
    InformationScene,
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

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    if (!position.coords || !position.coords.longitude) {
      position.coords.latitude = 0;
      position.coords.longitude = 0;
    }
    const game = new Phaser.Game(config);
  });
} else {
  console.error("Geolocation is not supported by this browser!");
}


ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
