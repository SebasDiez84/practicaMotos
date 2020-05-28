const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/mantenimiento");

/**
 * Obtener los mantenimientos
 */
router.get("/mantenimiento", (req, res) => {
  let filtros = req.query;
  _controlador
    .consultarMantenimiento(filtros)
    .then((respuestaDB) => {
      let registros = respuestaDB;
      res.send({
        ok: true,
        info: registros,
        mensaje: "Consulta exitosa",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Consultar el mantenimiento por usuario
 */
router.get("/mantenimientos/:placa/:id_mecanico?", (req, res) => {
  let placa = req.params.placa;
  let id_mecanico = req.params.id_mecanico;
  _controlador
    .consultarMantenimiento({ placa, mecanico })
    .then((respuestaDB) => {
      let registros = respuestaDB.rows;
      let mensaje =
        registros.length > 0 ? "Consulta exitosa" : "No existe registro me mantenimiento";
      res.send({ ok: true, info: registros, mensaje });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Almacenar mantenimiento
 */
router.post("/mantenimientos", (req, res) => {
  try {
    let info_mantenimientos = req.body;
    _controlador
      .guardarMantenimiento(info_mantenimientos)
      .then((respuestaDB) => {
        res.send({
          ok: true,
          mensaje: "Correctamente almacenado",
          info: info_mantenimientos,
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

/**
 * Modifica un mantenimiento
 */
router.put("/mantenimientos/:placa/:id_mecanico", (req, res) => {
  let placa = req.params.placa;
  let id_mecanico = req.params.id_mecanico;
  let Mantenimiento = req.body;
  _controlador
    .modificarMantenimiento(Mantenimiento, { placa, id_mecanico })
    .then((respuestaDB) => {
      res.send({
        ok: true,
        mensaje: "Mantenimiento correctamente modificado",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});



module.exports = router;
