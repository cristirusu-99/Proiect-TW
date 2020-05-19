"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devConfig = {
    app: {
        adresaApi: "/api/v1/cars/",
        deniedPath: /(\.\.\/)|(\?(.*)\?)/,
        port: process.env.PORT || 3000 //portul serverului
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || 'CarsDatabase'
    }
};
exports.config = devConfig;
//# sourceMappingURL=config.js.map