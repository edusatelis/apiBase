import { environment } from './../common/environment';
import { User } from './../users/users.model';
import { NotAuthorizedError } from 'restify-errors';
import * as jwt from 'jsonwebtoken';
import * as restify from 'restify';


export const authenticate: restify.RequestHandler = (req,res,next) =>{
    const { email, password } = req.body;

    User.findOne({email}, '+password')
    .then(user=>{
        if(user && user.matchesPass(password)){

          const token =  jwt.sign({sub: user.email, iss: 'fiscalIsa-api'},  environment.security.apiSecret);
          res.json({name: user.name, email: user.email, accessToken:token})
          return next(false)
        }else{
            return next(new NotAuthorizedError('Credenciais Inválidas'));
        }
    }).catch(next)
}