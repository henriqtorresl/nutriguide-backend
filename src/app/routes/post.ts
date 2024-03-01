import { Router } from "express";
import PostController from "../controller/postController";

const routesPost = Router();
const controller = new PostController();

routesPost.get('/post', controller.getAll);

routesPost.get('/post/:idNutricionista', controller.getOne);

routesPost.post('/post', controller.post);

export default routesPost;