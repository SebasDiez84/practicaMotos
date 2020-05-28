/**
 * Controlador de usuarios
 */

//importar el servicion de postgres
const servicioPg = require('../services/postgres')

/**
 * Guardando al usuario
 * @param {*} usuario 
 */
let guardarAlUsuario = async (usuario)=> {
    try {
        let servicio = new servicioPg()
        let sql = `INSERT INTO public.usuarios(
        tipo_documento, documento, nombre, apellidos, celular, correo,  rol, clave)
        VALUES (
            '${usuario.tipo_documento}',
            '${usuario.documento}',
            '${usuario.nombre}',
            '${usuario.apellidos}'
            '${usuario.celular}',
            '${usuario.correo}',
            '${usuario.rol}',
            '${usuario.clave}',
            );`;
        let respuesta = await servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {
        throw{ok: false };
    }
}

//Consultando la informacion de los usuarios
let consultarUsuario = async () => {
    try {
        let servicio = new servicioPg()
        let sql = `SELECT * from public.usuarios`;
        let respuesta = await servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {
        throw{ok: false };
    }

}

let modificarUsuario = async (usuario, id) => {
    if (usuarios.documento != id) {
      throw {
        ok: false,
        mensaje: "El documento está mal digitado o no ha sido registrado",
      };
    }
}
let eliminarUsuario = async (id) => {
    let servicio = new ServicioPg();
    let sql = `DELETE FROM usuarios WHERE documento =${documento}`;
    let valores = [id];
    let respuesta = await servicio.ejecutarSql(sql, valores);
    return respuesta;
  };

module.exports = {  
    guardarAlUsuario, 
    consultarUsuario,
    modificarUsuario,
    eliminarUsuario
};