const express = require('express');
const route = express.Router();

const services = require('../services/render');

const contoller = require('../controller/controller');

route.get('/', services.homeRoutes);

route.get('/add-user', services.add_user);

route.get('/update-user', services.update_user);

//API
route.post('/api/users', contoller.create);
route.get('/api/users', contoller.find);
route.put('/api/users/:id', contoller.update);
route.delete('/api/users/:id', contoller.delete);

module.exports = route;