const devConfig = {
  app: {
    adresaApi: "/api/v1/cars/",
    deniedPath: /(\.\.\/)|(\?(.*)\?)/,
    port: process.env.PORT || 3000 //portul serverului
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT) || 27017,  //portul dbului
    name: process.env.DEV_DB_NAME || 'CarsDatabase'
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

export const config = devConfig;