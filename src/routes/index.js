import express from "express";
import {login_controller, register_controller, userController, refreshController} from '../controller'
import {auth} from '../middleware'
const router = express.Router();

//auth routes
router.post('/register', register_controller.register)
router.post('/login', login_controller.login)
router.post('/refresh', refreshController.refresh)
router.get('/user', auth, userController.userIdentity)


export default router