import Joi from 'joi'
import bcrypt from 'bcrypt'
import {User, RefreshToken} from '../../model'
import CustomErrorHandler from '../../services/CustomErrorHandler'
import jwtServices from '../../services/jwtServices'

const register_controller = {
    async register (req, res, next) {

    //requested data valid or not
    const registerSchema = Joi.object({
        user_name: Joi.string().min(3).required(),
        mobile: Joi.string().min(10).max(10).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        c_password: Joi.ref('password')
    })

    const {error} = registerSchema.validate(req.body) 
    if(error) {
        return next(error)
    }

    //is exist user or not
    try {
        const userExist = User.findOne({mobile:req.body.mobile}) 
        if(userExist){
            return next(CustomErrorHandler.alreadyExist('This mobile number is already registered'))
        }
    } catch (err) {
        return next(err)
    }

    const {user_name, mobile, password, c_password} = req.body
    console.log("req", req)

    //hashpassword
    const hashedpassword = await bcrypt.hash(password, 16)
    const user = new User({
        user_name,
        mobile,
        password : hashedpassword,
        c_password
    })

    let access_token;
    let refresh_token;

    try {
        const result = await user.save();
        console.log(result)

        //token 
        access_token = jwtServices.sign({_id: result._id, role: result.role})
        refresh_token = jwtServices.sign({ _id: result._id, role: result.role }, '1w', REFRESH_SECRET);

        // database 
        await RefreshToken.create({token:refresh_token})
    } catch (err) {
        return next(err)
    }
    res.json({ access_token, refresh_token });
    }
}

export default register_controller