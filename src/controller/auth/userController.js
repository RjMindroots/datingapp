import { User } from '../../model'
import CustomErrorHandler from '../../services/CustomErrorHandler'

const userController = {
    async userIdentity(req, res, next) {
        try {
            const user = await User.findOne({ _id: req.user._id }).select('-password -updatedAt -__v');
            if (!user) {
                return next(CustomErrorHandler.notFound());
            }
            res.json(user);
        } catch(err) {
           return next(err);
        }
    },

    async profile (req, res, next){
       //requested data valid or not
        const ProfileSchema = Joi.object({
            user_name: Joi.string().min(3).required(),
            gender: Joi.string().required(),
            city: Joi.string().required(),
            interestIn: Joi.string().required()
        })

        const {error} = ProfileSchema.validate(req.body) 

        if(error) {
            return next(error)
        } 

        try {
            const exist = await User.findOne({ _id: req.user._id });
            if(exist) {
                console.log("user exist")
            }else {
                return next(CustomErrorHandler.notFound());
            }
                     
        }catch (err) {
            return next(err)
        }




    }
}

export default userController