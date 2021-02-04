const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(
    session({
      key: "userId",
      secret: "subscribe",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24,
      },
    })
  );

const db = mysql.createConnection({
    user: "root", 
    host: "localhost", 
    password: "Parsley030993", 
    database: "Loginsystem",
});

app.post("/register", (req,res) =>{
    const Username = req.body.username
    const Password = req.body.password

    bcrypt.hash(Password,saltRounds, (err, hash) =>{
        if(err){
            console.log(err)
        }
        db.query(
        "INSERT INTO users (username, password) VALUES (?,?)",
        [Username, hash],
        (err, result) => {
          console.log(err);
        }
      );
    });
});


app.get("/login", (req,res)=>{
    if (req.session.user){
        res.send({loggedIn:true, user:req.session.user});
    }else{
        res.send({loggedIn: false});
    }
});

 app.post("/login", (req, res) => {
     const Username = req.body.username;
     const Password = req.body.password;

     db.query(
         "SELECT * FROM users WHERE Username = ?;",
         Username,
         (err, result) =>{
             if (err) {
                 res.send({ err: err });
             }
             if (result.length > 0) {
                bcrypt.compare(Password, result[0].Password, (error, response)=>{
                    if(response){
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                    }else{
                         res.send({message: "Incorrect Username/Password"});
                         }
                     });
                 }else{
                     res.send({message: "User Doesn't exist"});
                 }
             }
     );

 });

app.listen(3001, () =>{
    console.log("running server");
});
