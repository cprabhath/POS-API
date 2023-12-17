// Purpose: to route the product requests to the controller

//-----------------Importing Packages----------------//
const express = require("express");
const productController = require("../controller/ProductController");
const verifyToken = require("../middleware/AuthMiddleware");
const router = express.Router();
//---------------------------------------------------//

//------------------Product Routes----------------//
// router.post("/create", verifyToken, productController.create);

// router.get("/find-by-id", verifyToken, productController.findById);

// router.delete("/delete-by-id", verifyToken, productController.deleteById);

// router.put("/update", verifyToken, productController.update);

// router.get("/find-all", verifyToken, productController.findAll);

router.post("/create", productController.create);

router.get("/find-by-id", verifyToken, productController.findById);

router.delete("/delete-by-id", verifyToken, productController.deleteById);

router.put("/update", verifyToken, productController.update);

router.get("/find-all", productController.findAll);
//-----------------------------------------------//

//------------------Export module----------------//
module.exports = router;
//-----------------------------------------------//
