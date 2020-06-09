"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devConfig = {
    app: {
        adresaApi: "/api/v1/cars/",
        adresaAdmin: "/api/v1/admin/",
        deniedPath: /(\.\.\/)|(\?(.*)\?)|\$/,
        port: process.env.PORT || 3000 //portul serverului
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || 'CarsDatabase' //numele BD
    },
    mimeType: {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    }
};
exports.config = devConfig;
//# sourceMappingURL=config.js.map