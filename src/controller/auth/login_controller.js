import Joi from 'joi'
import {User, RefreshToken} from '../../model'
import CustomErrorHandler from '../../services/CustomErrorHandler';
import JwtServices from '../../services/JwtServices';
import bcrypt from 'bcrypt'
import { REFRESH_SECRET } from '../../config';

const login_controller = {
    async login (req, res, next) {
        const loginSchema = Joi.object({
            mobile: Joi.string().min(8).max(11).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });
        const {error} = loginSchema.validate(req.body)
        if(error){
            return next(error)
        }
        try {
            const user = await User.findOne({mobile : req.body.mobile})
            if(!user) {
                return next({message:"Invalid Credentials"})
            }
            const matchingPasswrod = await bcrypt.compare(req.body.password, user.password)
            if(!matchingPasswrod) {
                return next(CustomErrorHandler.wrongCredentials())
            }
            const access_token = JwtServices.sign({_id: user._id, role: user.role})
            const refresh_token = JwtServices.sign({_id: user._id, role: user.role}, '1y', REFRESH_SECRET)
            await RefreshToken.create({token: refresh_token})
            res.json({access_token, refresh_token})

        } catch (err) {
            return next(err)
        }
    }
}

export default login_controller