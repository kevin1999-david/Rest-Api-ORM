import { Router } from 'express';
import { PizzaController } from "./../controller/PizzaController";

const router = Router();

router.get('/', PizzaController.getAllPizzas);
router.get('/:id', PizzaController.getPizzaById);
router.post('/', PizzaController.cratePizza);
router.put('/:id', PizzaController.updatePizza)
router.delete('/:id', PizzaController.deletePizzaById)

export default router;