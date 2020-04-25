const devConfig = {
  app: {
    adresaApi : "/api/v1/cars/",
    deniedPath : /(\.\.\/)|(\?(.*)\?)/,
    port: parseInt(process.env.DEV_APP_PORT) || 3000 //portul serverului
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT) || 27017,  //portul dbului
    name: process.env.DEV_DB_NAME || 'CarsDatabase'
  }
};

export const config = devConfig;