const express = require("express")
const contractControllers = require("../controllers/contract.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const router = express.Router();


router.post("/create-contract" , authMiddleware.authUser , contractControllers.createContract)

router.get("/all-contracts" , authMiddleware.authUser , contractControllers.getAllContracts)

router.get("/contract/:id" , authMiddleware.authUser , contractControllers.oneContract)

router.delete("/delete-contract/:id" , authMiddleware.authUser , contractControllers.delContract)

router.put("/edit-contract/:id" , authMiddleware.authUser , contractControllers.updateContract)





module.exports = router