import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import PlatformerScene from "./phaser/platformer-scene";
import LevelTwoScene from "./phaser/leveltwo-scene";
import LevelOneScene from "./phaser/levelone-scene";
import InformationScene from "./phaser/information-scene";
import "./styles/index.scss"

let canvas = document.querySelector('canvas')

export const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 500,
  parent: "phaser",
  pixelArt: true,
  backgroundColor: "#1d212d",
  dom: {
    createContainer: true
  },
  scene: [
    InformationScene,
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

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(position => {
//     if (!position.coords || !position.coords.longitude) {
//       position.coords.latitude = 0;
//       position.coords.longitude = 0;
//     }
//     game.scene.start("PlatformerScene", {
//       location: {
//         type: "Point",
//         coordinates: [
//           parseFloat(position.coords.longitude.toFixed(1)),
//           parseFloat(position.coords.latitude.toFixed(1))
//         ]
//       }
//     })
//   });
// } else {
//   console.error("Geolocation is not supported by this browser!");
// }



ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
