import React, { Component } from "react";
import "./Admin.css";
import DateTimePicker from "react-datetime-picker";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class AdminImportantDates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      electionDate: '',
      resultsDate: '',
      responseMessage: "",
      errormsg: "",
      show: "false",
    };
  }
  sendDates = () => {
    if (this.state.electionDate && this.state.resultsDate) {
      fetch("https://election-website-test.herokuapp.com/changeImpDates", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          tokenId: this.props.tokenId,
          electionDate: this.state.electionDate.toString(),
          resultsDate: this.state.resultsDate.toString(),
        }),
      })
        .then((response) => response.json())
        .then((json) =>
          this.setState({ responseMessage: json.responseMessage })
        );
    } else {
      this.setState({ errormsg: "Fill all the fields" });
    }
    //https://election-website-test.herokuapp.com/changeImpDates
  };

  componentDidMount() {
     fetch("https://election-website-test.herokuapp.com/getimportantDates?tokenId=" +
          this.props.tokenId)
       .then((response) => {
         return response.json();
       })
       .then((data) => {
         this.setState({ resultsDate: new Date(data.resultsDate),electionDate:new Date(data.electionDate),show:true });
       });
  }
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Edit Important-Dates</h1>
        <hr />
        {this.state.show ? (
          <Container>
            <Row xs={1} md={2}>
              <Col className="admin-impdates-col">
                <div className="admin-impdates-label">Election Date</div>
              </Col>
              <Col className="admin-impdates-col">
                <DateTimePicker
                  onChange={(val) => {
                    this.setState({ electionDate: val }) }}
                  value={this.state.electionDate}
                  className="admin-datetimepicker"
                  format="dd-MM-y h:mm a"
                  clearIcon={null}
                />
              </Col>
            </Row>
            <Row xs={1} md={2}>
              <Col className="admin-impdates-col">
                <div className="admin-impdates-label">Results Date</div>
              </Col>
              <Col className="admin-impdates-col">
                <DateTimePicker
                  onChange={(val) => {
                    this.setState({ resultsDate: val });
                  }}
                  value={this.state.resultsDate}
                  className="admin-datetimepicker"
                  format="dd-MM-y h:mm a"
                  clearIcon={null}
                />
              </Col>
            </Row>

            <Row>
              <Button className="admin-impdates-btn" onClick={this.sendDates}>
                Change Dates
              </Button>
            </Row>
            <Row>
              <div className="admin-impdates-msg-success">
                {this.state.responseMessage}
              </div>
            </Row>
            <Row>
              <div className="admin-impdates-msg-error">
                {this.state.errormsg}
              </div>
            </Row>
          </Container>
        ) : (
          ""
        )}
        
        <br />
      </div>
    );
  }
}

export default AdminImportantDates;
