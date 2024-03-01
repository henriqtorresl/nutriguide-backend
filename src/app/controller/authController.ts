import { Request, Response } from "express";
import UsuarioService from "../service/usuarioService";
import jwt from 'jsonwebtoken';
import Usuario from "../models/Usuario";
import dotenv from 'dotenv';

dotenv.config();

export default class AuthController {

    private static service: UsuarioService;

    constructor() {
        AuthController.service = new UsuarioService();
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

}