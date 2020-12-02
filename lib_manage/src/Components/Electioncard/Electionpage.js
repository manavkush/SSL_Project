import React from "react";
import "./Electioncard.css";
import Reveal from "react-reveal/Reveal";
import Fade from "react-reveal/Fade";
import votebanner from "./votepage.png"; // with import

import {
  CollapsibleComponent,
  CollapsibleHead,
  CollapsibleContent,
} from "react-collapsible-component";

class Electionpage extends React.Component {
  constructor() {
    super();
    this.candbutton = this.candbutton.bind(this);
    this.state = {
      
    };
  }
  candbutton() {
    console.log("tapped");
  }

  render() {
    return (
      <div>
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
        <div className="cont">
          <CollapsibleComponent>
            <CollapsibleHead className="elecbar" elec-id="1">
              <div className="elecname">General Seceratory Sports</div>
            </CollapsibleHead>
            <CollapsibleContent>
              <Fade top>
                <div className="eleccard">
                  <div
                    className="candidate"
                    data-index="1"
                    onClick={this.candbutton}
                  >
                    <div className="candimg">
                      <img
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1820405/profile/profile-512.jpg?1533058950"
                        alt="Albert Einstein"
                      />
                    </div>
                    <div className="candname">Omkar Dnyaneshwar Jadhav</div>
                    <div className="lock"></div>
                </div>
              </Fade>
            </CollapsibleContent>
          </CollapsibleComponent>
        </div>
      </div>
    );
  }
}

export default Electionpage;
