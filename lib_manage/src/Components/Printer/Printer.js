import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Printer.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";


function Printer(props) {

	const printingSpeci_ph = "Pages 1 - 4 EXCEPT Page 3 (Custom Text) ";
	const genInstruc_ph = "General Instructions about the Print";
	return (
		<div className="container">
			<h1 className="header">Hassle free Printing</h1>

			<form action="/printmg/uploadDoc" className="formClass" method="POST" encType = "multipart/form-data">
				//-----------File----------------------------------------
				{/* <div className="form-group">
					<label for="uploadingFiles " >Upload Files to Print</label>
					<br />
					<input type="file" name="file" id = "file"/>
				</div> */}

				//-----------Color-------------------------------------
				<div className="form-group">
					<label for="color">Color</label>
					<select name = "color" className="form-control" style={{ width: "50%" }} id="color">
						<option value="b/w">Black and White</option>
						<option value="color">Color</option>
					</select>
				</div>
				//---------------Size---------------------------------

				<div className="form-group">
					<label for="paperSize">Paper Size</label>
					<select name="size" className="form-control" style={{ width: "50%" }} id="paperSize">
						<option value="A3">A3</option>
						<option value="A4">A4</option>
						<option value="A5">A5</option>
					</select>
				</div>

				//---------------Copies-------------------------------------
				<div className="form-group">
					<label for="copies">Copies</label>
					<input name="copies" className="form-control" type="number" style={{ width: "50%" }} placeholder="Number of Copies"></input>
				</div>
				
				//------------------Both Sides-------------------------------
				<div className="form-group">
					<label for="bothSides">Print on Both Sides</label>
					<select name="bothSides" className="form-control" style={{ width: "50%" }} id="paperSize">
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
				</div>
				//------------------Printing Details-------------------------------

				<div class="form-group">
					<label for="printingDetails">Printing Details</label>
					<textarea name="printingDetails" class="form-control" rows="3" style={{ width: "50%" }} placeholder={printingSpeci_ph}></textarea>
				</div>

				//------------------Gen Instructions-------------------------------
				<div class="form-group">
					<label for="genInstruc">General Instructions</label>
					<textarea name="genInstruc" class="form-control" rows="3" style={{ width: "50%" }} placeholder={genInstruc_ph}></textarea>
				</div>

				//---------------Submit----------------------------
				<div className="form-group">
					<button className="btn btn-primary" type="submit" value="Submit" >Submit</button>
				</div>
			</form>
		</div>
	);
}

// function Printer(props){

// 	return(
// 		<div>
// 			<form action="/testing" method="POST">
// 				<input type="submit" value="Submit">Submit</input>
// 			</form>
// 		</div>
// 	);
// }
export default Printer;
