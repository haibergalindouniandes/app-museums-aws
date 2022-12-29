const express = require('express');
const museumRouter = require('./museum.router');
const securityRouter = require('./security.router');

function routerApi(app) {
  const router = express.Router();
  //Agregamos a la app el pattern path del servicio
  app.use('/aws/cloudapp/v1', router);
  //Agregamos los paths de los servicios de museos
  router.use('/museums', museumRouter);
  //Agregamos los paths de los servicios de museos
  router.use('/security', securityRouter);
  //Si queremos definir varias enpoint con diferentes versiones se haria de la siguiente forma
  // const routerV2 = express.Router();
  // app.use('/aws/cloudapp/v2', routerV2);
  // routerV2.use('/museums', museumsRouter);
}

module.exports = routerApi;
