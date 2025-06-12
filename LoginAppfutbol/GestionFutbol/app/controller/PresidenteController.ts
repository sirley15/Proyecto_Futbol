import pgDatabase from "../database/pgDatabase.js";

export default class  PresidenteController {


    async listarPresidente ({request, response}){
        const result = await pgDatabase.query('SELECT * FROM "Presidentes"');
        return response.json ({data: result.rows});
    }
    async listarPresidenteDni ({ params, response }){
    const dni = params.dni;
    const result = await pgDatabase.query('SELECT * FROM "Presidentes" WHERE "dni" = $1',
        [dni]);

    if (result.rowCount > 0) {
        return response.json(result.rows[0]);
    } else {
        response.status = 404;
        return response.json({ mensaje: "Presidente no encontrado" });
    }
}


    async CrearPresidente ({request, response}){
        const {  dni, nombre} = request.body();

        if (typeof nombre !== "string") {
            return response.json({mensaje: "El equipo debe llevar un nombre."});
        }
        const validar = await pgDatabase.query(
            'SELECT * FROM "Presidentes" WHERE "dni" = $1',
            [dni]
        );
        if (validar.rowCount > 0) {
            return response.json({ mensaje: "El DNI del presidente ya existen." });
        }
    
        const result = await pgDatabase.query(
            'INSERT INTO "Presidentes" ("dni", "nombre" ) VALUES ($1, $2) RETURNING *',
            [dni, nombre]
        );
        if (result.rowCount >0) {
            return response.json({mensaje: "nuevo presidente creado", data:result.rows[0]});
        }
        else {
            return response.json ({mensaje:"El presidente no se creo"});
        }
    }


   async EditarPresidente({ request, response, params }) {
    const dni = params.dni;
    const { nombre } = request.body();

    const result = await pgDatabase.query(
        'UPDATE "Presidentes" SET "nombre" = $1  WHERE "dni" = $2',
        [nombre, dni]
    );

    if (result.rowCount > 0) {
        return response.json({
            mensaje: "Presidente actualizado exitosamente",
            data: { dni, nombre }
        });
    } else {
        return response.json({ mensaje: "Presidente no encontrado o no se actualizó" });
    }
  }

  async EliminarPresidente({ params, request, response }) {
        const Dni = params.dni;

        await pgDatabase.query(
            'DELETE FROM "Presidentes" WHERE dni = $1',[Dni]);

        return response.json({ mensaje: "Presidente y equipo eliminados" });
    }
}

