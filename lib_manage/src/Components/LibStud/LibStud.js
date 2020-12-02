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
                    <div className="search-bar">
                        <div class="search">
                            <input type="text" class="searchTerm" placeholder="What are you looking for?" />
                            <button type="submit" class="searchButton">
                                <i class="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <div className="searchResults"></div>
                </div>
            </OnImagesLoaded >
        );
    }
}

export default LibStud;
