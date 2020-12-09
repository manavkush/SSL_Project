import React from "react";
import "./LibStud.css";
// import Teamcard from "../Card/Teamcard";
import Fade from "react-reveal/Fade";
// import teambanner from "./teamban.png"; // with import
import OnImagesLoaded from 'react-on-images-loaded';
import Typing from 'react-typing-animation';
import Card from '../Card/Card'
import CardList from '../Cardlist/CardList'
import Cursor from "react-typing-animation/dist/Cursor";
import searchimg from "./search.svg"; // with import
import Typist from 'react-typist';


class LibStud extends React.Component {
    constructor(props) {
        super(props);
        this.props.showLoader();
        this.state = {
            showImages: false,
            searchReady: true,
            bookData: []
        };
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    handleSearch = (event) => {
        let searchString = document.getElementById("searchQuery").value;
        console.log(searchString);
        event.preventDefault();
        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ searchQuery: searchString })
        };
        console.log(requestOptions);

        fetch('http://localhost:5000/search', requestOptions).then(response => {
            return response.json();
        }).then(data => {
            console.log(data.Books);
            console.log("Hello");
            this.setState({ bookData: data.Books });
            console.log(this.state.bookData);
        })

        event.preventDefault();
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
                            <a><Typist>
                                Look up a book!
                            </Typist></a>
                        </div>
                        <div class="search">
                            <input type="text" class="searchTerm" placeholder="What are you looking for?" id="searchQuery" />
                            <button type="submit" class="searchButton" onClick={this.handleSearch}>
                                <i class="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <div className="searchResults"
                        style={{ opacity: this.state.searchReady ? 1 : 0 }}>
                        <div className="reshead">
                            <h2>Here are your search results!</h2></div>
                        <CardList book={this.state.bookData} />

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
