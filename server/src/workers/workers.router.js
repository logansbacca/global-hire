const express = require ("express");
const User = require('../user/user.model');

var router = express.Router();
const workersController = require ('./workers.controller');


router.get('/find', workersController.getWorkers);
router.get('/filter',  workersController.filterWorkers);
router.get('/:id',  workersController.getWorker);
router.post('/',  workersController.createWorker);
router.put('/:id',   workersController.updateWorker);
router.delete('/:id',  workersController.deleteWorker);


module.exports = router;


