import React, { Component } from "react";
import logo from "./Components/Homedetails/logog.png"; // with import
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Teampage from "./Components/Teampage/Teampage";
import Electioncard from "./Components/Electioncard/Electioncard";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import Positions from "./Components/Positions/Positions";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import * as firebase from "firebase/app";
import Homedetails from "./Components/Homedetails/Homedetails";
import Footer from "./Components/Footer/Footer";
import "firebase/analytics";
import "firebase/auth";
import TimeLine1 from "./Components/TimeLine-Past Positions/TimeLine";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Important from "./Components/Important Dates/Important";
import OnImagesLoaded from "react-on-images-loaded";
import Results from "./Components/Results/Results";
import positionImg from "./position.png";

class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Modal
          show={true}
          onHide={() => {
            showModel(false, "");
          }}
          size="lg"
          centered
        >
          <iframe
            title="Video"
            width="100%"
            className="iframeVideo"
            height="420"
            src={this.props.videourl+"?autoplay=1"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Modal>
      </div>
    );
  }
}

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      value: "SIGN IN",
      isSigned: false,
      expanded: false,
    };
    const firebaseConfig = {
      apiKey: "AIzaSyDlX7lmjT-hyijYWx3nX1XoWWFrThy8f1U",
      authDomain: "election-website-950cb.firebaseapp.com",
      databaseURL: "https://election-website-950cb.firebaseio.com",
      projectId: "election-website-950cb",
      storageBucket: "election-website-950cb.appspot.com",
      messagingSenderId: "1013188453463",
      appId: "1:1013188453463:web:7051145144d8175a482f12",
      measurementId: "G-MDHD2F6PHR",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ value: "SIGN OUT" });
      } else {
        this.setState({ value: "SIGN IN" });
      }
    });
  }

  login = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        var user = result.user;
        if (
          user.email.slice(-12) === "@iitdh.ac.in" &&
          Number.isInteger(parseInt(user.email.slice(0, 9)))
        ) {
          console.log("logged in");
        }
        else {
          firebase
            .auth()
            .signOut()
            .then(function () {
              console.log("Signed Out");
            })
            .catch(function (error) {
              setError("Unable to Sign Out Please Try Again", true);
            });
          setError(
            "Oops.. Unauthorised user.\nPlease login with IIT Dh email address",
            true
          );
        }
      })
      .catch(function (error) {
        var errorMessage = error.message;
        if (
          error.code !== "auth/popup-closed-by-user" ||
          error.code !== "auth/cancelled-popup-request"
        ) {
          setError("Error while Logging In Please Try Again", true);
          console.log(errorMessage);
          firebase
            .auth()
            .signOut()
            .then(function () {
              console.log("Signed Out");
            })
            .catch(function (error) {
              setError("Unable to Sign Out Please Try Again", true);
            });
        }
      });
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("Signed Out");
      })
      .catch(function (error) {
        setError("Unable to Sign Out Please Try Again", true);
      });
  };

  render() {
    let styles = {
      zIndex: 10,
    };
    return (
      <div>
        <Navbar
          expanded={this.state.expanded}
          collapseOnSelect
          expand="lg"
          variant="light"
          className="NavBar"
        >
          <NavLink to="" style={styles}>
            <img src={logo} className="logonav" alt="IIT Dh Elections" />
          </NavLink>

          <Navbar.Toggle
            onClick={() => {
              if (this.state.expanded === "expanded")
                this.setState({ expanded: false });
              else this.setState({ expanded: "expanded" });
            }}
            aria-controls="responsive-navbar-nav"
          />

          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="NavBar navbar-toggle"
          >
            <Nav className="navbar-collapse justify-content-end">
              {firebase.auth().currentUser ? (
                <>
                  <Nav.Link
                    onClick={() => {
                      setShowAccount(true);
                    }}
                    className="NavLink nav-link"
                  >
                    <div className="secondary_Text">Profile</div>
                  </Nav.Link>
                </>
              ) : (
                ""
              )}
              <NavLink
                to="/positions"
                className="NavLink nav-link"
                style={styles}
                activeClassName="selected"
                onClick={() => this.setState({ expanded: false })}
              >
                <div className="secondary_Text">Positions</div>
              </NavLink>
              <NavLink
                to="/voting"
                className="NavLink nav-link"
                style={styles}
                activeClassName="selected"
                onClick={() => this.setState({ expanded: false })}
              >
                <div className="secondary_Text">Voting</div>
              </NavLink>
              {
                // <NavLink
                // to="/timeline"
                //  className="NavLink nav-link"
                //</Nav> style={styles}
                //  activeClassName="selected"
                //  onClick={() => this.setState({ expanded: false })}
                // >
                //  TimeLine
                // </NavLink>
              }
              <NavLink
                to="/important dates"
                className="NavLink nav-link"
                style={styles}
                activeClassName="selected"
                onClick={() => this.setState({ expanded: false })}
              >
                <div className="secondary_Text">Important Dates</div>
              </NavLink>
              <NavLink
                to="/result"
                className="NavLink nav-link"
                style={styles}
                activeClassName="selected"
                onClick={() => this.setState({ expanded: false })}
              >
                <div className="secondary_Text">Result</div>
              </NavLink>
              <NavLink
                to="/team"
                className="NavLink nav-link"
                style={styles}
                activeClassName="selected"
                onClick={() => this.setState({ expanded: false })}
              >
                <div className="secondary_Text">Team</div>
              </NavLink>
            </Nav>

            <Nav fill>
              <Nav.Link>
                <Button
                  onClick={() => {
                    if (!firebase.auth().currentUser) {
                      this.login();
                    } else {
                      this.logout();
                    }
                  }}
                  className="Button"
                >
                  {this.state.value}
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <TimeLine1 />
      </div>
    );
  }
}

class Elections extends Component {
  constructor(props) {
    super(props);
    this.props.showLoader();
    this.state = {
      showVideo: false,
      showImages: false,
      loadContent: false,
      videourl: "https://www.youtube.com/watch?v=qmN1Gf8rRc8",
      robots: [],
      Positions_robots: [],
      filter: [
        "Academic Elections",
        "Techinical Club Elections",
        "Cultural Club Elections",
        "Sports Club Elections",
        "General Elections",
        "Mess Elections",
        "Hostel Elections",
      ],
      filterbtnState: [true, true, true, true, true, true, true],
      showMobFilter: false,
    };
    // eslint-disable-next-line no-func-assign
    showModel = showModel.bind(this);
  }
  // getJson(link) {
  //   var xhttp = new XMLHttpRequest();
  //   xhttp.onreadystatechange = function () {
  //     if (this.readyState === 4 && this.status === 200) {
  //       //  robots_cand = JSON.parse(this.responseText);
  //       return JSON.parse(this.responseText);
  //     }
  //   };
  //   xhttp.open("GET", link, false);
  //   xhttp.send();
  // }
  showPositions = (user, i) => {
    return this.state.filter.includes(user.elec_cato) ? (
      <Positions
        robots={user.elec_candidates}
        name={user.elec_name}
        criteria={user.elec_vote_criteria}
        category={user.elec_cato}
        key={i}
      />
    ) : (
      ""
    );
  };
  removeFilterArrElement = (filterarr, val) => {
    return filterarr.filter(function (ele) {
      return ele !== val;
    });
  };

  toogleFilterState = (val) => {
    var r = this.state.filterbtnState;
    r[val] = !r[val];
    this.setState({ filterbtnState: r });
    var filterarr = this.state.filter;
    if (val === 0) {
      if (filterarr.includes("General Elections")) {
        filterarr = this.removeFilterArrElement(filterarr, "General Elections");
      } else {
        filterarr.push("General Elections");
      }
    } else if (val === 1) {
      if (filterarr.includes("Techinical Club Elections")) {
        filterarr = this.removeFilterArrElement(
          filterarr,
          "Techinical Club Elections"
        );
      } else {
        filterarr.push("Techinical Club Elections");
      }
    } else if (val === 2) {
      if (filterarr.includes("Cultural Club Elections")) {
        filterarr = this.removeFilterArrElement(
          filterarr,
          "Cultural Club Elections"
        );
      } else {
        filterarr.push("Cultural Club Elections");
      }
    } else if (val === 3) {
      if (filterarr.includes("Sports Club Elections")) {
        filterarr = this.removeFilterArrElement(
          filterarr,
          "Sports Club Elections"
        );
      } else {
        filterarr.push("Sports Club Elections");
      }
    } else if (val === 4) {
      if (filterarr.includes("Mess Elections")) {
        filterarr = this.removeFilterArrElement(filterarr, "Mess Elections");
      } else {
        filterarr.push("Mess Elections");
      }
    } else if (val === 5) {
      if (filterarr.includes("Hostel Elections")) {
        filterarr = this.removeFilterArrElement(filterarr, "Hostel Elections");
      } else {
        filterarr.push("Hostel Elections");
      }
    } else if (val === 6) {
      if (filterarr.includes("Academic Elections")) {
        filterarr = this.removeFilterArrElement(
          filterarr,
          "Academic Elections"
        );
      } else {
        filterarr.push("Academic Elections");
      }
    }
    this.setState({ filter: filterarr });
    console.log(this.state.filter);
  };
  componentDidMount() {
    fetch("https://election-website-test.herokuapp.com/positions")
      .then((response) => {
        this.setState({ loadContent: true });
        if (this.state.showImages === true) this.props.hideLoader();
        return response.json();
      })
      .then((users) => {
        this.setState({ Positions_robots: users });
      });
  }

  render() {
    return (
      <OnImagesLoaded
        onLoaded={() => {
          this.setState({ showImages: true });
          if (this.state.loadContent === true) this.props.hideLoader();
        }}
        onTimeout={() => {
          this.setState({ showImages: true });
          if (this.state.loadContent === true) this.props.hideLoader();
        }}
        timeout={7000}
      >
        <div
          className="forpos"
          style={{
            opacity: this.state.showImages && this.state.loadContent ? 1 : 0,
          }}
        >
          <div className="teamdesk">
            <div className="topbannerteam">
              <div className="titlebanteam">
                {" "}
                Positions
                <p>IIT Dharwad Elections 2020-21</p>
              </div>
              <img
                src={positionImg}
                className="topbannerimgteam"
                alt="position img"
              />
            </div>
          </div>
          <div className="teammobile">
            <div className="topbannerteam">
              <img
                src={positionImg}
                className="topbannerimgteam"
                alt="position img"
              />

              <div className="titlebanteam">
                {" "}
                Positions
                <p>IIT Dharwad Elections 2020-21</p>
              </div>
            </div>
          </div>
          {this.state.showVideo ? (
            <Video videourl={this.state.videourl}  />
          ) : (
            " "
          )}

          <hr />
          <div className="mobfilterbtngrp">
            <Button
              className="filtermodalbtn-show"
              variant="primary"
              onClick={() => {
                this.setState({ showMobFilter: true });
              }}
            >
              Filter
            </Button>

            <Modal
              show={this.state.showMobFilter}
              onHide={() => {
                this.setState({ showMobFilter: false });
              }}
              backdrop="static"
              centered
            >
              <Modal.Header className="mobfilterbtngrp-head">
                <Modal.Title>Filter</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mobfilterbtngrp-body">
                  <Button
                    className={
                      this.state.filterbtnState[0]
                        ? "activefilterbtn"
                        : "inactivefilterbtn"
                    }
                    onClick={() => {
                      this.toogleFilterState(0);
                    }}
                  >
                    General Elections
                  </Button>
                  <Button
                    className={
                      this.state.filterbtnState[1]
                        ? "activefilterbtn"
                        : "inactivefilterbtn"
                    }
                    onClick={() => {
                      this.toogleFilterState(1);
                    }}
                  >
                    Techinical Club Elections
                  </Button>
                  <Button
                    className={
                      this.state.filterbtnState[2]
                        ? "activefilterbtn"
                        : "inactivefilterbtn"
                    }
                    onClick={() => {
                      this.toogleFilterState(2);
                    }}
                  >
                    Cultural Club Elections
                  </Button>
                  <Button
                    className={
                      this.state.filterbtnState[3]
                        ? "activefilterbtn"
                        : "inactivefilterbtn"
                    }
                    onClick={() => {
                      this.toogleFilterState(3);
                    }}
                  >
                    Sports Club Elections
                  </Button>
                  <Button
                    className={
                      this.state.filterbtnState[4]
                        ? "activefilterbtn"
                        : "inactivefilterbtn"
                    }
                    onClick={() => {
                      this.toogleFilterState(4);
                    }}
                  >
                    Mess Elections
                  </Button>
                  <Button
                    className={
                      this.state.filterbtnState[5]
                        ? "activefilterbtn"
                        : "inactivefilterbtn"
                    }
                    onClick={() => {
                      this.toogleFilterState(5);
                    }}
                  >
                    Hostel Elections
                  </Button>
                  <Button
                    className={
                      this.state.filterbtnState[6]
                        ? "activefilterbtn"
                        : "inactivefilterbtn"
                    }
                    onClick={() => {
                      this.toogleFilterState(6);
                    }}
                  >
                    Academic Elections
                  </Button>
                </div>
              </Modal.Body>

              <Button
                className="filtermodalbtn-apply"
                onClick={() => {
                  this.setState({ showMobFilter: false });
                }}
              >
                Apply
              </Button>
            </Modal>
          </div>
          <div className="deskfilterbtngrp">
            <Button
              className={
                this.state.filterbtnState[0]
                  ? "activefilterbtn"
                  : "inactivefilterbtn"
              }
              onClick={() => {
                this.toogleFilterState(0);
              }}
            >
              General Elections
            </Button>
            <Button
              className={
                this.state.filterbtnState[1]
                  ? "activefilterbtn"
                  : "inactivefilterbtn"
              }
              onClick={() => {
                this.toogleFilterState(1);
              }}
            >
              Techinical Club Elections
            </Button>
            <Button
              className={
                this.state.filterbtnState[2]
                  ? "activefilterbtn"
                  : "inactivefilterbtn"
              }
              onClick={() => {
                this.toogleFilterState(2);
              }}
            >
              Cultural Club Elections
            </Button>
            <Button
              className={
                this.state.filterbtnState[3]
                  ? "activefilterbtn"
                  : "inactivefilterbtn"
              }
              onClick={() => {
                this.toogleFilterState(3);
              }}
            >
              Sports Club Elections
            </Button>
            <Button
              className={
                this.state.filterbtnState[4]
                  ? "activefilterbtn"
                  : "inactivefilterbtn"
              }
              onClick={() => {
                this.toogleFilterState(4);
              }}
            >
              Mess Elections
            </Button>
            <Button
              className={
                this.state.filterbtnState[5]
                  ? "activefilterbtn"
                  : "inactivefilterbtn"
              }
              onClick={() => {
                this.toogleFilterState(5);
              }}
            >
              Hostel Elections
            </Button>
            <Button
              className={
                this.state.filterbtnState[6]
                  ? "activefilterbtn"
                  : "inactivefilterbtn"
              }
              onClick={() => {
                this.toogleFilterState(6);
              }}
            >
              Academic Elections
            </Button>
          </div>
          <hr />
          {this.state.Positions_robots.map(this.showPositions)}
        </div>
      </OnImagesLoaded>
    );
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Homedetails
          hideLoader={this.props.hideLoader}
          showLoader={this.props.showLoader}
        />
      </div>
    );
  }
}

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  Error = () => {
    const handleClose = () => setError("", false);

    return (
      <>
        <Modal show={this.props.showError} onHide={handleClose}>
          <Modal.Header className="errorheader">
            <i className="material-icons erroricon">error_outline</i>
          </Modal.Header>

          <Modal.Body>
            <div className="ooops">Ooops!</div>
            <h6 className="error">{this.props.msg}</h6>
          </Modal.Body>

          <Button
            variant="secondary"
            className="errorclose"
            onClick={handleClose}
          >
            Close
          </Button>
          <br />
        </Modal>
      </>
    );
  };
  render() {
    return <div>{this.Error()}</div>;
  }
}

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: this.props.show,
      details: {
        voter_rights: [],
      },
    };
    // eslint-disable-next-line no-func-assign
    setDetails = setDetails.bind(this);
    // eslint-disable-next-line no-func-assign
    getDetails = getDetails.bind(this);
  }
  showpos = () => {
    return (
      <ul>
        {this.state.details.voter_rights.map((pos, i) => (
          <li key={i}>{pos.elec_name}</li>
        ))}
      </ul>
    );
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        fetch(
          "https://election-website-test.herokuapp.com/accountdetails?email=" +
            firebase.auth().currentUser.email
        )
          .then((response) => {
            return response.json();
          })
          .then((users) => {
            this.setState({ details: users[0] });
            //setDetails(0, 190010036);
          });
      }
    });
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.show && firebase.auth().currentUser.emailVerified}
          onHide={() => {
            setShowAccount(false);
          }}
          animation={true}
          size="lg"
          centered
        >
          <Modal.Header className="profileheadparent">
            <div className="profilehead">Profile</div>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row xs={1} md={2} lg={2}>
                <Col>
                  <div className="accountbasics">
                    <div className="accountheading">
                      Name
                      <br />
                    </div>
                    {this.state.details.voter_name}
                    <br />
                    <div className="accountheading">
                      Branch
                      <br />
                    </div>
                    {this.state.details.voter_branch}
                    <br />
                    <div className="accountheading">
                      Roll No
                      <br />
                    </div>
                    {this.state.details.voter_id}
                    <br />
                  </div>
                  <br />
                </Col>
                <Col>
                  <div className="accountposElement">
                    <div className="accountheading">
                      Eligible Voting Positions
                      <br />
                    </div>
                    {this.showpos()}
                  </div>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <div className="profileclosebtnparent">
            <Button
              variant="secondary"
              className="profileclosebtn"
              onClick={() => {
                setShowAccount(false);
              }}
            >
              Close
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      showError: false,
      showAccount: false,
      showImages: false,
      currenttab: "/",
    };
    // eslint-disable-next-line no-func-assign
    setError = setError.bind(this);
    // eslint-disable-next-line no-func-assign
    setShowAccount = setShowAccount.bind(this);
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
        <Router>
          <NavBar loginState={this.state.loginState} />
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <Home
                  {...props}
                  hideLoader={this.props.hideLoader}
                  showLoader={this.props.showLoader}
                />
              )}
            />
            <Route
              path="/positions"
              render={(props) => (
                <Elections
                  {...props}
                  hideLoader={this.props.hideLoader}
                  showLoader={this.props.showLoader}
                />
              )}
            />
            <Route
              path="/voting"
              exact
              render={(props) => (
                <Electioncard
                  {...props}
                  hideLoader={this.props.hideLoader}
                  showLoader={this.props.showLoader}
                />
              )}
            />
            <Route
              path="/timeline"
              render={(props) => (
                <TimeLine
                  {...props}
                  hideLoader={this.props.hideLoader}
                  showLoader={this.props.showLoader}
                />
              )}
            />
            <Route
              path="/important dates"
              exact
              render={(props) => (
                <Important
                  {...props}
                  hideLoader={this.props.hideLoader}
                  showLoader={this.props.showLoader}
                />
              )}
            />
            <Route
              path="/result"
              render={(props) => (
                <Results
                  {...props}
                  hideLoader={this.props.hideLoader}
                  showLoader={this.props.showLoader}
                />
              )}
            />
            <Route
              path="/team"
              render={(props) => (
                <Teampage
                  {...props}
                  hideLoader={this.props.hideLoader}
                  showLoader={this.props.showLoader}
                />
              )}
            />
          </Switch>
          <Error msg={this.state.error} showError={this.state.showError} />
          <Account show={this.state.showAccount} />
          <Footer style={{ opacity: this.state.showImages ? 1 : 0 }} />
        </Router>
      </OnImagesLoaded>
    );
  }
}

function setError(val, state) {
  this.setState({ showError: state });
  this.setState({ error: val });
}
function showModel(val, url) {
  this.setState({ showVideo: val });
  this.setState({ videourl: url });
}
function setShowAccount(val) {
  this.setState({ showAccount: val });
}

function setDetails(index, val) {
  if (firebase.auth().currentUser && this.state.details.voter_rights.length) {
    var det = this.state.details;
    det.voter_rights[index].elec_votedto = val;
    det.voter_rights[index].elec_isvoted = true;

    this.setState({ details: det });

    console.log(this.state.details.voter_rights);
    return true;
  } else {
    return false;
  }
}
function getDetails() {
  if (firebase.auth().currentUser && this.state.details.voter_rights.length) {
    return this.state.details;
  } else {
    return false;
  }
}
export { App, setDetails, getDetails, showModel };
