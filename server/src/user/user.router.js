const express = require ("express");
const { model } = require("./user.model");

var router = express.Router();
const userController = require ('./user.controller');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/register', userController.createUser);
router.post('/login',userController.loginUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.delete);
router.delete('/logout/:id/:token', userController.logoutUser)

module.exports = router; 
