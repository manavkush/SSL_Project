import React from "react";
import Fade from "react-reveal/Fade";
import "./Electioncard.css";

import {
  CollapsibleComponent,
  CollapsibleHead,
  CollapsibleContent,
} from "react-collapsible-component";

const Grabelection = ({ robots }) => {
  return (
    <CollapsibleComponent>
      {robots.map((user, i) => {
        return (
          <div>
          <CollapsibleHead className="elecbar">
            <div className="elecname">{robots[i].elecname}</div>
          </CollapsibleHead>
          <Grabcandidate candidates={robots[i].eleccands}
          </div>
        );
      })}
    </CollapsibleComponent>
  );
};

export default CardList;
