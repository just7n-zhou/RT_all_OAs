import { Router } from 'express';
import { RecipeController } from './recipe.controller.js';
import { validateRequest } from '../../middleware/validateRequest.js';
import { createRecipeSchema, updateRecipeSchema } from './recipe.schema.js';

const router = Router();
const controller = new RecipeController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validateRequest(createRecipeSchema), controller.create);
router.put('/:id', validateRequest(updateRecipeSchema), controller.update);
router.delete('/:id', controller.delete);

export default router;
