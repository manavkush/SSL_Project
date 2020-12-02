import React from 'react';
import './Card.css'
import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';
import {showModel} from './../../App.js'
const Card = ({
  cand_imgsrc,
  cand_name,
  cand_id,
  cand_branch,
  cand_intro,
  cand_manifesto,
  id,
}) => {
  return (
    <div className="card">
      <Reveal effect="animtop">
        <div className="ds-top" />
      </Reveal>
      <Reveal effect="animprof">
        <div className="avatar-holder">
          <img src={cand_imgsrc} className="cardimg" alt="Albert Einstein" />
        </div>
      </Reveal>

      <Fade left>
        <div className="name">
          <div id="namex" href="#">
            {cand_name}
          </div>
          
          <div id="dept" href=''>
            {cand_branch}
          </div>
          
          <div id="email" href="#">
            {cand_id}
          </div>
          
        </div>
      </Fade>
      <div className="buttonhold">
        <button
          className="Button_Secondary"
          onClick={() => {
            window.open(cand_manifesto);
          }}
        >
          <i className="fa fa-file" aria-hidden="true"></i> Manifesto
        </button>
        <button
          className="Button_Secondary"
          onClick={() => {
            showModel(true, cand_intro);
          }}
        >
          <i className="fa fa-youtube-play" aria-hidden="true"></i> Intro
        </button>
      </div>
      
    </div>
  );
};

export default Card;