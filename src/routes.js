const {Router} = require('express');
const routes = new Router();

const funcController = require('./apps/controllers/FuncController');
const veicController = require('./apps/controllers/VeicController');
const propController = require('./apps/controllers/PropController');
const materialController = require('./apps/controllers/MaterialController');
const servController = require('./apps/controllers/ServController');
const mat_servController = require('./apps/controllers/Mat_servController');

routes.post('/createFunc', funcController.create);
routes.post('/updateFunc', funcController.update);
routes.get('/getOneFunc', funcController.getOne);
routes.get('/getAllFunc', funcController.getAllFunc);

routes.post('/createProp', propController.create);
routes.post('/updateProp', propController.update);
routes.get('/getOneProp', propController.getOne);

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

routes.post('/createMatServ', mat_servController.create);
routes.post('/updateMatServ', mat_servController.update);

module.exports = routes;