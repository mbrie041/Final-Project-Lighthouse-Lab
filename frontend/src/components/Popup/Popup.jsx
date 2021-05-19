import React from "react";
import "./Popup.scss";

export default function Popup(props) {

  return (
    <div className='popup-div'>
      <div className='popup_inner'>

        <section>
          <div className="about__header">
            <p>Thanks for playing!</p>
            <button onClick={props.closePopup}>close me</button>
          </div>
          <div className="about__body">
            <div className="about__body-header col-sm-12">Our Team</div>
            <div className="about__body-body">
              <div className="info col-sm-4">
                <p className="sub-heading">Jacqueline Lee</p>
                <img src="./src/assets/images/jacqueline.png" />
                <a href="https://github.com/jacquelinel33">Github: jacquelinel33 </a>
                <a href="https://www.linkedin.com/in/jacquelinelee3/">Linkedin: jacquelinelee3 </a>
                <a href="mailto:jlee4332@gmail.com">Email: jlee4332@gmail.com</a>
                <p>I like to code and stuff and pls gib me job</p>
              </div>
              <div className="info col-sm-4">
                <p className="sub-heading">Mike Brierly</p>
                <img src="./src/assets/images/mike.png" />
                <a href="https://github.com/mbrie041">Github: mbrie041</a>
                <a href="https://www.linkedin.com/in/michael-brierley-b9a5b1126/">Linkedin: michael-brierley-b9a5b1126 </a>
                <a href="mailto:mbrie041@gmail.com">Email: mbrie041@gmail.com</a>
                <p>I like to code and stuff and pls gib me job</p>
              </div>
              <div className="info col-sm-4">
                <p className="sub-heading">Ruowen Tang</p>
                <img src="./src/assets/images/ruowen.jpeg" />
                <a href="https://github.com/ruowent">Github: ruowent </a>
                <a href="https://www.linkedin.com/in/ruowen-tang/">Linkedin: ruowen-tang </a>
                <a href="mailto:ruowen.tang@gmail.com">Email: ruowen.tang@gmail.com</a>
                <p>I like to code and stuff and pls gib me job</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}