const express = require("express");

const cors = require("cors");
const cookieSession = require("cookie-session");
 

const app = express();

const db = require("./app/models");

const Role = db.role;

db.mongoose

  .connect(db.url, {

    useNewUrlParser: true,

    useUnifiedTopology: true

  })

  .then(() => {

    console.log("Connected to the database!");

  })

  .catch(err => {

    console.log("Cannot connect to the database!", err);

    process.exit();

  });
 
  function initial() {

    Role.estimatedDocumentCount((err, count) => {
  
      if (!err && count === 0) {
  
        new Role({
  
          name: "user"
  
        }).save(err => {
  
          if (err) {
  
            console.log("error", err);
  
          }
  
   
  
          console.log("added 'user' to roles collection");
  
        });
  
   
  
        new Role({
  
          name: "moderator"
  
        }).save(err => {
  
          if (err) {
  
            console.log("error", err);
  
          }
  
   
  
          console.log("added 'moderator' to roles collection");
  
        });
  
   
  
        new Role({
  
          name: "admin"
  
        }).save(err => {
  
          if (err) {
  
            console.log("error", err);
  
          }
  
   
  
          console.log("added 'admin' to roles collection");
  
        });
  
      }
  
    });
  
  }

var corsOptions = {

  // origin: ["http://localhost:8081"],
  origin: ["https://resonant-bubblegum-4471dd.netlify.app"],
  //https://resonant-bubblegum-4471dd.netlify.app/home
  credentials: true

};

 

//app.use(cors(corsOptions));
app.use(
  cors({
  credentials: true,
  origin: ["http://localhost:8081"],
  })
  );
  

 

// parse requests of content-type - application/json

app.use(express.json());

 

// parse requests of content-type - application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: true }));


app.use(
  cookieSession({
  name: "Blessing-session",
  secret: "COOKIE_SECRET", // should use as secret environment variable
  httpOnly: true
  }));

require("./app/routes/product.routes")(app);

require("./app/routes/category.routes")(app);

// simple route

app.get("/", (req, res) => {

  res.json({ message: "Welcome to SportStore application." });

});

require('./app/routes/auth.routes')(app);

require('./app/routes/user.routes')(app);

require("./app/routes/product.routes")(app);

require("./app/routes/category.routes")(app);

// set port, listen for requests

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {

  console.log(`Server is running on port http://localhost:${PORT}.`);

});





/*
 *git:
 echo "# SStore001_backend" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/SIMARPREETKAURKANG/SStore001_backend.git
git push -u origin main
…or push an existing repository from the command line
git remote add origin https://github.com/SIMARPREETKAURKANG/SStore001_backend.git
git branch -M main
git push -u origin main
*/