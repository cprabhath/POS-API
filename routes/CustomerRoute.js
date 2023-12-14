// Purpose: to route the Customer requests to the controller

//-----------------Importing Packages----------------//
const express = require("express");
const customerController = require("../controller/CustomerController");
const verifyToken = require("../middleware/AuthMiddleware");
const router = express.Router();
//---------------------------------------------------//

//------------------Customer Routes----------------//
router.post("/create", verifyToken, customerController.create);

router.get("/find-by-id", verifyToken, customerController.findById);

router.delete("/delete-by-id", verifyToken, customerController.deleteById);

router.put("/update", verifyToken, customerController.update);

router.get("/find-all", customerController.findAll);
//------------------------------------------------//

//------------------Export module----------------//
module.exports = router;
//------------------------------------------------//
