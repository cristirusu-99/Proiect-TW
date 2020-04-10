import { ICrudRepository } from "./ICrudRepository";
import { Car } from "models/Car";

export abstract class ICarRepository extends ICrudRepository<Car> {
    abstract getCarByJudet(judet: string): Promise<Car[]>;
}