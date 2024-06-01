const {Router} = require('express');
const routes = new Router();

const funcController = require('./apps/controllers/FuncController');
const veicController = require('./apps/controllers/VeicController');
const propController = require('./apps/controllers/PropController');
const materialController = require('./apps/controllers/MaterialController');
const servController = require('./apps/controllers/ServController');
const mat_servController = require('./apps/controllers/Mat_servController');

routes.post('/updateFunc', funcController.update);
routes.get('/getOneFunc', funcController.getOne);
routes.get('/getAllFunc', funcController.getAllFunc);

routes.post('/createProp', propController.create);
routes.post('/updateProp', propController.update);
routes.get('/getOneProp', propController.getOne);
routes.get('/test', propController.getAll);

routes.post('/createVeic', veicController.create);
routes.post('/updateVeic', veicController.update);
routes.get('/getOneVeic', veicController.getOne);
routes.get('/getAllVeic', veicController.getAll);

routes.post('/createMaterial', materialController.create);
routes.post('/updateMaterial', materialController.update);
routes.get('/getOneMaterial', materialController.getOne);


routes.post('/createService', servController.create);
routes.post('/updateService', servController.update);
routes.get('/getOneService', servController.getOne);

routes.post('/addNewMaterial', mat_servController.create);
routes.post('/updateMaterialService', mat_servController.update);
routes.get('/getMaterials', mat_servController.getOne)

routes.post('/createMatServ', mat_servController.create);
routes.post('/updateMatServ', mat_servController.update);

//routes.method('route', schemaVal(schema), method)

module.exports = routes;