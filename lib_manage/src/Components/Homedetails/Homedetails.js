import React from "react";
import "./Homedetails.css";
import logo from "./logog.png"; // with import
import logoweb from "./fullart.png"; // with import
import logowebx from "./bookdesk.svg"; // with import
import Renderer from "../Renderer";
import Countdown from "react-countdown";
import bottomimg from "./bck.png"; // with import
import Reveal from "react-reveal/Reveal";
import Fade from "react-reveal/Fade";
import VisibilitySensor from "react-visibility-sensor";
import OnImagesLoaded from "react-on-images-loaded";
import Ticker from "../Ticker.js";

class Homedetails extends React.Component {
  constructor(props) {
    super(props);
    this.props.showLoader();
    stateChange = stateChange.bind(this);
    this.state = {
      showImages: false,
      linkLoaded: false,
      showelec: true,
      showcand: true,
      showtime: true,
      showdate: true,
      showmonth: true,
    };
  }

  render() {
    return (
      <OnImagesLoaded
        onLoaded={() => {
          this.props.hideLoader();
          this.setState({ showImages: true });
        }}
        onTimeout={() => {
          this.setState({ showImages: true });
          this.props.hideLoader();
        }}
        timeout={7000}
      >
        <div
          className="pogcont"
          style={{ opacity: this.state.showImages ? 1 : 0 }}
        >
          <div className="show-mobile">
            <div className="imgshow">
              <img className="logoimg" src={logo} />
              <div className="infotxt">
                <a>IIT Dharwad</a> <br /> Student Council Elections
              </div>
              <img className="bottomimg" src={bottomimg} />
            </div>
            <div className="homeinfo">
              <Fade>
                <div className="info">
                  <a className="tallinfo">
                    <Ticker className="count" end={59} duration={3} />{" "}
                    <i className="fa fa-flag" aria-hidden="true"></i>
                  </a>
                </div>
              </Fade>
              <Fade>
                <div className="info">
                  <a className="tallinfo">
                    <Ticker className="count" end={200} duration={3} />{" "}
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </a>
                </div>
              </Fade>
              <Fade>
                <div className="info">
                  <a className="tallinfo">
                    <Ticker className="count" end={10} duration={3} />
                    :00 am,{" "}
                  </a>
                </div>
              </Fade>
              <Fade>
                <div className="info">
                  <a className="tallinfo">
                    <Ticker className="count" end={5} duration={3} />
                    /
                    <Ticker className="count" end={6} duration={3} />
                    /2020{" "}
                    <i
                      className="fa fa-calendar-check-o"
                      aria-hidden="true"
                    ></i>
                  </a>
                </div>
              </Fade>
            </div>
          </div>

          <div className="hide-mobile">
            <div className="imgshow">
              <div
                style={{
                  backgroundImage: "url(" + logowebx + ")",
                  backgroundPosition: "bottom",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  marginTop: "20vh",
                  marginRight: "-2vw",
                }}
              ></div>
              <div className="infotxt">
                <a>Hello there!</a> <br />
                Welcome to your one stop location for accessing library resources at IIT Dharwad.
              </div>
            </div>
            {/* <div className="homeinfo">
              <div className="info">
                <div className="tallinfo">
                  <Ticker className="count" end={59} duration={3} />{" "}
                  <i className="fa fa-flag" aria-hidden="true"></i>
                </div>
                <br />
              </div>

              <div className="info">
                <div className="tallinfo">
                  <Ticker className="count" end={100} duration={3} />{" "}
                  <i className="fa fa-user" aria-hidden="true"></i>
                </div>
                <br />
              </div>

              <div className="info">
                <div className="tallinfo">
                  <Ticker className="count" end={10} duration={3} />
                  :00 am
                </div>
                <br />
              </div>

              <div className="info">
                <div className="tallinfo">
                  <Ticker className="count" end={21} duration={3} />
                  /
                  <Ticker className="count" end={5} duration={3} />
                  /2020{" "}
                  <i className="fa fa-calendar-check-o" aria-hidden="true"></i>
                </div>
                <br />
              </div>
              <div className="emptydiv">
                <Fade delay={300}>
                  <div className="markcal">Mark your calender!</div>
                </Fade>
                <div className="formg">
                  <Countdown date={Date.now() + 1000000} renderer={Renderer} />
                </div>
              </div>
              <div className="emptydiv">
              </div>
            </div> */}
          </div>

        </div>
      </OnImagesLoaded>
    );
  }
}
function stateChange() {
  setTimeout(function () {

  }, 5000);
}
export default Homedetails;
