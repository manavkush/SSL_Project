import React from 'react';
import './Card.css'
import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';

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
    <div className="books">

      <Fade >
        <div className="bookinf">
          <div className="bookinfhead">Book name:<br /></div>
            Concepts of Physics<br />
          <div className="bookinfhead">Author:</div>
            HCV<br />
          <div className="bookinfhead">Genre:</div>
            Phyzix<br />
          <div className="bookinfhead"> ISBN:</div>
            123456789<br />
          <div className="bookinfhead">Count available:</div>
            50<br />
        </div>
      </Fade >


    </div >
  );
};

export default Card;