import React from "react";
import "./Teampage.css";
import Teamcard from "../Card/Teamcard";
import Fade from "react-reveal/Fade";
import teambanner from "./teampg.svg"; // with import
import OnImagesLoaded from 'react-on-images-loaded';

class Teampage extends React.Component {
  constructor(props) {
    super(props);
    this.props.showLoader();
    this.state = {
      showImages: false,
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
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
            <div className="teamtitle">Our Team</div>
            <div className="teamimg">
              <img src={teambanner}></img>
            </div>
            <div className="teamcards">
              <Teamcard cand_name="Omkar Jadhav" cand_id="190010029" cand_role="Reach out to me at:" cand_link2="https://github.com/IamODJ" cand_link1="https://www.linkedin.com/in/omkar-jadhav-56081a195/" cand_imgsrc="https://drive.google.com/uc?export=view&id=1k0w84Ejs2PlzY4xbDDIkqtt2agHvWL4G" />
              <Teamcard cand_name="Manav Kushwaha" cand_id="190010023" cand_role="Reach out to me at:" cand_link2="https://github.com/manavkush" cand_link1="https://www.linkedin.com/in/manav-kushwaha/" cand_imgsrc="https://drive.google.com/uc?export=view&id=1g_oE_kYLL4N61zLwZCVpy-iracOEkysr" />
              <Teamcard cand_name="Pratik Jain" cand_id="190010034" cand_role="Reach out to me at:" cand_link2="https://github.com/jpratik15" cand_link1="https://www.linkedin.com/in/pratik-manoj-jain-536855192/" cand_imgsrc="https://drive.google.com/uc?export=view&id=1wowZsPu9qqtqntddnx15q-T5ulKZoKEP" />
            </div>

          </div>
        </div>
      </OnImagesLoaded>
    );
  }
}

export default Teampage;
