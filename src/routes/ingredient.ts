import { Router } from 'express';
import { IngredientController } from "./../controller/IngredientController";

const router = Router();

router.get('/', IngredientController.getAllIngredients);
router.get('/:id', IngredientController.getIngredientById);
router.post('/', IngredientController.createIngredient);
router.put('/:id', IngredientController.updateIngredient)
router.delete('/:id', IngredientController.deleteIngredientById)

export default router;