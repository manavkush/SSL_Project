import React from "react";
import "./LibStud.css";
// import Teamcard from "../Card/Teamcard";
import Fade from "react-reveal/Fade";
// import teambanner from "./teamban.png"; // with import
import OnImagesLoaded from 'react-on-images-loaded';
import Typing from 'react-typing-animation';
import Card from '../Card/Card'
import Cursor from "react-typing-animation/dist/Cursor";
import searchimg from "./search.svg"; // with import


class LibStud extends React.Component {
    constructor(props) {
        super(props);
        this.props.showLoader();
        this.state = {
            showImages: false,
            searchReady: true
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
                        <div className="randtext">
                            <Typing >
                                <Typing.Speed ms={20} />
                                <a> Look up a book!</a><Cursor />
                            </Typing>
                        </div>
                        <div class="search">
                            <input type="text" class="searchTerm" placeholder="What are you looking for?" />
                            <button type="submit" class="searchButton" >
                                <i class="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <div className="searchResults"
                        style={{ opacity: this.state.searchReady ? 1 : 0 }}>
                        <div className="reshead">
                            <h2>Here are your search results!</h2></div>
                        <div className="searchCont">
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                        </div>

                    </div>
                    <div className="searchImg">
                        <img src={searchimg} className="searchImgI"></img>
                    </div>
                </div>
            </OnImagesLoaded >
        );
    }
}

export default LibStud;
