const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');
const { forEach } = require("lodash");
var cors = require('cors')
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// Enables the file uploading
app.use(fileUpload());

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));


mongoose.connect("mongodb://localhost:27017/lib_manage", { useNewUrlParser: true });
var conn = mongoose.connection;
conn.on("error", console.error.bind(console, "connection error:"));

let gfs;
conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});


console.log("Server Spinnning !!!!");

const bookSchema = new mongoose.Schema({
    book_name: String,
    book_author: String,
    book_ISBN: String,
    book_genre: String
});
const Book = new mongoose.model("Book", bookSchema);
const book1 = new Book({
    book_name: "CLRS",
    book_author: "Cormen",
    book_ISBN: "2222",
    book_genre: "Algo"
})
const book2 = new Book({
    book_name: "Physics",
    book_author: "HCV",
    book_ISBN: "3333",
    book_genre: "IIT"
})

const libSchema = new mongoose.Schema({
    book: bookSchema,
    count: Number
});
const Lib = new mongoose.model("Lib", libSchema);
const entry1 = new Lib({
    book: book1,
    count: 3
});
const entry2 = new Lib({
    book: book2,
    count: 3
});

const studentSchema = new mongoose.Schema({
    student_name: String,
    student_rollno: Number,
    student_due: Number,
    // book_issued: bookSchema
});
const Student = new mongoose.model("Student", studentSchema);
const student1 = new Student({
    student_name: "Manav",
    student_rollno: 190010023,
    student_due: 23
});
const student2 = new Student({
    student_name: "Pratik",
    student_rollno: 190010034,
    student_due: 34
});
const student3 = new Student({
    student_name: "Soni",
    student_rollno: 190030002,
    student_due: 100
});

// student3.save();


const issuedBookSchema = new mongoose.Schema({
    issued_rollno: String,
    issued_ISBN: String
});
const Issue = new mongoose.model("Issue", issuedBookSchema);
const firstIssue = new Issue({
    issued_rollno: student1.student_rollno,
    issued_ISBN: book1.book_ISBN
});
Book.find({}, function (err, found) {
    if (!err) {
        if (found.length === 0) {
            book1.save();
            book2.save();
        }
    }
    else console.log(err);
})
Lib.find({}, function (err, found) {
    if (!err) {
        if (found.length === 0) {
            entry1.save();
            entry2.save();
        }
    }
    else console.log(err);
})
Student.find({}, function (err, found) {
    if (!err) {
        if (found.length === 0) {
            student2.save();
            student1.save();
        }
    }
    else console.log(err);
})
Issue.find({}, function (err, found) {
    if (!err) {
        if (found.length === 0) {
            firstIssue.save();
        }
    }
    else console.log(err);
})





// var bname = "physi";
// bname = (_.toLower(bname));
// console.log(bname);

//================================================== Searching a book ==================================
app.post("/search", function (req, res) {
    // const bname = _.lowerCase(req.body.book_name);
    var bname = _.toUpper(req.body.book_name);
    console.log(bname);

    Lib.find({ 'book.book_name': { $regex: bname } }, function (err, found) {
        var returnObject = {
            Status: true,
            Books: [],
            StatusMessage: "Found the books"
        }
        console.log(found);
        if (err) {
            console.log(err);
            res.send({
                Status: false,
                Books: [],
                StatusMessage: err
            });
        }
        if (found.length === 0) {
            res.send({
                Status: false,
                Books: [],
                StatusMessage: "No books found"
            });
        }
        else {
            console.log(found);
            found.forEach(function (item) {
                var obj = {
                    "book_name": _.startCase(item.book.book_name),
                    "book_ISBN": item.book.book_ISBN,
                    "book_author": item.book.book_author,
                    "book_genre": item.book.book_genre,
                    "book_count": item.count
                }
                returnObject.Books.push(obj);
            });
            res.send(returnObject);
        }
    });
});


//================================================= Add a book to library ==============================
app.post("/addBook", function (req, res) {
    console.log("entered");
    const bISBN = _.toUpper(req.body.book_ISBN);
    Book.findOne({ book_ISBN: bISBN }, function (err, found) {
        var returnObject = {
            Status: true,
            StatusMessage: "Added the book to the library"
        };

        if (!err) {

            if (!found) {
                const incrementValue = req.body.count;
                const inbook = new Book({
                    book_name: _.toUpper(req.body.book_name),
                    book_author: _.toUpper(req.body.book_author),
                    book_ISBN: _.toUpper(req.body.book_ISBN),
                    book_genre: _.toUpper(req.body.book_genre),
                })
                inbook.save();
                const libinsert = new Lib({
                    book: inbook,
                    count: incrementValue
                })
                libinsert.save();
                console.log("Inserted");
                returnObject.Status = true;
            }
            else {
                const incrementValue = req.body.count;
                Lib.findOneAndUpdate({ 'book.book_ISBN': bISBN }, { $inc: { 'count': incrementValue } }, { new: true }, (err, updated) => {
                    if (err) {
                        res.send({
                            Status: false,
                            StatusMessage: err
                        });
                    } else {
                        console.log(updated);
                    }
                });
            }
        }
        else {
            returnObject.Status = false;
            returnObject.StatusMessage = err;
        }

        res.send(returnObject);
    });

});
//================================================= Remove a book from library ==============================
app.post("/removeBook", function (req, res) {
    var returnObject = {
        Status: true,
        StatusMessage: ""
    };
    const bISBN = _.toUpper(req.body.book_ISBN);
    const incrementValue = req.body.count;
    Lib.findOne({ 'book.book_ISBN': bISBN }, function (err, found) {
        if (!err) {
            if (found) {
                if (found.count <= incrementValue) {
                    Lib.findOneAndDelete({ 'book.book_ISBN': bISBN }, (err, found) => {
                        if (err) {
                            res.send({
                                Status: false,
                                StatusMessage: err
                            });
                        }
                    });
                    Book.findOneAndDelete({ 'book_ISBN': bISBN });
                }
                else {
                    Lib.findOneAndUpdate({ 'book.book_ISBN': bISBN }, { $inc: { count: -1 * incrementValue } }, { new: true }, (err, updated) => {
                        console.log(updated);
                    });
                }
            } else {
                res.send({
                    Status: false,
                    StatusMessage: "Book not found"
                });
            }
            res.send(returnObject);
        }
        else {
            res.send({
                Status: false,
                StatusMessage: err
            });
        }
    });
    res.send(returnObject);
});


//============================================== Issue a book ==========================================
app.post("/issue", function (req, res) {
    console.log("Issuing")
    var returnObject = {
        Status: true,
        StatusMessage: "Issued the book"
    };
    const SRollNo = _.toUpper(req.body.student_rollno);
    const IssuedBook = _.toUpper(req.body.book_ISBN);
    Lib.findOneAndUpdate({ 'book.book_ISBN': IssuedBook }, { $inc: { 'count': -1 } }, { new: true }, function (err, updated) {

        if (err) {
            console.log(err);
            res.send({
                Status: false,
                StatusMessage: err
            });
        }
        else if (!updated) {
            res.send({
                Status: false,
                StatusMessage: "Couldn't find the book"
            });
        }
        else {
            returnObject.Status = true;
            console.log(updated);
            const NewIssue = new Issue({
                issued_rollno: SRollNo,
                issued_ISBN: IssuedBook
            });
            NewIssue.save();
            res.send(returnObject);
        }
    });

});


//========================================== Returning a book ==========================================
app.post("/return", function (req, res) {
    console.log("REturning a book")
    var returnObject = {
        Status: true,
        StatusMessage: "Book returned",
    };
    var returned_ISBN = _.toUpper(req.body.book_ISBN);
    var student_rollno = _.toUpper(req.body.student_rollno);

    Issue.findOneAndDelete({ 'issued_ISBN': returned_ISBN, 'issued_rollno': student_rollno }, function (err, deleted) {
        console.log(deleted);
        if (err) {
            res.send({
                Status: false,
                StatusMessage: err,
            });
            return;
        }
        else if (!deleted) {
            res.send({
                Status: false,
                StatusMessage: "Couldn't find the entry"
            });
        } else {
            Lib.findOneAndUpdate({ 'book.book_ISBN': returned_ISBN }, { $inc: { 'count': 1 } }, { new: true }, function (err, updated) {
                if (err) {
                    console.log(err);
                    res.send({
                        Status: false,
                        StatusMessage: err,
                    });
                    return;
                }
                else if (!updated) {
                    res.send({
                        Status: false,
                        StatusMessage: "Didn't find the book"
                    });
                }
                else {
                    res.send({
                        Status: true,
                        StatusMessage: "Book returned",
                    });
                }
            });

        }
    });
});

//==================================== Adding a document for printing ==========================

app.post("/printQuery", function (req, res) {
    console.log("Entered");
    console.log(req.body);
    var returnObject = {
        Status: true,
        StatusMessage: "Successfully Added the document to the queue",
    };
    if (!req.files) {
        returnObject.Status = false;
        returnObject.StatusMessage = "No file uploaded";
    }
    else {
        const uploadedFile = req.files.file;
        const fileName = uploadedFile.name;

        uploadedFile.mv('./uploads/' + fileName);
    }
    res.send(returnObject);
});

//----------------------------Printing Files-------------------------

// Create storage engine
// const storage = new GridFsStorage({
//     url: "mongodb://localhost:27017/lib_manage",
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err, buf) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 const filename = buf.toString('hex') + path.extname(file.originalname);
//                 const fileInfo = {
//                     filename: filename,
//                     bucketName: 'uploads'
//                 };
//                 resolve(fileInfo);
//             });
//         });
//     }
// });

// const upload = multer({ storage });

console.log("Checking");
const printerSchema = new mongoose.Schema({
    link : String,
    color : String,
    size : String,
    copies : Number,
    both : String,
    details : String
});

const Printer = new mongoose.model("Print", printerSchema);

//Print Cost left

app.post('/upload', (req, res) => {
    console.log("Testing");
    let returnObj = {
        status :false,
        statusMsg : ""
    }
    if(req.body.link==""){
        returnObj.statusMsg = "Ops! No File Found";
    }
    else if(req.body.copies ===0){
        returnObj.statusMsg = "0 copies cannot be printed ;)";
    }
    else{
        returnObj.status =true;
        
        let returnObjAdmin = {
            link : req.body.link,
            color : req.body.color,
            size : req.body.size,
            copies : req.body.copies,
            both : req.body.both,
            details : req.body.details
        }
        const newPrint = new Printer({
            link : req.body.link,
            color : req.body.color,
            size : req.body.size,
            copies : req.body.copies,
            both : req.body.both,
            details : req.body.details
        })
        newPrint.save();

        let rollNO = req.body.rollno;
        let perPage = 0;
        if(returnObj.color ==="color"){
            perPage = 5;
        }
        else{
            perPage = 2;
        }


    }
    res.send(returnObj);
})

app.post('/printAdmin',(req,res)=>{
    
    Printer.find({},(err,found)=>{
        let returnObj = {
            status : false,
            statusMsg : "",
            printArr : []
        }
        
        if(err){
            returnObj.statusMsg = err;
        }
        else{
            if(found.length ===0){
                returnObj.statusMsg = "No Pending Prints";
            }
            else{
                returnObj.status= true;
                returnObj.printArr = found;
            }
        }
        res.send(returnObj);

    })
})
//For printing and deleting the printed query

app.post("/deleteAdmin",(req,res)=>{
    const ID = req.body.deleteId;
    const rollno = req.body.rollno;
    const cost = req.body.cost;
    
    Printer.findOneAndDelete({_id : ID} ,(err,deleted)=>{
        let returnObj = {
            status : false,
            statusMsg : "",
        }
        console.log(deleted);
        if(err){
            returnObj.statusMsg = "Not Able to delete";
        }
        else if(!deleted){
            returnObj.status = false;
            returnObj.statusMsg = "Could Not Find !!";
        }
        else{
            returnObj.status = true;
            returnObj.statusMsg = "Deleted!!";

            Student.findOneAndUpdate({student_rollno : rollno},{$inc : {student_due : cost}},{new : true},
                (err,updated)=>{
                    console.log(updated);
                })
        }

        res.send(returnObj);
    })
})

app.post("/getProfile",(req,res)=>{
    const rollno = req.body.rollno;
    // console.log(rollno);

    Student.findOne({student_rollno:rollno},(err,found)=>{
        let returnObj = {
            status : false,
            statusMsg : "",
        }
        
        if(err){
            returnObj.statusMsg = err;
        }
        if(!found){
            returnObj.statusMsg = "Error 404,Student Not Found!!";
        }
        else{
            returnObj.status = true;
            returnObj.student_name = found.student_name;
            returnObj.student_rollno = found.student_rollno;
            returnObj.student_due =  found.student_due;
            let dig = rollno[4];
            if(dig=="1"){
                returnObj.student_branch = "CSE";
            }
            else if(dig=="2"){
                returnObj.student_branch = "EE";
                
            }
            else if(dig=="3"){
                returnObj.student_branch = "ME";
            }
        }
        res.send(returnObj);
    })
})




let port = process.env.PORT;
if (port == null || port === "") {
    port = 5000;
}

app.listen(port, function () {
    console.log("Server started sucessfully");
});
