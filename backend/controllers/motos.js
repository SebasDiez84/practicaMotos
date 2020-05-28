/**
 * Controlador de motos
 */

//Importar servicio de postgres
const ServicioPg = require("../services/postgres");

/**
 * Guardar en base de datos las motos
 * @param {*} motos
 */
let guardarMoto = async (moto) => {
  let servicio = new ServicioPg();
  let sql = `   INSERT INTO public.motos(
     placa, estado, clase, marca, modelo, color, cilindraje, id_propietario,
     nro_soat,vencimeinto_soat, nro_tecnomecanica, vencimiento_tecnomecanica)
	  VALUES (${placa}, ${estado}, ${clase}, ${marca}, ${modelo}, ${color}, ${cilindraje}, ${documentoProp},${numeroSoat},${vencimientoSoat},${numeroTecno},${vencimientoTecno});`;

  let valores = [
    moto.placa,
    moto.estado,
    moto.clase,
    moto.marca,
    moto.modelo,
    moto.color,
    moto.cilindraje,
    moto.id_propietario,
    moto.nro_soat,
    moto.vencimiento_soat,
    moto.nro_tecnomecanica,
    moto.vencimiento_tecnomecanica,
  ];
  let respuesta = await servicio.ejecutarSql(sql, valores);
  return respuesta;
};

/**
 * Consultar usuarios
 * @param {*} motos
 */

 //Se trae toda la información de la moto 
let consultarMoto = async (placa) => {
  let _servicio = new ServicioPg();
  let sql = `SELECT * FROM motos WHERE placa=${placa}`;
  let respuesta = await _servicio.ejecutarSql(sql, [id]);
  return respuesta;
};

//Se modifica la moto segun una placa
let modificarMoto = async (moto, placa) => {
  if (moto.placa != placa) {
    throw {
      ok: false,
      mensaje: "Error de digitación de placa, o plana no existe",
    };
  }
  let servicio = new ServicioPg();
  let sql = `UPDATE public.motos
  SET  placa=${placa}, estado=${estado}, clase=${clase}, marca=${marca}, modelo=${modelo}, color=${color}, 
  cilindraje=${cilindraje}, id_propietario=${socumento_propietario}, nro_soat=${numeroSoat}, vencimiento_soat=${vencimientoSoat},
  nro_tecnomecanica=${numeroTecno}, vencimiento_tecnomecanica=${vencimientoTecno}
  WHERE placa=${placa}`;
  let valores = [
    moto.placa,
    moto.estado,
    moto.marca,
    moto.modelo,
    moto.color,
    moto.cilindraje,
    moto.id_propietario,
    moto.nro_soat,
    moto.vencimiento_soat,
    moto.nro_tecnomecanica,
    moto.vencimiento_tecnomecanica,
  ];
  let respuesta = await servicio.ejecutarSql(sql, valores);
  return respuesta;
};

//Se elimina la moto segun la placa ingresada
let eliminarMoto = async (placa) => {
  let _servicio = new ServicioPg();
  let sql = `DELETE FROM motos WHERE placa=${placa}`;
  let valores = [placa];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

//Ecportacion
module.exports = {
  guardarMoto,
  consultarMoto,
  eliminarMoto,
  modificarMoto,
};
