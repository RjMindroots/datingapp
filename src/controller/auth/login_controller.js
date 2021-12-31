import Joi from 'joi'
import {User} from '../../model'

const login_controller = {
    async login (req, res, next) {
        const loginSchema = Joi.object({
            mobile_number: Joi.string().min(10).max(10).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });

        const {error} = loginSchema.validate(req.body)

        if(error){
            return next(error)
        }

        try {
            const user = User.findOne({mobile_number:req.body.mobile_number})
            if(!user) {
                return next({message:"Invalid Credentials"})
            }



        } catch (err) {
            return next(err)
        }
        

        next()
    },

    async logout (req, res, next) {
        
        
        next()
    }
}

export default login_controller