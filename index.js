const express = require("express");
const exphbs = require("express-handlebars");
const mysql2 = require("mysql2");

const app = express();

// Confira o middleware para verificar solicitações com o tipo conteúdo body
app.use(
  express.urlencoded({
    extended: true
  })
)

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
});

// cadastrando
app.post("/lista/insertProdutos",(req, res) => {
  const produto = req.body.produto;
  const preco = req.body.preco;
  const descricao = req.body.descricao;

  const sql = `INSERT INTO produtos (produto, preco, descricao) values ('${produto}', '${preco}', '${descricao}')`;
  
  conn.query(sql, function (err) {
    if (err) {
      console.log("erro", err);
      return false;
    }

    res.redirect("/lista");
  })
});

// Listando e buscando por ID
app.get('/lista/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM produtos WHERE id = ${id}`;

  conn.query(sql, function(err, data) {
    if (err) {
      console.log(err);
    }

    const detalhes = data[0];

    res.render('detalhes', { detalhes })
  });
});

// removendo item
app.post('/lista/remove/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE from produtos WHERE id = ${id}`;

  conn.query(sql, function(err) {
    if (err) {
      console.log(err);
    }

    res.redirect('/lista');
  })
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
