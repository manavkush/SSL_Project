import React from "react";
import "./Teamcard.css";
import Reveal from "react-reveal/Reveal";
import Fade from "react-reveal/Fade";
const Teamcard = ({
  name1,
  name2,
  imgsrc,
  position,
  gitbool,
  linkedbool,
  instabool,
  fbbool,
  gitlink,
  linkedlink,
  instalink,
  fblink,
}) => {
  const getgit = () => {
    if (gitbool)
      return (
        <a href={gitlink}>
          <i className="fa fa-github-square" aria-hidden="true"></i>
        </a>
      );
    else return null;
  };
  const getlinked = () => {
    if (linkedbool)
      return (
        <a href={linkedlink}>
          <i className="fa fa-linkedin-square" aria-hidden="true"></i>
        </a>
      );
    else return null;
  };
  const getinsta = () => {
    if (instabool)
      return (
        <a href={instalink}>
          <i className="fa fa-instagram" aria-hidden="true"></i>
        </a>
      );
    else return null;
  };
  const getfb = () => {
    if (fbbool)
      return (
        <a href={fblink}>
          <i className="fa fa-facebook-square" aria-hidden="true"></i>
        </a>
      );
    else return null;
  };

  return (
    <div className="containercard">
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1820405/profile/profile-512.jpg?1533058950" />

      <div className="contentcard">
        <h2>
          {name1} <br /> {name2}
        </h2>
        <p>{position}</p>

        <div className="icons">
          {getgit()}
          {getlinked()}
          {getinsta()}
          {getfb()}
        </div>
      </div>
    </div>
  );
};

export default Teamcard;
