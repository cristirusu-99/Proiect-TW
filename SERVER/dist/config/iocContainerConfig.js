"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_ioc_1 = require("typescript-ioc");
const CarRepository_1 = require("../repository/CarRepository");
const ICarRepository_1 = require("../repository/ICarRepository");
class IocContainerConfig {
    static configure() {
        typescript_ioc_1.Container.bind(ICarRepository_1.ICarRepository).to(CarRepository_1.CarRepository);
    }
}
exports.IocContainerConfig = IocContainerConfig;
//# sourceMappingURL=iocContainerConfig.js.map