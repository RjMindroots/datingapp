import {JWT_SECRET} from '../config'
import jwt from 'jsonwebtoken'

class jwtServices {
    static sign(payload, expiry = '1w', secret=JWT_SECRET){
        return jwt.sign(payload, secret, {expiresIn : expiry})
    }

    static verify(token, secret = JWT_SECRET){
        return jwt.verify(token, secret)
    }
}

export default jwtServices