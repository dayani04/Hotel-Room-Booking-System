const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController"); 


router.get("/", adminController.getAllAdmins);
router.post("/", adminController.addAdmin);  
router.get("/:id", adminController.getAdminById);
router.put("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);

router.post('/admin/login', adminController.adminLogin);
module.exports = router;
