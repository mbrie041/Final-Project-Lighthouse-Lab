import React, { useEffect, useState } from "react";
import Popup from "./Popup.jsx";

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

            <button data-modal-target="#popup" className="nav-link">About Us</button>

          </div>
        </div>
      </div>
      <div>
        <button onClick={togglePopup}>show popup</button>
      </div>
      {showPopup ?
        <Popup
          text='Close Me'
          closePopup={togglePopup}
        />
        : null
      }
      {/* <form className="d-flex">
        <div className="input-group">
          <span className="input-group-text" id="basic-addon1">@</span>
          <input type="text" className="form-control" placeholder="Username" aria-label="Username"
            aria-describedby="basic-addon1">
			</div>
		</form> */}
    </nav>
  )
}
