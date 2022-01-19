import Joi from 'joi'
import bcrypt from 'bcrypt'
import {User, RefreshToken} from '../../model'
import CustomErrorHandler from '../../services/CustomErrorHandler'
import JwtServices from '../../services/JwtServices'
import { REFRESH_SECRET } from '../../config'

const register_controller = {
    async register (req, res, next) {
    //requested data valid or not
    const registerSchema = Joi.object({
        mobile: Joi.string().min(8).max(11).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        c_password: Joi.ref('password')
    })

    const {error} = registerSchema.validate(req.body) 
    if(error) {
        return next(error)
    }

    //is exist user or not
    try {
        const exist = await User.exists({ mobile: req.body.mobile });
        if (exist) {
            return next(CustomErrorHandler.alreadyExist('This Mobile number is already registered.'));
        }
    }catch (err) {
        return next(err)
    }

    const { mobile, password} = req.body

    //hashpassword
    const hashedpassword = await bcrypt.hash(password, 16)
    const user = new User({ 
        mobile,
        password : hashedpassword
    })

    let access_token;
    let refresh_token;
    let result;

    try {
        result = await user.save();
        // Token
        access_token = JwtServices.sign({ _id: result._id, role: result.role });
        refresh_token = JwtServices.sign({_id: result._id, role: result.role }, '1y' , REFRESH_SECRET)

        await RefreshToken.create({token:refresh_token})

    } catch(err) {
        return next(err);
    }
        res.json({ access_token, refresh_token, status : 200});
    }
    
}

export default register_controller