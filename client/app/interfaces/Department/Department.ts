import { Budget } from "../Budget/Budget";

export interface Department {
    id: number,
    name: string,
    description: string,
    color: string,
    budget: Budget
}