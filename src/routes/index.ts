import { Router } from 'express';
import ingredient from "./ingredient";
import pizza from "./pizza";

const routes = Router();

routes.use('/ingredients', ingredient);
routes.use('/pizzas', pizza);

export default routes;