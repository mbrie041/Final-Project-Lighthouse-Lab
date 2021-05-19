import React, { useEffect, useState } from "react";
import Popup from "../Popup/Popup.jsx";
import "../App.scss";
import "./navbar.scss";

export default function Nav() {

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  }

  return (
    <nav className="navbar fixed-top navbar-expand-sm">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Lighthouse Laboratory
				</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <button onClick={togglePopup}>About us</button>
          </div>
        </div>
      </div>
      <div>
      </div>
      {showPopup ?
        <Popup
          text='Close Me'
          closePopup={togglePopup}
        />
        : null
      }
    </nav>
  )
}
