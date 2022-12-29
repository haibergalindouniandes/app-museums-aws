//Importamos express que nos va a permitir levantar el servidor
const express = require('express');
//Importamos el routerApi
const routerApi = require('./routes')
//Importamos cors que nos va a permitir a solucionar el error de CORS
const cors = require('cors');
//Importamos helmet que nos permite habilitar cabeceras
var helmet = require('helmet');
//Importamos la configuracion para el JWT
var config = require('./configs/config');
//Importamos body-parser que nos permitira convertir el payload de nuestro servicio
var bodyParser = require('body-parser');
//Importamos los Middlewares de manejo de errores
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');


//Creamos la aplicacion con express
const app = express();
//Asignamos el puerto para la aplicacion
const port = 3000;



//Middleware necesario para poder obtener la data que viaja a nuestro servicio en formato json, se debe implementar un middleware de express "express.json()"
app.use(express.json());
//Hacemos uso de cors para habilitar el acceso desde cualquier origen
app.use(cors());
//Hacemos uso de cors para habilitar el acceso desde origenes especificos, creando una lista blanco
// const whiteList = ['http://localhost:3000'];
// const options = {
//   origin: (origin, callback) => {
//     if (whiteList.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Access to restricted APIs'));
//     }
//   }
// };
// app.use(cors(options));

//Hacemos uso de helmet
//Deshabilitamos la cabecera de express x-powered-by
// app.disable('x-powered-by');
//Hacemos uso del routerApi que importamos
//Hacemos uso de helmet
app.use(helmet());

//Configuramos y hacemos uso de JWT
//Definimos el key maestro
app.set('key', config.key);
//Middleware necesario para poder codificar el payload
app.use(bodyParser.urlencoded({ extended: true }));
//Middleware necesario para poder convertir el payload en json
app.use(bodyParser.json());


//Asignamos el routerAPI
routerApi(app);

//Midlewares para manejo de errores (estos deben ser asigandos despues del router)
//Es muy importante tambien el orden, ya que se ejecutan de forma secuencia
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//Levantamos el servidor en el puerto configurado
app.listen(port, () => {
  console.log(`Application running in port: ${port}`)
});
