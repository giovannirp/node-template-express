const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();

// Configura o middleware para analisar solicitações com o tipo de conteúdo 'application/json'
app.use(express.json())

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  // res.send("Mandando info na tela");
  res.render("home")
});

//listando produtos
app.get("/lista", (req, res) => {
  const sql = "SELECT * from produtos"

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const lista = data;
    //console.log(lista);
    res.render("listas", { lista })
  });
})

const conn = mysql.createConnection({
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
