import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Printer.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { set } from "lodash";


function Printer(props) {


	const printingSpeci_ph = "Pages 1 - 4 EXCEPT Page 3 (Custom Text) ";
	const genInstruc_ph = "General Instructions about the Print";

	let [color, setColor] = useState("b/w");

	function handleColor(event) {
		setColor(event.target.value);
	}

	let [size, setSize] = useState("A3");

	function handleSize(event) {
		setSize(event.target.value);
	}


	let [copies, setCopies] = useState(1);

	function handleCopies(event) {
		setCopies(event.target.value);
	}

	let [both, setBoth] = useState("Yes");

	function handleBoth(event) {
		setBoth(event.target.value);
	}

	let [details, setDetails] = useState("");

	function handleDetails(event) {
		setDetails(event.target.value);
	}

	function handleSubmit(event) {
		console.log("Hello World");
		event.preventDefault();
		var requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ color: color, size: size, copies: copies, both: both, details: details })
		};
		console.log(requestOptions);

		fetch('http://localhost:5000/upload', requestOptions).then(function (response) {
			console.log(response);
			// return response.json();
		});

		// event.preventDefault();

	}


	return (
		<div className="container">
			<h1 className="header">Hassle free Printing</h1>

			<form className="formClass" encType="multipart/form-data">
				//-----------File----------------------------------------
				{/* <div className="form-group">
					<label for="uploadingFiles">Upload Files to Print</label>
					<br />
					<input type="file" multiple />
				</div> */}

				//-----------Color-------------------------------------
				<div className="form-group">
					<label for="color">Color</label>
					<select name="color" className="form-control" style={{ width: "50%" }} id="color" value={color} onChange={handleColor}>
						<option value="b/w">Black and White</option>
						<option value="color">Color</option>
					</select>
				</div>
				//---------------Size---------------------------------

				<div className="form-group">
					<label for="paperSize">Paper Size</label>
					<select name="size" className="form-control" style={{ width: "50%" }} id="paperSize" value={size} onChange={handleSize}>
						<option value="A3">A3</option>
						<option value="A4">A4</option>
						<option value="A5">A5</option>
					</select>
				</div>

				//---------------Copies-------------------------------------

				<div className="form-group">
					<label for="copies">Copies</label>
					<input name="copies" className="form-control" type="number" style={{ width: "50%" }} placeholder="Number of Copies" value={copies} onChange={handleCopies}></input>
				</div>

				//------------------Both Sides-------------------------------

				<div className="form-group">
					<label for="bothSides">Print on Both Sides</label>
					<select name="bothSides" className="form-control" style={{ width: "50%" }} id="paperSize" value={both} onChange={handleBoth}>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
				</div>

				//------------------Printing Details-------------------------------

				<div class="form-group">
					<label for="printingDetails">Printing Details</label>
					<textarea name="printingDetails" class="form-control" rows="3" style={{ width: "50%" }} placeholder={printingSpeci_ph} value={details} onChange={handleDetails}></textarea>
				</div>


				//---------------Submit----------------------------
				<div className="form-group">
					<button type="submit" class="btn btn-primary btn-block" onClick={handleSubmit}>Submit</button>
				</div>
			</form>
		</div>
	);
}

export default Printer;
