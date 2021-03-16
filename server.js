const express = require("express");
const bodyParser = require('body-parser')
const next = require('next');
const { defaults: pool } = require("./lib/queries");

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const server = express()

server.use(bodyParser.json())
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

server.post("/registro", function (req, res) {
    const {nombre, apellidos, correo, nacimiento, genero} = req.body;
    pool.query("insert into personas (nombre, apellidos, correo, nacimiento, genero) values ($1, $2, $3, $4, $5) RETURNING *;", [
        nombre, apellidos, correo, nacimiento, genero
    ], (error, results) => {
        if (error) {
            //console.log(error);
            res.status(400).send({alert: {variant: "danger", msg: "No se puedo guardar los datos. "+ error.detail}});
        } else {
            res.status(201).send({alert: {variant: "success", msg: "Se registró correctamente"}, ele: results?.rows[0]});
        }
    });
});

app.prepare().then(() => {
    server.get('*', (req, res) => {
        //console.log(res.locals)
        return handle(req, res)
    })
    server.listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})