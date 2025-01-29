const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");
const verifyToken = require('../middlewares/authMiddleware')

router.get("/", userController.getAllUsers);  
router.post("/", userController.addUser);        
router.put("/:id", userController.updateUser);         
router.delete("/:id", userController.deleteUser);     
router.post('/login', userController.userLogin);      


module.exports = router;
