import Router from "@adonisjs/core/services/router";
import UsuariosController from "../../app/controller/UsuariosController.js";

const Usuarios = new UsuariosController();

Router.post('/registro', Usuarios.Registro)
Router.post('/login', Usuarios.Login)

