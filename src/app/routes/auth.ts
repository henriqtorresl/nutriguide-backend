import { Router, NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import AuthController from "../controller/authController";

const routesAuth = Router();

dotenv.config();
const SECRET = process.env.SECRET;

const controller = new AuthController();

function checkTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado!' });
    }

    try {
        jwt.verify(token, SECRET!);
        next();     // Quando não da erro a função next permite que o endpoint continue sendo executado
    } catch (err) {
        return res.status(400).json({ msg: 'Token inválido!' });
    }
}

routesAuth.post('/login', controller.login);

routesAuth.post('/cadastro', controller.cadastroNutri);

routesAuth.get('/user/nome', checkTokenMiddleware, controller.getUserByName);

export default routesAuth;