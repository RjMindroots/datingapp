import express from "express";
import {login_controller, register_controller} from '../controller'
const router = express.Router();

//auth routes
router.post('/register', register_controller.register)
router.post('/login', login_controller.login)


export default router