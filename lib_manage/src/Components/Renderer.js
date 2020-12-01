import React from "react";
import Flip from "../Flip";
import "../Tick2.css";

const Renderer = ({ days, hours, minutes, seconds, completed }) => {
  let daysgg = days.toString();
  let hoursgg = hours.toString();
  let minutesgg = minutes.toString();
  let secondsgg = seconds.toString();
  let day1 = days.toString().length === 1 ? "0" : daysgg[0];
  let day2 = days.toString().length === 1 ? days : daysgg[1];
  let hour1 = hours.toString().length === 1 ? "0" : hoursgg[0];
  let hour2 = hours.toString().length === 1 ? hours : hoursgg[1];
  let min1 = minutes.toString().length === 1 ? "0" : minutesgg[0];
  let min2 = minutes.toString().length === 1 ? minutes : minutesgg[1];
  let sec1 = seconds.toString().length === 1 ? "0" : secondsgg[0];
  let sec2 = seconds.toString().length === 1 ? seconds : secondsgg[1];

  if (completed) {
    return null;
  } else {
    return (
      <div>
        <div className="show-mobile">
          <div className="enclose">
            <div className="timerdays">{days}</div>

            <div className="dateval">
              <div className="tex">Days</div>
            </div>
            <div className="timerbox">
              <Flip value={hour1} />
              <Flip value={hour2} />
              <div className="colon">:</div>
              <Flip value={min1} />
              <Flip value={min2} />
              <div className="colon">:</div>
              <Flip value={sec1} />
              <Flip value={sec2} />
            </div>
            <div className="datevals">
              <div className="tex">Hours</div>
              <div></div>
              <div className="tex">Minutes</div>
              <div></div>
              <div className="tex">Seconds</div>
            </div>
          </div>
        </div>

        <div className="hide-mobile">
          <div className="enclose">
            <div className="timerbox">
              <Flip value={day1} />
              <Flip value={day2} />
              <div className="colon">:</div>
              <Flip value={hour1} />
              <Flip value={hour2} />
              <div className="colon">:</div>
              <Flip value={min1} />
              <Flip value={min2} />
              <div className="colon">:</div>
              <Flip value={sec1} />
              <Flip value={sec2} />
            </div>

            <div className="datevals">
              <div className="tex">Days</div>
              <div></div>
              <div className="tex">Hours</div>
              <div></div>
              <div className="tex">Minutes</div>
              <div></div>
              <div className="tex">Seconds</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Renderer;
