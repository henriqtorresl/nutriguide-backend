import { Router } from "express";
import NutricionistaService from "../service/nutricionistaService";

const routesNutricionista = Router();

routesNutricionista.get('/nutricionista', async (req, res) => {
    const service = new NutricionistaService();
    const nutricionista = await service.getAllNutricionistas();

    res.status(200).json(nutricionista);
});

routesNutricionista.get('/nutricionista/:id', async (req, res) => {
    const { id } = req.params;

    const service = new NutricionistaService();
    const nutricionista = await service.getOneNutricionista(id);

    if (nutricionista !== undefined) {
        res.status(200).json(nutricionista);
    } else {
        res.status(404).json({ msg: 'Nutricionista não encontrado!' })
    }

});

routesNutricionista.get('/nutricionista-nome', async (req, res) => {
    const { nome } = req.query;

    const service = new NutricionistaService();
    const nutricionista = await service.getOneNutricionistaByNomeUser(String(nome));

    if (nutricionista !== undefined) {
        res.status(200).json(nutricionista);
    } else {
        res.status(404).json({ msg: 'Nutricionista não encontrado!' })
    }

});

routesNutricionista.get('/nutricionista-filtro', async (req, res) => {
    const { nome, especialidade, regiao } = req.query;

    const service = new NutricionistaService();
    const nutricionistas = await service.getAllNutricionistasFiltered(String(nome), String(especialidade), String(regiao));

    if (nutricionistas !== undefined) {
        res.status(200).json(nutricionistas);
    } else {
        res.status(404).json({ msg: 'Não foi encontrado nenhum nutricionista com os parametros aplicados!' })
    }

});

export default routesNutricionista;