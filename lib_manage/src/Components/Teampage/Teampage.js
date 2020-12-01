import React from "react";
import "./Teampage.css";
import Teamcard from "../Card/Teamcard";
import Fade from "react-reveal/Fade";
import teambanner from "./teamban.png"; // with import
import OnImagesLoaded from 'react-on-images-loaded';

class Teampage extends React.Component {
  constructor(props) {
    super(props);
    this.props.showLoader();
    this.state={
            showImages: false,

    }
  }

  render() {
    return (
      <OnImagesLoaded
        onLoaded={() => {
          this.setState({ showImages: true });
          this.props.hideLoader();
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
          <div className="teamdesk">
            <div className="topbannerteam">
              <div className="titlebanteam">
                {" "}
                Team
                <p>Election Council members for 2020-21.</p>
              </div>
              <img
                src={teambanner}
                className="topbannerimgteam"
                alt="team banner"
              />
            </div>
          </div>

          <div className="teammobile">
            <div className="topbannerteam">
              <img
                src={teambanner}
                className="topbannerimgteam"
                alt="team banner"
              />

              <div className="titlebanteam">
                {" "}
                Team
                <p>Election Council members for 2020-21.</p>
              </div>
            </div>
          </div>
          <div className="fortheme">
            <div className="conti">
              <div className="headersect">Overall Coordinator</div>
              <div className="members">
                <Fade bottom duration={2000}>
                  <Teamcard
                    name1="Sonu"
                    name2="Sourav"
                    position="OSS Lead"
                    gitbool="true"
                    gitlink="https://github.com/"
                  />
                  <Teamcard
                    name1="Omkar"
                    name2="Jadhav"
                    gitbool="true"
                    position="Web dev"
                    gitlink="https://github.com/"
                  />
                  <Teamcard
                    name1="Omkar"
                    name2="Jadhav"
                    gitbool="true"
                    position="Web dev"
                    gitlink="https://github.com/"
                  />
                </Fade>
              </div>
              <div className="headersect">Overall Coordinator</div>
              <div className="members">
                <Fade bottom duration={2000}>
                  <Teamcard
                    name1="Sonu"
                    name2="Sourav"
                    position="OSS Lead"
                    gitbool="true"
                    gitlink="https://github.com/"
                  />
                  <Teamcard
                    name1="Omkar"
                    name2="Jadhav"
                    gitbool="true"
                    position="Web dev"
                    gitlink="https://github.com/"
                  />
                  <Teamcard
                    name1="Omkar"
                    name2="Jadhav"
                    gitbool="true"
                    position="Web dev"
                    gitlink="https://github.com/"
                  />
                  <Teamcard
                    name1="Omkar"
                    name2="Jadhav"
                    gitbool="true"
                    position="Web dev"
                    gitlink="https://github.com/"
                  />
                  <Teamcard
                    name1="Omkar"
                    name2="Jadhav"
                    gitbool="true"
                    position="Web dev"
                    gitlink="https://github.com/"
                  />
                </Fade>
              </div>
            </div>
            <div className="bottombanner"></div>
          </div>
        </div>
      </OnImagesLoaded>
    );
  }
}

export default Teampage;
