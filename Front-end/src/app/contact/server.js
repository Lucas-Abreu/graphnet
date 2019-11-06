const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");


const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Servidor Iniciado, porta 3000.");
});

app.get("/", (req, res) => {
  res.send(
    ""
  );
});

app.post("/sendmail", (req, res) => {
  let user = req.body;
  sendMail(user, info => {
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'graphnet.ceo@gmail.com',
      pass: '(trocar a senha fora do GitHub)'
    }
  });

  let mailOptions = {
    from: '"GraphNet" graphnet.ceo@gmail.com', // sender address
    to: 'graphnet.ceo@gmail.com', // list of receivers
    subject: ` GraphNet - Contato, Categoria: ${user.categoria}`, // Subject line
    html: `<h3>Nome: ${user.name}</h3><p>
    <h3>Email: ${user.email}</h3><p>
    <h3>Descrição do Problema: ${user.descricao}</p>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}