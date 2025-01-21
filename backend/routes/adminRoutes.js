const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController"); // Adjust path as needed

// Define routes for admin CRUD operations
router.get("/", adminController.getAllAdmins);
router.post("/", adminController.addAdmin);  // POST /admins to add an admin
router.get("/:id", adminController.getAdminById);
router.put("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);

router.post('/admin/login', adminController.adminLogin);
module.exports = router;
