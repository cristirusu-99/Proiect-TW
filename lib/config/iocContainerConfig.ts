import { Container } from "typescript-ioc";
import { CarRepository } from "../repository/CarRepository";
import { ICarRepository } from "../repository/ICarRepository";

export class IocContainerConfig {

    static configure() {
        Container.bind(ICarRepository).to(CarRepository);
    }
}