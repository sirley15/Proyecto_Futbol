import Router from "@adonisjs/core/services/router";
import PresidenteController from "../../app/controller/PresidenteController.js";

const Presidente = new PresidenteController();
Router.get('/presidente', Presidente.listarPresidente);
Router.get('/presidente/:dni', Presidente.listarPresidenteDni);
Router.put('/presidente/:dni', Presidente.EditarPresidente);
Router.post('/presidente', Presidente.CrearPresidente);
Router.delete('/presidente/:dni', Presidente.EliminarPresidente);

