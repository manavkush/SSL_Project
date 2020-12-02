import React from "react";
import "./LibStud.css";
// import Teamcard from "../Card/Teamcard";
import Fade from "react-reveal/Fade";
// import teambanner from "./teamban.png"; // with import
import OnImagesLoaded from 'react-on-images-loaded';

class LibStud extends React.Component {
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
                    className="libstud"
                    style={{ opacity: this.state.showImages ? 1 : 0 }}
                >

                </div>
            </OnImagesLoaded>
        );
    }
}

export default LibStud;
