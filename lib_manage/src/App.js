import React, { Component } from "react";
import logo from "./Components/Homedetails/logog.png"; // with import
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { withRouter } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Teampage from "./Components/Teampage/Teampage";
import Electioncard from "./Components/Electioncard/Electioncard";
import Nav from "react-bootstrap/Nav";
import history from './history';
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import Homedetails from "./Components/Homedetails/Homedetails";
import Empty from "./Components/Empty/Empty";

import Footer from "./Components/Footer/Footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import OnImagesLoaded from "react-on-images-loaded";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import Admin from "./Components/Admin/Admin";
import Printer from "./Components/Printer/Printer.js";



class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      isSigned: false,
      isAdmin: false,
      isVoter: false,
      tokenId: "",
      authRes: "",
      expanded: false,
    };
    // eslint-disable-next-line no-func-assign

  }
  refreshToken = (oldres) => {
    oldres.reloadAuthResponse().then((res) => {
      this.setState({ tokenId: res.id_token });
    });
  };

  signInOnSuccess = (res) => {
    this.setState({
      isSigned: true,
      tokenId: res.tokenId,
      authRes: res,
    });

    var refresh = setInterval(
      this.refreshToken(res),
      Number(this.state.authRes.tokenObj.expires_in) * 60000
    );

    this.setState({ refresh: refresh });

    this.isAdmin();

  };
  signInOnError = (err) => {
    console.log(err);
    setError("Unable to Sign In Please Try Again", true);
  };

  signOutOnError = (err) => {
    console.log(err);
    setError("Unable to Sign Out Please Try Again", true);
  };

  signOutOnSuccess = () => {
    this.setState({
      isSigned: false,
      tokenId: "",
      authRes: "",
      isAdmin: false,
      isVoter: false,
    });
    clearInterval(this.state.refresh);

    setInfo({
      isAdmin: this.state.isAdmin,
      isSigned: this.state.isSigned,
      tokenId: this.state.tokenId,
    });
  };

  async isAdmin() {
    if (this.state.tokenId.length) {
      await fetch(
        "https://election-website-test.herokuapp.com/userType?tokenId=" +
        this.state.tokenId
      )
        .then((response) => {
          return response.json();
        })
        .then((user) => {

          if (user.type === "adminANDvoter") {
            this.setState({ isAdmin: true, isVoter: true });
          } else if (user.type === "admin") {
            this.setState({ isAdmin: true, isVoter: false });
          } else if (user.type === "voter") {
            this.setState({ isAdmin: false, isVoter: true });
          } else {
            this.setState({ isAdmin: false, isVoter: false });
          }
        })
        .then(() => {
          setInfo({
            isAdmin: this.state.isAdmin,
            isVoter: this.state.isVoter,
            isSigned: this.state.isSigned,
            tokenId: this.state.tokenId,
          });
        });
    }
  }

  componentDidUpdate() { }

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
              {this.state.isAdmin && this.state.isSigned ? (
                <NavLink
                  to="/admin"
                  className="NavLink nav-link"
                  style={styles}
                  activeClassName="selected"
                  onClick={() => this.setState({ expanded: false })}
                >
                  <div className="secondary_Text">Admin</div>
                </NavLink>
              ) : (
                  ""
                )}

              {this.state.isSigned ? (
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
                to="/library"
                className="NavLink nav-link"
                style={styles}
                activeClassName="selected"
                onClick={() => this.setState({ expanded: false })}
              >
                <div className="secondary_Text">Library</div>
              </NavLink>
              <NavLink
                to="/printmg"
                className="NavLink nav-link"
                style={styles}
                activeClassName="selected"
                onClick={() => this.setState({ expanded: false })}
              >
                <div className="secondary_Text">Printer</div>
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
                {!this.state.isSigned ? (
                  <GoogleLogin
                    clientId="352037303035-ld3gu55gulckmeo1m573kt8qocth524o.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <Button
                        className="Button"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        SIGN IN
                      </Button>
                    )}
                    buttonText={this.state.value}
                    onSuccess={this.signInOnSuccess}
                    onFailure={this.signInOnError}
                    cookiePolicy={"single_host_origin"}
                    hostedDomain="iitdh.ac.in"
                    isSignedIn={true}
                  />
                ) : (
                    <GoogleLogout
                      clientId="352037303035-ld3gu55gulckmeo1m573kt8qocth524o.apps.googleusercontent.com"
                      render={(renderProps) => (
                        <Button
                          className="Button"
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                        >
                          SIGN OUT
                        </Button>
                      )}
                      buttonText={this.state.value}
                      onLogoutSuccess={this.signOutOnSuccess}
                      onFailure={this.signOutOnError}
                      hostedDomain="iitdh.ac.in"
                      isSignedIn={true}
                    />
                  )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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
      tokenId: this.props.tokenId,
      isVoter: this.props.isVoter,
      show: this.props.show,
      details: {
        voter_rights: [],
      },
    };
    // eslint-disable-next-line no-func-assign
    fetchDetails = fetchDetails.bind(this);
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

  componentDidUpdate() {
    if (
      this.state.tokenId !== this.props.tokenId ||
      this.state.isVoter !== this.props.isVoter
    ) {
      this.getDetails();
    }

  }
  async getDetails() {
    if (this.props.tokenId.length) {
      await fetch(
        "https://election-website-test.herokuapp.com/accountdetails?tokenId=" +
        this.props.tokenId
      )
        .then((response) => {
          return response.json();
        })
        .then((users) => {
          this.setState({ tokenId: this.props.tokenId, isVoter: this.props.isVoter, details: users[0] });
        });
    }
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
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
      isSigned: false,
      isAdmin: false,
      isVoter: false,
      tokenId: "",
    };
    // eslint-disable-next-line no-func-assign
    setInfo = setInfo.bind(this);
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
        <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
          <NavBar loginState={this.state.loginState} />
          <Switch>
            <Route
              path="/"
              exact
              render={withRouter((props) => (
                <Homedetails
                  {...props}
                  hideLoader={this.props.hideLoader}
                  showLoader={this.props.showLoader}
                />
              ))}
            />
            <Route
              path="/admin"
              render={(props) => (
                <Empty
                  {...props}
                  hideLoader={this.props.hideLoader}
                  showLoader={this.props.showLoader}
                  isSigned={this.state.isSigned}
                  isAdmin={this.state.isAdmin}
                  tokenId={this.state.tokenId}
                />
              )}
            />
            <Route
              path="/library"
              exact component={withRouter((props) => (
                <Empty
                  {...props}
                  hideLoader={this.props.hideLoader}
                  showLoader={this.props.showLoader}
                />
              ))}
            />
            <Route
              path="/printmg"
              exact
              render={(props) => (
                <Printer
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
          <Account
            show={this.state.showAccount}
            tokenId={this.state.tokenId}
          />
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
function setShowAccount(val) {
  this.setState({ showAccount: val });
}
function setInfo(val) {
  this.setState({
    tokenId: val.tokenId,
    isAdmin: val.isAdmin,
    isSigned: val.isSigned,
  });
}
function fetchDetails(refresh) {
  if (this.state.tokenId.length && this.state.details.voter_rights.length) {
    if (refresh === 1) {
      this.getDetails();
    }
    return this.state.details;
  } else {
    return false;
  }
}
export default withRouter(App);
// export  App, showModel, fetchDetails };
