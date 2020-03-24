const { Router } = require('express');

const DevController = require('./controllers/DevControllers');
const SearchController = require('./controllers/SearchController')

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs/:id', DevController.update);

routes.get('/search', SearchController.index);

// routes.delete('/dev/:id', DevController.destroy);


module.exports = routes;