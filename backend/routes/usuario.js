/**Constantes express */
const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/usuario");

/**
 * Obtiene los usuarios
 */
router.get("/usuarios", (req, res) => {
  let filtros = req.query;
  _controlador
    .consultarUsuario(filtros)
    .then((respuestaDB) => {
      let registros = respuestaDB;
      res.send({ ok: true, info: registros, mensaje: "Usuarios correctamente consultado" });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Consultar un usuario en especifico
 */
router.get("/usuario/:documento", (req, res) => {
  let documento = req.params.documento;
  _controlador
    .consultarUsuario(documento)
    .then((respuestaDB) => {
      let registros = respuestaDB.rows;
      let mensaje =
        registros.length > 0 ? "Usuario exitosamente consultado" : "Error de digitación o sin registro del usuario";
      res.send({ ok: true, info: registros, mensaje });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Almacenar un usuario
 */
router.post("/usuarios", (req, res) => {
  try {
    let usuario = req.body;
    // Guardar el usuario en base de datos
    _controlador
      .guardarUsuario(usuario)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "Usuario almacenado", info: usuario });
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});

/**
 * Modificar información del usuario
 */
router.put("/usuarios/:documento", (req, res) => {
  let documento = req.params.documento;
  let usuario = req.body;
  _controlador
    .modificarUsuario(usuario, documento)
    .then((respuestaDB) => {
      res.send({ ok: true, mensaje: "Usuario correctamente modificada", info: usuario });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Elimina un usuario
 */
router.delete("/usuarios/:documento", (req, res) => {
  let documento = req.params.documento;
  _controlador
    .eliminarUsuario(documento)
    .then((respuestaDB) => {
      res.send({ ok: true, info: {}, mensaje: "usuario correctamente eliminado" });
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
