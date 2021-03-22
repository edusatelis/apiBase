import { environment } from './../common/environment';
import { User } from './../users/users.model';
import { NotAuthorizedError } from 'restify-errors';
import * as jwt from 'jsonwebtoken';
import * as restify from 'restify';

export const tokenParser: restify.RequestHandler = (req, res, next) =>{
    const token = extractToken(req);
    if(token){
        jwt.verify(token, environment.security.apiSecret, applyBearer(req,next))
    }else{
        next();
    }
}


function extractToken(req: restify.Request){
    const authorization = req.header('authorization')
    let token = undefined;
    if(authorization){
        const parts: string[] = authorization.split(' ')
        if(parts.length === 2 && parts[0] === 'Bearer'){
            token = parts[1]
        }
    }
    return token;
}

function applyBearer(req: restify.Request, next: restify.Next): (error,decoded) => void {
    return(error,decoded) =>{
        if(decoded){
            User.findOne({email: decoded.sub}).then(user => {
                if(user){
                    (<any>req).authenticated = user;
                }
                next()
            }).catch(next)

        }else{
            next();
        }
    }
}