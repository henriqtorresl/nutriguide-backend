import { Router } from "express";
import routesAlimento from "../alimento";
import routesAuth from "../auth";
import routesAvaliacao from "../avaliacao";
import routesComentario from "../comentario";
import routesEmail from "../email";
import routesNutricionista from "../nutricionista";
import routesPaciente from "../paciente";
import routesPlanoAlimentar from "../planoAlimentar";
import routesPost from "../post";
import routesProgressoPaciente from "../progressoPaciente";
import routesRefeicao from "../refeicao";

const routes: Router[] = [
    routesAlimento,
    routesAuth,
    routesAvaliacao,
    routesComentario,
    routesEmail,
    routesNutricionista,
    routesPaciente,
    routesPlanoAlimentar,
    routesPost,
    routesProgressoPaciente,
    routesRefeicao
]

export default routes;