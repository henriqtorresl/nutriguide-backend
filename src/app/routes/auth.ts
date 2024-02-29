import { Router, NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import Usuario from "../models/Usuario";
import UsuarioRepository from "../database/usuarioRepository";

const routesAuth = Router();

const SECRET = 'sdjiodsmadsojqwjieqwaasdbmbadetr';
function checkToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado!' });
    }

    try {
        jwt.verify(token, SECRET);
        next();     // Quando não da erro a função next permite que o endpoint continue sendo executado
    } catch (err) {
        return res.status(400).json({ msg: 'Token inválido!' });
    }
}

routesAuth.post('/login', async (req, res) => {

    const { nome, email } = req.body;

    if (!nome) {
        return res.status(422).json({ msg: 'O nome é obrigatório!' });
    }

    if (!email) {
        return res.status(422).json({ msg: 'O e-mail é obrigatório' });
    }

    const repository = new UsuarioRepository();
    const user: Usuario | undefined = await repository.findUserByName(nome);

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
            , SECRET
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

});

routesAuth.get('/user/nome', checkToken, async (req, res) => {

    const { nome } = req.query;

    const repository = new UsuarioRepository();
    const user: Usuario | undefined = await repository.findUserByName(String(nome));

    if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado!' });
    }

    res.status(200).json(user);
});

export default routesAuth;