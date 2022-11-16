const {Router} = require("express");
const { sessionGet, sessionLogout, sessionLogin, sessionProducts} = require("../../controllers/session/session-controllers");
const { authMiddleware } = require("../../middleware/authMiddleware");
const router = Router();

router.get("/", authMiddleware, sessionGet)

router.get("/logout", sessionLogout)

router.post("/login", sessionLogin)

router.post("/products", sessionProducts)

module.exports=router;