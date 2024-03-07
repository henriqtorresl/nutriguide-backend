import { Request, Response } from "express";
import UsuarioService from "../service/usuarioService";
import jwt from 'jsonwebtoken';
import Usuario from "../models/Usuario";
import dotenv from 'dotenv';
import UsuarioNutricionista from "../models/UsuarioNutricionista";
import NutricionistaService from "../service/nutricionistaService";

dotenv.config();

export default class AuthController {

    private static service: UsuarioService;
    private static nutricionistaService: NutricionistaService;

    constructor() {
        AuthController.service = new UsuarioService();
        AuthController.nutricionistaService = new NutricionistaService();
    }

    public async login(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Auth Resource']
        #swagger.description = 'Faz o login na aplicação e gera um token jwt'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        */

        const SECRET = process.env.SECRET;

        const { nome, email } = req.body;

        if (!nome) {
            return res.status(422).json({ msg: 'O nome é obrigatório!' });
        }

        if (!email) {
            return res.status(422).json({ msg: 'O e-mail é obrigatório' });
        }

        const user: Usuario | undefined = await AuthController.service.findUserByName(nome);

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' });
        }

        if (email != user.email) {
            return res.status(404).json({ msg: 'E-mail inválido!' });
        }

        try {

            const token = jwt.sign(
                {
                    id: user.id
                }
                , SECRET!
            );

            res.status(200).json(
                {
                    msg: 'Logado com sucesso!',
                    token: token
                }
            );

        } catch (err) {
            console.log('Erro: ', err);

            res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' });
        }

    }

    public async getUserByName(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Auth Resource']
        #swagger.description = 'Trás os dados pessoais do usuário a partir do seu nome'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        */

        const { nome } = req.query;

        const user: Usuario | undefined = await AuthController.service.findUserByName(String(nome));
    
        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' });
        }
    
        res.status(200).json(user);
    }

    public async cadastroNutri(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Auth Resource']
        #swagger.description = 'Faz o cadastro de um nutricionista na aplicação e gera um token jwt'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        */

        const usuarioNutricionista: UsuarioNutricionista = req.body;

        console.log(usuarioNutricionista);

        const emails = await AuthController.service.emailsCadastrados();
 
        if (emails.includes(usuarioNutricionista.email)) {
            return res.status(422).json({ msg: 'O e-mail informado já possui cadastro, informe outro e-mail!' });
        } else {
            try {
                AuthController.nutricionistaService.insertNutricionista(usuarioNutricionista);
        
                res.status(201).json({ msg: 'Usuário criado com sucesso!' });
            } catch(error) {
                console.log('Erro: ', error);
        
                res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' });
            }
        }
    }

}