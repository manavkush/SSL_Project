import React from 'react';
import './Teamcard.css'
import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';
const Teamcard = ({
  cand_imgsrc,
  cand_name,
  cand_id,
  cand_role,
  cand_link1,
  cand_link2
}) => {
  return (
    <div className="card">
      <Reveal effect="animtop">
        <div className="ds-top" />
      </Reveal>
      <Reveal effect="animprof">
        <div className="avatar-holder">
          <img src={cand_imgsrc} className="cardimg" alt="Profile pic" />
        </div>
      </Reveal>

      <Fade left>
        <div className="name">
          <div id="namex">
            {cand_name}
          </div>

          <div id="dept">
            CSE Dept.
          </div>

          <div id="email">
            {cand_id}
          </div>
          <div id="email">
            {cand_role}
          </div>
          <div className="icons">
            <a href={cand_link1} target="_blank">
              <i className="fa fa-linkedin-square" aria-hidden="true"></i>
            </a>
            <a href={cand_link2} target="_blank">
              <i className="fa fa-github" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </Fade>


    </div >
  );
};

export default Teamcard;