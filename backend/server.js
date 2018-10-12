const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const signature = "secretKey";
const pg = require('pg-promise')();
const bcrypt = require('bcrypt');
const saltRounds = 10;

//COORS stuff
let allowCORS = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
}
app.use(allowCORS);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({     
  extended: true
}));

const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'capstone',
  user: 'stevenberk'
};

const db = pg(dbConfig);

//most pages use isloggedin to test for auth
app.get("/isloggedin", verifyToken, (req, res)=> {
  let payload ;
  try{
   payload = jwt.verify(req.token, signature)
  }catch(error){ 
    }
  if(payload){
    res.send("yes")
  }else{
    res.send("not logged in")
    }   
})

//seller submissions 
app.post("/sellersubmissions", (req, res)=> {
  db.query(`INSERT INTO posts (amount,currency,location,valueinusd,selleremail,sellername,sellerid) VALUES
  ('${req.body.amount}','${req.body.currency}','${req.body.location}','${req.body.valueinusd}','${req.body.selleremail}','${req.body.sellername}','${req.body.sellerid}') RETURNING postid;`)
  .then(()=> {res.send("ok")})
})

//used to seed state in login page 
app.post('/seedaccountpage', (req, res) =>{
  db.query(`SELECT * FROM posts WHERE selleremail = '${req.body.email}';`)
  .then((results) => {
    res.send(JSON.stringify(results))}
  )
})

// buyer page search querries 
app.post("/querysubmissions", (req, res) => {
  db.query(`SELECT * FROM posts  WHERE location = '${req.body.location}'  AND currency = '${req.body.currency}';`)
  .then((results) => {
    res.send(JSON.stringify(results))}
  )
})


//delete a posting
app.post('/deletepost', (req, res) =>{
  db.query(`DELETE FROM posts WHERE postid ='${req.body.id}' ;`)
    .then(()=>res.send("deleted"))
})

//add new user from signup page 
app.post('/createuser', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds)
   .then(function(hashedpassword) {
   db.query(`INSERT INTO users (firstname,lastname,email,password) VALUES
   ('${req.body.firstname}','${req.body.lastname}','${req.body.email}','${hashedpassword}') RETURNING id;`)
   .then(()=> res.send("ok"))
 })
 }) 
 

//// Login Auth 
app.post("/querylogin", (req, res) => {
  db.one(`SELECT password FROM users WHERE email = '${req.body.email}';`).then((password)=>{
    bcrypt.compare(req.body.password, password.password).then(function(result) {
      if(result === true){
        db.one(`SELECT id, firstname, lastname, email FROM users WHERE email = '${req.body.email}' AND password = '${password.password}';`)
        .then((user)=> { 
          jwt.sign({email: user.email, firstname: user.firstname, lastname: user.firstname, userid: user.id}, signature, {expiresIn: '2 days'}, (err, token)=> {
            res.json({
                token, email: user.email, firstname: user.firstname, lastname: user.firstname, userid: user.id
          });
        });
      })
      }else{
        console.log("no dice beans and rice")
      }
    })
  })  
});
 
function verifyToken(req, res, next){
  let bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined'){
    let bearer = bearerHeader.split(' ');
    let bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }else{
    res.sendStatus(403);
  }
}

app.listen(3006)