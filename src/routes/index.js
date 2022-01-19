import express from "express";
import {login_controller, register_controller, userController, refreshController} from '../controller'
import {auth, admin} from '../middleware'
const router = express.Router();

//auth routes
router.post('/register', register_controller.register)
router.post('/login', login_controller.login)
router.post('/refresh', refreshController.refresh)
router.get('/user', auth, userController.userIdentity)
router.post('/profile', auth, userController.profile)
router.post('/logout', login_controller.logout)

export default router