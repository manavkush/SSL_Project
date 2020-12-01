import React from "react";
import Fade from "react-reveal/Fade";
import "./Electioncard.css";

import {
  CollapsibleComponent,
  CollapsibleHead,
  CollapsibleContent,
} from "react-collapsible-component";

const Grabelection = ({ candidates }) => {
  return (
    <CollapsibleContent>
      <Fade top>
        <div className="eleccard">
          {candidates.map((user, i) => {
            return (
              <div
                className="candidate"
                data-candindex={candidates[i].id}
                onClick={this.candbutton} // needs work  add user.lockstatus
              >
                <div className="candimg">
                  <img
                    src={candidates[i].profileurl}
                    alt="Profile pic"
                  />
                </div>
                <div className="candname">{candidates[i].candname}</div>
                <div className="lock"></div> 
              </div>
            );
          })}
        </div>
      </Fade>
    </CollapsibleContent>
  );
};

export default Grabelection;
