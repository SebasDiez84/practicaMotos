const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/motos");

/**
 * Obtiene las motos
 */
router.get("/motos", (req, res) => {
  let filtros = req.query;
  _controlador
    .consultarMoto(filtros)
    .then((respuestaDB) => {
      let registros = respuestaDB;
      res.send({ ok: true, info: registros, mensaje: "Moto exitosamente consultada" });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Consultar una moto especifica por placa
 */
router.get("/motos/:placa", (req, res) => {
  let placa = req.params.placa;
  _controlador
    .consultarMoto(placa)
    .then((respuestaDB) => {
      let registros = respuestaDB.rows;
      let mensaje =
        registros.length > 0 ? "Moto exitosamente consultada" : "Error de digitación o no existe registro de esta moto";
      res.send({ ok: true, info: registros, mensaje });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Almacena una moto
 */
router.post("/motos", (req, res) => {
  try {
    let motos = req.body;
    _controlador
      .guardarMotos(motos)
      .then((respuestaDB) => {
        res.send({
          ok: true,
          mensaje: "Moto almacenada",
          info: info_motos,
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
 * Modificar una moto segun la placa
 */
router.put("/motos/:placa", (req, res) => {
  let placa = req.params.placa;
  let motos = req.body;
  _controlador
    .modificarMotos(motos, placa)
    .then((respuestaDB) => {
      res.send({ ok: true, mensaje: "Moto actualizada", info: motos });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Elimina una moto
 */
router.delete("/motos/:placa", (req, res) => {
  let placa = req.params.placa;
  _controlador
    .eliminarMotos(placa)
    .then((respuestaDB) => {
      res.send({ ok: true, info: {}, mensaje: "Moto eliminada correctamente " });
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
