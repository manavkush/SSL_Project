const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const _ = require('lodash');
const { forEach } = require("lodash");

const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/lib_manage", { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

let gfs;
db.once("open", function () {
    gfs = Grid(db.db, mongoose.mongo);
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


const issuedBookSchema = new mongoose.Schema({
    issued_rollno: String,
    issued_ISBN: String
});
const Issue = new mongoose.model("Issue", issuedBookSchema);
// const firstIssue = new Issue({
//     issued_rollno: student1.student_rollno,
//     issued_ISBN: book1.book_ISBN
// });
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
// Issue.find({}, function (err, found) {
//     if (!err) {
//         if (found.length === 0) {
//             firstIssue.save();
//         }
//     }
//     else console.log(err);
// })




var bname = "physi";
bname = (_.toLower(bname));
// console.log(bname);

//================================================== Searching a book ==================================
app.post("/search", function (req, res) {
    const bname = _.lowerCase(req.body.book_name);
    var ret = [];
    Lib.find({ 'book.book_name': { $regex: bname } }, function (err, found) {
        if (err) console.log(err);
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
                ret.push(obj);
            });
            res.send(ret);
        }
    });
});


//================================================= Add a book to library ==============================
app.post("/addBook", function (req, res) {
    const bISBN = _.toUpper(req.body.book_ISBN);
    Book.findOne({ book_ISBN: bISBN }, function (err, found) {
        var returnObject = {
            Status: false,
            StatusMessage: ""
        };

        if (!err) {

            if (!found) {
                const incrementValue = req.body.count;
                const inbook = new Book({
                    book_name: req.body.book_name,
                    book_author: req.body.book_author,
                    book_ISBN: req.body.book_ISBN,
                    book_genre: req.body.book_genre,
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
                Lib.findOneAndUpdate({ 'book.book_ISBN': bISBN }, { $inc: { 'count': incrementValue } }, { new: true }, function (err, updated) {
                    if (err) {
                        console.log(err);
                        returnObject.StatusMessage = err;
                    } else {
                        console.log(updated);
                        returnObject.Status = true;
                    }
                });
            }
        }
        else {
            returnObject.StatusMessage = err;
        }

        res.send(returnObject);
    });

});


//============================================== Issue a book ==========================================
app.post("/issue", function (req, res) {
    var returnObject = {
        Status: false,
        StatusMessage: ""
    };
    const SRollNo = req.body.student_rollno;
    const IssuedBook = req.body.book_ISBN;
    Lib.findOneAndUpdate({ 'book.book_ISBN': IssuedBook }, { $inc: { 'count': -1 } }, { new: true }, function (err, updated) {
        if (err) {
            console.log(err);
            returnObject.StatusMessage = err;
        }
        else {
            returnObject.Status = true;
            console.log(updated);
        }
    });
    const NewIssue = new Issue({
        issued_rollno: SRollNo,
        issued_ISBN: IssuedBook
    });
    NewIssue.save();
    res.send(returnObject);
});


//========================================== Returning a book ==========================================
app.post("/return", function (res, req) {
    var returnObject = {
        Status: false,
        StatusMessage: "",
    };
    const returned_ISBN = req.body.book_ISBN;

    Lib.findOneAndUpdate({ 'book.book_ISBN': returned_ISBN }, { $inc: { 'count': -1 } }, { new: true }, function (err, updated) {
        if (err) {
            console.log(err);
            returnObject.StatusMessage = err;
        }
        else {
            returnObject.Status = true;
            console.log(updated);
        }
    });
    Issue.findOneAndDelete({ 'issued_ISBN': returned_ISBN }, function (err) {
        if (err) {
            returnObject.StatusMessage = err;
        }
        else {
            returnObject.Status = true;
            console.log("Deleted the entry");
        }
    });
    res.send(returnObject);
});


// res.send(returnObject)

// const SRollNo = "190010034";
// const IssuedBook = "2222";
// Lib.find({ 'book.book_ISBN': IssuedBook }, function (err, found) {
//     console.log(found);

// })

//----------------------------Printing Files-------------------------

// Create storage engine
const storage = new GridFsStorage({
    url: "mongodb://localhost:27017/lib_manage",
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
});

const upload = multer({ storage });

console.log("Checking");


app.post('/upload',(req,res)=>{
    console.log("Testing");
    console.log(req.body);
})



let port = process.env.PORT;
if (port == null || port === "") {
    port = 5000;
}

app.listen(port, function () {
    console.log("Server started sucessfully");
});
