import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Ingredient } from "./../entity/Ingredient";

export class IngredientController {


    static createIngredient = async (req: Request, res: Response) => {
        const ingredientDB = getRepository(Ingredient);

        let response: any;
        try {
            const { name, calories } = req.body;
            const ingredient = new Ingredient();
            ingredient.name = name;
            ingredient.calories = calories;
            response = await ingredientDB.save(ingredient);
        } catch (error) {
            return res.status(404).json({
                message: "Something goes wrong",
                errors: error
            });
        }

        res.json({
            message: "Igredient created",
            response
        });
    }

    static getAllIngredients = async (req: Request, res: Response) => {
        const ingredientDB = getRepository(Ingredient);
        let ingredients: any;
        try {
            ingredients = await ingredientDB.find({ order: { id: "DESC" } });
        } catch (error) {
            return res.status(404).json({
                message: 'Something goes wrong'
            })
        }
        if (ingredients.length > 0) {
            res.send(ingredients);
        } else {
            res.status(404).json(
                { message: 'There are no ingredients yet' }
            );
        }
    }

    static getIngredientById = async (req: Request, res: Response) => {
        const ingredientDB = getRepository(Ingredient);
        let ingredient: Ingredient;
        try {
            const { id } = req.params;
            ingredient = await ingredientDB.findOneOrFail(id);
        } catch (error) {
            return res.status(404).json({
                message: 'Something goes wrong',
                errors: error
            });
        }

        res.json(ingredient);
    }

    static updateIngredient = async (req: Request, res: Response) => {
        const ingredientDB = getRepository(Ingredient);
        let response: any;

        try {
            const { id } = req.params;
            const { name, calories } = req.body;
            const ingredient = await ingredientDB.findOneOrFail(id);
            ingredient.name = name;
            ingredient.calories = calories;
            response = await ingredientDB.save(ingredient);
        } catch (error) {
            return res.status(404).json({
                message: 'Something goes wrong',
                errors: error
            });
        }

        res.json({
            message: "Ingredient updated successfully!",
            response
        });

    }

    static deleteIngredientById = async (req: Request, res: Response) => {
        const ingredientDB = getRepository(Ingredient);

        const { id } = req.params;
        try {
            await ingredientDB.findOneOrFail(id);
        } catch (error) {
            return res.status(404).json({
                message: 'Ingredient not found!',
                errors: error
            });
        }

        const response = await ingredientDB.delete(id);
        res.json({
            message: "Ingredient deleted successfully!",
            response
        });

    }

}