/**
 * Controlador de mantenimiento
 *
 */

//Importar servicio de postgres
const ServicioPg = require("../services/postgres");

/**
 * Guardar en base de datos de mantenimientos
 * @param {*} mantenimientos
 */
let guardarMantenimiento = async (mantenimientos) => {
  let servicio = new ServicioPg();
  let sql = `INSERT INTO public.mantenimientos(
    id_mecanico, placa, fecha, trabajos_realizados, horas_invertidas)
    VALUES (${id_mecanico}, ${placa}, ${fecha}, ${trabajos}, ${horas});`;

  let valores = [
    mantenimientos.id_mecanico, 
    mantenimientos.placa,
    mantenimientos.fecha, 
    mantenimientos.trabajos_realizados,
    mantenimientos.horas_invertidas
  ];
  let respuesta = await servicio.ejecutarSql(sql, valores);
  return respuesta;
};


let consultarMantenimiento = async (placa, id_mecanico) => {
  let servicio = new ServicioPg();
  let sql = `SELECT mantenimientos.id_mecanico, usuarios.nombre, usuarios.apellido, mantenimientos.placa, mantenimientos.trabajos_relizados from mantenimientos 
  INNER JOIN motos ON motos.placa = mantenimientos.placa_motos
  INNER JOIN usuarios ON usuarios.documento = mantenimientos.id_mecanico	WHERE placa=${placa}`;
  let respuesta = await servicio.ejecutarSql(sql, valores);
  return respuesta;
};

let modificarMantenimiento = async (mantenimientos,{ placa, id_mecanico}) => {
  if (mantenimientos.placa != placa) {
    throw {
      ok: false,
      mensaje: "Error de digitación de placa, o plana no existe",
    };
  }
  if (mantenimientos.id_mecanico != id_mecanico) {
    throw {
      ok: false,
      mensaje: "Error de digitación de la identificación del mecanico",
    };
  }
  let servicio = new ServicioPg();
  let sql = `UPDATE public.mantenimientos
	SET trajos_realizados=${trabajos}
	WHERE placa=${placa} AND id_mecanico=${id_mecanico}`;
  let valores = [
    manteniminetos.trabajos_realizados, 
    manteniminetos.placa, 
    habitante.id_mecanico];
  let respuesta = await servicio.ejecutarSql(sql, valores);
  return respuesta;
};

module.exports = {
  guardarMantenimiento,
  consultarMantenimiento,
  consultarMantenimiento,
  modificarMantenimiento,
};
