import React, { Component } from "react";
import "./Admin.css";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import AdminVotes from "./Admin_Votes";
import AdminImportantDates from "./Admin_Important_Dates";


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.usdetails = this.usdetails.bind(this);
    // this.addbook = this.addbook.bind(this);
    // this.rembook = this.addbook.bind(this);
    // this.issuebook = this.addbook.bind(this);
    // this.returnbook = this.addbook.bind(this);
    // this.printqueue = this.addbook.bind(this);

  }

  showpos = (data) => {
    var acc = "";
    acc += '<ol>';
    data.voter_rights.forEach((pos, i) => {
      acc += `<li key=${i}> ${pos.elec_name}<br>`
      acc += `<ul>`;
      acc += `<li>Has Voted? : ${pos.elec_isvoted}</li>`;
      acc += `<li>Voted to : ${pos.elec_votedto}</li>`;
      acc += '</ul>';
      acc += '</li><br>';
    });
    acc += "</ol>";
    return acc;

  }

  retbook = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Return a book',
      html:
        '<div style=text-align:start>' +
        '<b>Student Rollnumber: </b><br><input id="swal-input1" class="swal2-input">' +
        '<b>Book ISBN:</b><input id="swal-input2" class="swal2-input">' +
        '</div>',

      showCancelButton: true,
      confirmButtonText: 'Proceed',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        var bisbn = document.getElementById('swal-input1').value;
        var bcount = document.getElementById('swal-input2').value;
        var requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ color: "Blue", size: "IDK", copies: "copies", both: "both", details: "details" })
        };
        return fetch(
          "http://localhost:5000/upload", requestOptions
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
        console.log(result.value);
        // var data = result.value[0];
        // Swal.fire({
        //   title: `<strong>User ${data.voter_id} Info</strong>`,
        //   icon: 'info',
        //   html:
        //     `<div style=text-align:start>` +
        //     `<b>Student name: </b>${data.voter_name}, <br>` +
        //     `<b>Branch: </b>${data.voter_branch},<br> ` +
        //     `<b>Current Book issued: </b><br> ` +
        //     `<b>Pending date of return: </b><br>` +
        //     `<b>Pending charges: </b><br>` +
        //     '</div>',
        //   showCloseButton: true,
        //   showCancelButton: false,
        //   focusConfirm: false,
        //   confirmButtonText:
        //     '<i class="fa fa-thumbs-up"></i> Great!',
        //   confirmButtonAriaLabel: 'Thumbs up, great!',
        // })
      }
    })
  }

  issuebook = () => {
    Swal.fire({
      icon: 'info',
      title: 'Issue a book',
      html:
        '<div style=text-align:start>' +
        '<b>Student Roll number: </b><br><input id="swal-input1" class="swal2-input">' +
        '<b>Book ISBN: </b><input id="swal-input2" class="swal2-input">' +
        '</div>',

      showCancelButton: true,
      confirmButtonText: 'Proceed',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        var uroll = document.getElementById('swal-input1').value;
        var bisbn = document.getElementById('swal-input2').value;

        var requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ student_rollno: uroll, book_ISBN: bisbn })
        };

        return fetch(
          "http://localhost:5000/issue", requestOptions
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
        if (result.value.Status)
          Swal.fire({
            title: `Success!`,
            icon: 'success',
            text: 'Book has been issued!',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> Great!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
          })
      }
      else {
        Swal.fire({
          title: `Something went Wrong!`,
          icon: 'error',
          text: result.value.StatusMessage,
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: false,
          confirmButtonText: 'Okay :(',
        })
      }
    })
  }


  addbook = () => {
    Swal.fire({
      icon: 'question',
      title: 'Add a book',
      html:
        '<div style=text-align:start>' +
        '<b>Book name: </b><br><input id="swal-input1" class="swal2-input">' +
        '<b>ISBN: </b><input id="swal-input2" class="swal2-input">' +
        '<b>Author: </b><input id="swal-input3" class="swal2-input">' +
        '<b>Genre: </b><input id="swal-input4" class="swal2-input">' +
        '<b>Increase count by: </b><input id="swal-input5" class="swal2-input">' +
        '</div>',

      showCancelButton: true,
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        var bname = document.getElementById('swal-input1').value;
        var bisbn = document.getElementById('swal-input2').value;
        var bauth = document.getElementById('swal-input3').value;
        var bgenre = document.getElementById('swal-input4').value;
        var bcount = document.getElementById('swal-input5').value;
        var requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ book_name: bname, book_author: bauth, book_ISBN: bisbn, book_genre: bgenre, count: bcount })
        };
        return fetch(
          "http://localhost:5000/addBook", requestOptions
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
        if (result.value.Status)
          Swal.fire({
            title: `Success!`,
            icon: 'success',
            text: 'Book has been added!',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> Great!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
          })
      }
      else {
        Swal.fire({
          title: `Something went Wrong!`,
          icon: 'error',
          text: result.value.StatusMessage,
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: false,
          confirmButtonText: 'Okay :(',
        })
      }
    })
  }

  rembook = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Remove a book',
      html:
        '<div style=text-align:start>' +
        '<b>Book ISBN: </b><br><input id="swal-input1" class="swal2-input">' +
        '<b>Decrease count by: </b><input id="swal-input2" class="swal2-input">' +
        '</div>',

      showCancelButton: true,
      confirmButtonText: 'Remove',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        var bisbn = document.getElementById('swal-input1').value;
        var bcount = document.getElementById('swal-input2').value;

        return fetch(
          "https://election-website-test.herokuapp.com/accountdetails?tokenId=hello&rollno="
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
        var data = result.value[0];
        Swal.fire({
          title: `<strong>User ${data.voter_id} Info</strong>`,
          icon: 'info',
          html:
            `<div style=text-align:start>` +
            `<b>Student name: </b>${data.voter_name}, <br>` +
            `<b>Branch: </b>${data.voter_branch},<br> ` +
            `<b>Current Book issued: </b><br> ` +
            `<b>Pending date of return: </b><br>` +
            `<b>Pending charges: </b><br>` +
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
  usdetails = () => {
    Swal.fire({
      icon: 'info',
      title: 'User details',
      html:
        '<div style=text-align:start>' +
        '<b>Student Roll number: </b><br><input id="swal-input1" class="swal2-input">' +
        '<b>Decrease Charges by (default is 0): </b><input id="swal-input2" class="swal2-input">' +
        '</div>',
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return fetch(
          "https://election-website-test.herokuapp.com/accountdetails?tokenId=hello&rollno="
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
        var data = result.value[0];
        Swal.fire({
          title: `<strong>User ${data.voter_id} Info</strong>`,
          icon: 'info',
          html:
            `<div style=text-align:start>` +
            `<b>Student name: </b>${data.voter_name}, <br>` +
            `<b>Branch: </b>${data.voter_branch},<br> ` +
            `<b>Current Book issued: </b><br> ` +
            `<b>Pending date of return: </b><br>` +
            `<b>Pending charges: </b><br>` +
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
        {this.props.isSigned ? (
          <div className="adm">
            <div className="firstline">
              <div className="cerq" onClick={this.addbook}>
                <div className="cerqtext">Add a book</div>
              </div>
              <div className="cerq" onClick={this.rembook}>
                <div className="cerqtext">Remove a book</div>
              </div>
            </div>
            <div className="secondline">
              <div className="cerq" onClick={this.issuebook}>
                <div className="cerqtext">Issue a book</div>
              </div>
              <div className="cerqadm" >
                <div className="admtext">Admin</div>
              </div>
              <div className="cerq" onClick={this.retbook}>
                <div className="cerqtext">Return a book</div>

              </div>


            </div>
            <div className="thirdline">
              <div className="cerq">
                <div className="cerqtext">Printing queue</div>
              </div>
              <div className="cerq" onClick={this.usdetails}>
                <div className="cerqtext">Check student profiles</div>
              </div></div>
          </div>
        ) : (
            ""
          )}
      </div>
    );
  }
}

export default Admin;
