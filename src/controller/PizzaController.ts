import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Pizza } from "./../entity/Pizza";
import { Ingredient } from "./../entity/Ingredient";

export class PizzaController {

    static cratePizza = async (req: Request, res: Response) => {
        const pizzaDB = getRepository(Pizza);
        const ingredientDB = getRepository(Ingredient);

        let response: any;
        try {
            const { name, origin, ingredients } = req.body;
            const pizza = new Pizza();
            const ingredientsFound = await ingredientDB.findByIds(ingredients);
            pizza.name = name;
            pizza.origin = origin;
            pizza.ingredients = ingredientsFound;
            response = await pizzaDB.save(pizza);
        } catch (error) {
            return res.status(404).json({
                message: "Something goes wrong",
                errors: error
            });
        }

        res.json({
            message: "Pizza created",
            response
        });
    }

    static getAllPizzas = async (req: Request, res: Response) => {
        const pizzaDB = getRepository(Pizza);
        let pizzas: any;

        try {
            pizzas = await pizzaDB.find({ relations: ["ingredients"], order: { id: "DESC" } });
        } catch (error) {
            return res.status(404).json({
                message: 'Something goes wrong'
            })
        }
        if (pizzas.length > 0) {
            res.send(pizzas);
        } else {
            res.status(404).json(
                { message: 'There are no pizzas yet' }
            );
        }
    }

    static getPizzaById = async (req: Request, res: Response) => {

        const pizzaDB = getRepository(Pizza);
        let pizza: Pizza;
        try {
            const { id } = req.params;
            pizza = await pizzaDB.findOneOrFail(id, { relations: ["ingredients"] });
        } catch (error) {
            return res.status(404).json({
                message: 'Something goes wrong',
                errors: error
            })
        }

        res.json(pizza);
    }

    static updatePizza = async (req: Request, res: Response) => {
        const pizzaDB = getRepository(Pizza);
        const ingredientDB = getRepository(Ingredient);
        let response: any;

        try {
            const { id } = req.params;
            const { name, origin, ingredients } = req.body;
            const ingredientsFound = await ingredientDB.findByIds(ingredients);
            const pizza = await pizzaDB.findOneOrFail(id);
            pizza.name = name;
            pizza.origin = origin;
            pizza.ingredients = ingredientsFound;
            response = await pizzaDB.save(pizza);
        } catch (error) {
            return res.status(404).json({
                message: 'Something goes wrong',
                errors: error
            })
        }

        res.json({
            message: "Pizza updated successfully!",
            response
        });

    }

    static deletePizzaById = async (req: Request, res: Response) => {
        const pizzaDB = getRepository(Pizza);

        const { id } = req.params;
        try {
            await pizzaDB.findOneOrFail(id);
        } catch (error) {
            return res.status(404).json({
                message: 'Pizza not found!',
                errors: error
            })
        }

        const response = await pizzaDB.delete(id);
        res.json({
            message: "Pizza deleted successfully!",
            response
        });

    }

}