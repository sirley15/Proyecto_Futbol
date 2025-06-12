import pgDatabase from "../database/pgDatabase.js";
import hash from "@adonisjs/core/services/hash";

export default class UsuariosController{
    
    async Registro({request, response}){
        const {nombre_completo, correo, password} = request.body()
        //hashear la constraseña
        const newpassword= await hash.make(password)
        const resul= await  pgDatabase.query(`INSERT INTO usuarios (nombre_completo, correo, password) VALUES ($1, $2, $3)`, 
        [nombre_completo, correo, newpassword])
        console.log(resul.rowCount)
        if(resul.rowCount > 0){
        return response.json({mensaje: 'registro correcto', nombre_completo:nombre_completo, correo:correo})
        }
        else {
            return response.json({mensaje:'no se registro'})
        }
    }

   async Login({ request, response }) {
  const { correo, password } = await request.body();

  const result = await pgDatabase.query(`SELECT * FROM usuarios WHERE correo = $1`, [correo]);

  if (result.rows.length > 0) {
    const user = result.rows[0];

    const valido = await hash.verify(user.password, password);
    if (valido) {
      return response.json({ mensaje: 'bienvenido' });
    } else {
      return response.json({ mensaje: 'error email o password incorrectos' });
    }
  } else {
    return response.json({ mensaje: 'error email o password incorrectos' });
  }
}
}