import { Router } from "express";
import NutricionistaController from "../controller/nutricionistaController";

const routesNutricionista = Router();
const controller = new NutricionistaController();

routesNutricionista.get('/nutricionista', controller.getAll);

routesNutricionista.get('/nutricionista/:id', controller.getOne);

routesNutricionista.get('/nutricionista-nome', controller.getNutriByNomeUser);

routesNutricionista.get('/nutricionista-filtro', controller.nutricionistaFiltro);

export default routesNutricionista;