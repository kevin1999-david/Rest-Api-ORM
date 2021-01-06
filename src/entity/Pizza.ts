import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Ingredient } from "./Ingredient";

@Entity()
export class Pizza {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    origin: string;

    @ManyToMany(() => Ingredient, { cascade: true })
    @JoinTable()
    ingredients: Ingredient[]

}