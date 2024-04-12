const express = require("express");
const exphbs = require("express-handlebars");
const mysql2 = require("mysql2");

const app = express();

// Configura o middleware para analisar solicitações com o tipo de conteúdo 'application/json'
app.use(express.json())

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  // res.send("Mandando info na tela");
  res.render("home")
});

const conn = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mercadinho"
});

conn.connect(function (err) {
  if (err) {
    console.log(err)
  }

  console.log("Conectou ao MYSQL");
  app.listen(3000);
})
