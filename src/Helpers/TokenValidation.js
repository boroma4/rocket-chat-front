import jwt from'jsonwebtoken';
import {TokenSignature} from "../Constants/Const";


export const ValidateToken = (token) => {

    try {
        let decoded = jwt.verify(token, TokenSignature);
        return decoded;
    } catch(err) {
        throw err;
    }
};
