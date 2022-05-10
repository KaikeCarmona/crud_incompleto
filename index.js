
//Importar as bibliotecas
const Sequelize = require("sequelize");
const express = require("express");
const app = express();

app.use(express.json());

//Variáveis
const port = 3000;

//Conectar banco
const bancodados = new Sequelize("ecomerce", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

//Criar a tabela (Modelo/Model -> M(MODEL)VC)
const dados = bancodados.define("dados", {
  codigo_p: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  produto: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  qtd_estoque: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  qtd_venda: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  valor_unitario: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  data_insercao: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

//Verbos HTTP CRUD
//Post -> Create
app.post("/", async function (req, res) {
  let novoDado = req.body;
  await bancodados.sync();
  await dados.create(novoDado);
  res.status(201).send("Dado Criado");
});

//Get -> Read
app.get("/", async function (req, res) {
  await bancodados.sync();
  let dado = await dados.findAll({ raw: true });
  res.status(200).json(dado);
});

app.get("/:id", async function (req, res) {
  let index = req.params.id;
  await bancodados.sync();
  let dado = await dados.findByPk(index);
  res.status(200).json(dado);
});

//Put -> Update
app.put("/:id", async function (req, res) {
  let index = req.params.id;
  let dadoAtualizado = req.body;
  await bancodados.sync();
  await dados.update(dadoAtualizado, { where: { codigo_p: index } });
  res.status(200).send("Dado atualizado");
});

//Delete -> Delete
app.delete("/:id", async function (req, res) {
  let index = req.params.id;
  await bancodados.sync();
  await dados.destroy({ where: { codigo_p: index } });
  res.status(200).send("Dado deletado");
});

//Servidor
app.listen(port, () => {
  console.log("Servidor rodando ...");
});
