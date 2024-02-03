const express = require('express');
const router = express.Router();
const user = require('../controllers/users');

router.get("/user/:id", user.getUser);
router.get("/users", user.getAllUsers);
router.post("/createUser", user.createUser);
router.put("/updateUser/:id", user.updateUser);


module.exports = router;