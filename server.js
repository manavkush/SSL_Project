//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const _ = require('lodash');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

mongoose.connect("mongodb://localhost:27017/lib_manage", { useNewUrlParser: true });

// const itemSchema = {
//     name: String
// };
const bookSchema = new mongoose.Schema({
    book_name: String,
    book_author: String,
    book_ISBN: String,
    book_genre: String
    // book_count: Number,
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
book1.save();
book2.save();


const libSchema = new mongoose.Schema({
    book: bookSchema,
    count: Number
});
const Lib = new mongoose.model("Lib", libSchema);
const entry1 = new Lib({
    book: book1,
    count: 2
});
const entry2 = new Lib({
    book: book2,
    count: 3
});
entry1.save();
entry2.save();


const studentSchema = new mongoose.Schema({
    student_name: String,
    student_rollno: Number,
    student_due: Number,
    book_issued: bookSchema
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
student2.save();
student1.save();

const issuedBookSchema = new mongoose.Schema({
    issued_rollno: String,
    issued_ISBN: String
});

const Issue = new mongoose.model("Issue", issuedBookSchema);
const firstIssue = new Issue({
    issued_rollno: student1.student_rollno,
    issued_ISBN: book1.book_ISBN
});

firstIssue.save();

var count;
Lib.findOne({ book_ISBN: "2222" }, function (err, foundBook) {
    count = foundBook.count
})


Issue.findOne({ issued_ISBN: "2222" }, function (err, found) {
    if (err)
        console.log(err)
    else {
        console.log(found);
    }
});

// Lib.findOneAndUpdate({ book_ISBN: "2222" }, { count: bcount - 1 });





// const Item = mongoose.model("Item", itemSchema);


// const item1 = new Item({
//     name: "Welcome to todolist"
// });
// const item2 = new Item({
//     name: "Hit + to add a new item"
// });
// const item3 = new Item({
//     name: "<-- Hit this to delete an item"
// });

// const defaultItems = [item1, item2, item3];

// const listSchema = {
//     name: String,
//     items: [itemSchema]
// };

// const List = mongoose.model("List", listSchema);


// app.get("/", function (req, res) {

//     Item.find({}, function (err, results) {

//         if (results.length == 0) {
//             Item.insertMany(defaultItems, function (err) {
//                 if (err) console.log(err);
//                 else console.log("Array inserted");
//             });

//             res.redirect("/");
//         }
//         else {
//             res.render("list", { listTitle: "Today", newListItems: results });
//         }
//     })


// });

// app.post("/", function (req, res) {

//     const item = req.body.newItem;
//     const listName = req.body.list;
//     console.log(listName);
//     console.log(item);
//     const newItem = new Item({
//         name: item
//     });

//     if (listName === "Today") {
//         newItem.save();
//         res.redirect("/");
//     } else {
//         List.findOne({ name: listName }, function (err, foundList) {
//             foundList.items.push(newItem);
//             foundList.save();
//             res.redirect("/" + listName);
//         })
//     }

// });

// app.post("/delete", function (req, res) {

//     const checkedItemId = req.body.checkbox;
//     const listName = req.body.listName;
//     console.log(listName);


//     if (listName === "Today") {
//         Item.findByIdAndDelete(checkedItemId, function (err) {
//             if (err) console.log(err);
//             else console.log("Deleted")
//         });
//         res.redirect("/");
//     } else {
//         List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedItemId } } }, function (err, foundItem) {
//             if (!err) {
//                 console.log(foundItem);
//                 res.redirect("/" + listName);
//             }
//             else console.log(err);
//         });
//     }

// })

// var x = 1;
// app.get('/:custListName', function (req, res) {
//     const customListName = (req.params.custListName);

//     List.findOne({ name: customListName }, function (err, result) {
//         if (!err) {
//             // console.log(result);
//             if (!result) {
//                 // List doesn't exist
//                 console.log(x + " " + customListName);
//                 x = x + 1;
//                 const customList = new List({
//                     name: customListName,
//                     items: defaultItems
//                 });
//                 customList.save();

//                 res.redirect("/" + customListName);
//             }
//             else {
//                 // List exists
//                 // console.log(result);
//                 console.log(x);
//                 res.render("list", { listTitle: customListName, newListItems: result.items });
//             }
//         }
//     });
// });

// app.get("/about", function (req, res) {
//     res.render("about");
// });

let port = process.env.PORT;
if (port == null || port === "") {
    port = 5000;
}

app.listen(port, function () {
    console.log("Server started sucessfully");
});
