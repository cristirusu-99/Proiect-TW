const devConfig = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT) || 3000 //portul serverului
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT) || 27017,  //portul dbului
    name: process.env.DEV_DB_NAME || 'AirportsDatabase'
  }
};

export const config = devConfig;