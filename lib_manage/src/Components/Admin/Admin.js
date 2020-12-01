import React, { Component } from "react";
import "./Admin.css";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import  AdminVotes from "./Admin_Votes";
import AdminImportantDates from "./Admin_Important_Dates";


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.buttonfunc = this.buttonfunc.bind(this);
  }

  showpos = (data) => {
    var acc="";
      acc+='<ol>';
      data.voter_rights.forEach((pos, i) => {
         acc+= `<li key=${i}> ${pos.elec_name}<br>`
         acc+=`<ul>`;
         acc+=`<li>Has Voted? : ${pos.elec_isvoted}</li>`;
         acc+=`<li>Voted to : ${pos.elec_votedto}</li>`;
         acc+='</ul>';
         acc+='</li><br>';
        });
      acc+="</ol>";
      return acc;

    }
  buttonfunc=()=>{
  	Swal.fire({
  title: 'Enter the student roll number',
  input: 'text',
  inputAttributes: {
    autocapitalize: 'off'
  },
  showCancelButton: true,
  confirmButtonText: 'Look up',
  showLoaderOnConfirm: true,
  preConfirm: (login) => {
    return fetch(
        "https://election-website-test.herokuapp.com/accountdetails?tokenId=hello&rollno="+login
      )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .catch(error => {
        Swal.showValidationMessage(
          `Request failed: ${error}`
        )
      })
  },
  allowOutsideClick: () => !Swal.isLoading()
}).then((result) => {
  if (result.isConfirmed) {
      var data= result.value[0];
    Swal.fire({
        title: `<strong>User ${data.voter_id} Details</strong>`,
  icon: 'info',
  html:
    `<div style=text-align:start>`+
    `<b>Voter name: </b>${data.voter_name}, <br>` +
    `<b>Voter branch: </b>${data.voter_branch},<br> ` +
    `<b>Voter rights: </b><br> ` +
    `${this.showpos(data)}`+
    '</div>',
  showCloseButton: true,
  showCancelButton: false,
  focusConfirm: false,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Great!',
  confirmButtonAriaLabel: 'Thumbs up, great!',
    })
  }
})
  }

  render() {
    return (

      <div>
        {this.props.isSigned && this.props.isAdmin ? (
          <div className="adm">
            <br />
            <Tabs
              defaultActiveKey="admin_votes"
              className="admin-tab-bar"
              variant="pills"
            >
              <Tab eventKey="admin_votes" title="VOTES">
                <hr />

                <AdminVotes
                  isSigned={this.props.isSigned}
                  isAdmin={this.props.isAdmin}
                  tokenId={this.props.tokenId}
                />
              </Tab>
              <Tab eventKey="important_dates" title="IMPORTANT DATES">
                <hr />
                <AdminImportantDates
                  isSigned={this.props.isSigned}
                  isAdmin={this.props.isAdmin}
                  tokenId={this.props.tokenId}
                />
              </Tab>
              <Button variant="primary" onClick={this.buttonfunc}>User details</Button>
            </Tabs>
          </div>
        ) : (
          ""
        )}
      </div>
    );  }
}

export default Admin;
