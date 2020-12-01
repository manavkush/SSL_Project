import React from "react";
import "./Electioncard.css";
import Reveal from "react-reveal/Reveal";
import Fade from "react-reveal/Fade";
import votebanner from "./votepage.png"; // with import
import Swal from "sweetalert2";
import {
  CollapsibleComponent,
  CollapsibleHead,
  CollapsibleContent,
} from "react-collapsible-component";
import OnImagesLoaded from 'react-on-images-loaded';

class Electioncard extends React.Component {
  constructor(props) {
    super(props);
    this.props.showLoader();
    this.candbutton = this.candbutton.bind(this);
    this.candI = this.candI.bind(this);
    this.state = {
      showImages: false,
      opened: false,
    };
  }

  candbutton = (event) => {
    console.log(event.target.dataset.elecindex, event.target.dataset.candindex);
    Swal.fire({
      title: "Cast Vote?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success!", "Your vote has been casted.", "success");
      }
    });
  };

  candI = (event) => {
    event.stopPropagation();
    console.log(event.target.dataset.elecindex, event.target.dataset.candindex);
    Swal.fire({
      title: "Hello there",
      text: "Modify me!"
    });
  };

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
        <div style={{ opacity: this.state.showImages ? 1 : 0 }}>
          <div className="elecdesk">
            <div className="topbanner">
              <div className="titleban">
                {" "}
            Voting page
            <p>
                  Vote for the following positions according to your voting rights.
            </p>
              </div>
              <img src={votebanner} className="topbannerimg" />
            </div>
          </div>

          <div className="elecmobile">
            <div className="topbanner">
              <img src={votebanner} className="topbannerimg" />

              <div className="titleban">
                {" "}
            Voting page
            <p>
                  Vote for the following positions according to your voting rights.
            </p>
              </div>
            </div>
          </div>
          <div className="forthemeelec">
            <div className="cont">
              <CollapsibleComponent>
                <div>
                  <CollapsibleHead className="elecbar" >
                    <div className="elecname">General Seceratory Sports</div>
                  </CollapsibleHead>
                  <CollapsibleContent isExpanded={true}>
                    <Fade top opposite={true}>
                      <div className="eleccard">
                        <div
                          className="candidate"
                          data-elecindex="1"
                          data-candindex="190010029"
                          onClick={this.candbutton}
                        >
                          <div className="candimg">
                            <img
                              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1820405/profile/profile-512.jpg?1533058950"
                              alt="Albert Einstein"
                            />
                          </div>

                          <div className="candname">Omkar Dnyaneshwar Jadhav</div>
                          <div className="cdinf"><i className="fa fa-info-circle" aria-hidden="true" onClick={this.candI}></i></div>
                          <div className="lock"></div>
                        </div>
                        <div className="candidate">
                          <div className="candimg">
                            <img
                              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1820405/profile/profile-512.jpg?1533058950"
                              alt="Albert Einstein"
                            />
                          </div>
                          <div className="candname"></div>
                          <div className="btnlock"></div>
                        </div>
                        <div
                          className="candidate"
                          data-elecindex="2"
                          onClick={this.candbutton}
                        >
                          <div className="candimg">
                            <img
                              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1820405/profile/profile-512.jpg?1533058950"
                              alt="Albert Einstein"
                            />
                          </div>
                          <div className="candname"></div>
                          <div className="btnlock"></div>
                        </div>
                      </div>
                    </Fade>
                  </CollapsibleContent>
                </div>
                <div>
                  <CollapsibleHead className="elecbar">
                    <div className="elecname">Election 1</div>
                    <div className="elecrights"></div>
                  </CollapsibleHead>
                  <CollapsibleContent>
                    <Fade top>
                      <div className="eleccard">
                        <div className="candidate">
                          <div className="candimg">
                            <img
                              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1820405/profile/profile-512.jpg?1533058950"
                              alt="Albert Einstein"
                            />
                          </div>
                          <div className="candname">Omkar Dnyaneshwar Jadhav</div>
                          <div className="cdinf"><i class="fa fa-info-circle" aria-hidden="true"></i></div>

                          <div className="lock unlocked"></div>
                        </div>
                        <div className="candidate">
                          <div className="candimg">
                            <img
                              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1820405/profile/profile-512.jpg?1533058950"
                              alt="Albert Einstein"
                            />
                          </div>
                          <div className="candname"></div>
                          <div className="btnlock"></div>
                        </div>
                        <div className="candidate">
                          <div className="candimg">
                            <img
                              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1820405/profile/profile-512.jpg?1533058950"
                              alt="Albert Einstein"
                            />
                          </div>
                          <div className="candname"></div>
                          <div className="btnlock"></div>
                        </div>
                      </div>
                    </Fade>
                  </CollapsibleContent>
                </div>
                <CollapsibleHead className="elecbar">
                  <div className="elecname">Election 2</div>
                  <div className="elecrights"></div>
                </CollapsibleHead>
                <CollapsibleContent>
                  <div className="eleccard">
                    <div className="candidate">
                      <div className="candimg"></div>
                      <div className="candname"></div>
                      <div className="btnlock"></div>
                    </div>
                  </div>
                </CollapsibleContent>
              </CollapsibleComponent>
            </div>
            <div className="bottombanner"></div>

          </div>
        </div>
      </OnImagesLoaded>
    );
  }
}

export default Electioncard;
