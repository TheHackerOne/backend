const express = require('express');
const path = require("path");
const app = express();
const ConnectDB = require("./config/db");

//Connect to database
ConnectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})

app.use('/instaFeed', require("./routes/instaAPI"));
app.use('/blog', require("./routes/blogPost"))
app.use('/', (req, res, next) => {
  res.send("NHI.......LEKIN.....VO.....ME..... ");
})

const PORT = process.env.PORT||5000;

// if(process.env.NODE_ENV === "production"){

//   app.use(express.static('client/build'));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   })
// }

app.listen(PORT, () => {
  console.log(`Succesfully connected to port ${PORT}`)
})

// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"