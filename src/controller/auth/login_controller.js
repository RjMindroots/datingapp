import Joi from 'joi'
import {User} from '../../model'
import CustomErrorHandler from '../../services/CustomErrorHandler';
import JwtServices from '../../services/JwtServices';
import bcrypt from 'bcrypt'

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

            res.json({access_token})

        } catch (err) {
            return next(err)
        }
        

        next()
    }
}

export default login_controller